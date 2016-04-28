/*global define, amplify*/
define([
    'jquery',
    'require',
    'underscore',
    'loglevel',
    'fx-dashboard/config/errors',
    'fx-dashboard/config/events',
    'fx-dashboard/config/config',
    'fx-dashboard/config/config-default',
    'text!fx-dashboard/html/templates.hbs',
    'i18n!fx-dashboard/nls/labels',
    "fx-common/bridge",
    "fx-common/utils",
    'amplify',
    'bootstrap'
], function ($, require, _, log, ERR, EVT, C, DC, templates, i18nLabels, Bridge, Utils) {

    'use strict';

    var defaultOptions = {
        lang: "EN"
    }, s = {};

    function Dashboard(o) {
        log.info("FENIX Dashboard");
        log.info(o);

        $.extend(true, this, DC, C, {initial: o}, defaultOptions);

        this._parseInput(o);

        var valid = this._validateInput();

        if (valid === true) {

            this._initVariables();

            this._preloadItemsScripts();

            return this;

        } else {
            log.error("Impossible to create Dashboard");
            log.error(valid)
        }
    }

    // API

    /**
     * Reset the view content
     * @return {null}
     */
    Dashboard.prototype.refresh = function (values) {

        if ( this.ready !== true) {
            this.toSync = values;
        } else {
            this._refresh(values);
        }
    };

    Dashboard.prototype._refresh = function (values) {

        this.values = values;

        this._disposeItems();

        this._renderDashboard();

        log.info("Dashboard refresh");
    };

    /**
     * pub/sub
     * @return {Object} Dashboard instance
     */
    Dashboard.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

    Dashboard.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    // end API

    Dashboard.prototype._parseInput = function () {

        this.id = this.initial.id;
        this.uid = this.initial.uid;
        this.version = this.initial.version;
        this.items = this.initial.items || [];
        this.preProcess = this.initial.preProcess || [];
        this.postProcess = this.initial.postProcess || [];

        this.types = [];
        this.ids = [];
    };

    Dashboard.prototype._validateInput = function () {

        var valid = true,
            errors = [];

        //set Dashboard id
        if (!this.id) {

            window.fx_Dashboard_id >= 0 ? window.fx_Dashboard_id++ : window.fx_Dashboard_id = 0;
            this.id = String(window.fx_Dashboard_id);
            log.warn("Impossible to find Dashboard id. Set auto id to: " + this.id);
        }

        if (!this.uid) {
            errors.push({code: ERR.MISSING_UID});
            log.error("Impossible to find resource uid");
        }

        if (!this.items || !Array.isArray(this.items)) {
            errors.push({code: ERR.INVALID_ITEMS});
            log.error("Invalid items configuration");
        }

        _.each(this.items, _.bind(function (item) {

            //missing id
            if (!item.hasOwnProperty("id")) {
                errors.push({code: ERR.ITEM_MISSING_ID});
                log.error("Missing item's id");
                log.error(item);
            } else {

                if (_.contains(this.ids, item.id)) {
                    errors.push({code: ERR.ITEM_DUPLICATED_ID});
                    log.error("Duplicated item's id: " + item.id);
                    log.error(item);
                }
                this.ids.push(item.id);
                this.ids = _.uniq(this.ids);
            }

            //missing container
            var $el = this._getItemContainer(item.id);
            if ($el.length !== 1) {
                errors.push({code: ERR.ITEM_MISSING_CONTAINER});
                log.error("Missing item's container");
                log.error(item);
            }

            //missing item type
            if (!item.hasOwnProperty("type")) {
                errors.push({code: ERR.ITEM_MISSING_TYPE});
                log.error("Missing item's type");
                log.error(item);
            } else {
                this.types.push(item.type);
                this.types = _.uniq(this.types);
            }

        }, this));

        if (!Array.isArray(this.preProcess)) {
            errors.push({code: ERR.INVALID_PRE_PROCESS});
            log.error("Invalid items pre process");
        }

        if (!Array.isArray(this.postProcess)) {
            errors.push({code: ERR.INVALID_POST_PROCESS});
            log.error("Invalid items pre process");
        }

        return errors.length > 0 ? errors : valid;
    };

    Dashboard.prototype._initVariables = function () {

        this.items_registry = $.extend(true, {}, this.initial.items_registry || C.items_registry || DC.items_registry)

        // pub/sub
        this.channels = {};
        this.cache = {};

        this.itemInstances = {};
    };

    Dashboard.prototype._getItemContainer = function (id) {
        return $("[data-item='" + id + "']");
    };

    Dashboard.prototype._preloadItemsScripts = function () {

        var paths = [];

        _.each(this.types, _.bind(function (t) {

            paths.push(this._getItemScriptPath(t));

        }, this));

        log.info("Item path to load");
        log.info(paths);

        //Async load of plugin js source
        require(paths, _.bind(this._preloadItemsScriptsSuccess, this));

    };

    Dashboard.prototype._getItemScriptPath = function (name) {

        var registeredItems = $.extend(true, {}, this.items_registry),
            path;

        var conf = registeredItems[name];

        if (!conf) {
            log.error('Registration not found for "' + name + ' item".');
        }

        if (conf.path) {
            path = conf.path;
        } else {
            log.error('Impossible to find path configuration for "' + name + ' item".');
        }

        return path;
    };

    Dashboard.prototype._preloadItemsScriptsSuccess = function () {
        log.info('Items scripts loaded successfully');

        this._preloadMetadataResource().then(
            _.bind(this._preloadMetadataResourceSuccess, this),
            _.bind(this._preloadMetadataResourceError, this)
        );

    };

    Dashboard.prototype._preloadMetadataResource = function () {

        return Bridge.getMetadata({
            uid: this.uid,
            version: this.version,
            params: {
                dsd: true
            }
        });
    };

    Dashboard.prototype._preloadMetadataResourceError = function () {
        log.error("Resources load: error");
    };

    Dashboard.prototype._preloadMetadataResourceSuccess = function (resource) {

        log.info("Metadata loaded");

        this.model = {metadata: resource};

        this.filterConfiguration = Utils.createConfiguration({
            model: $.extend(true, {}, this.model)
        });

        this._renderDashboard();

    };

    Dashboard.prototype._renderDashboard = function () {

        this._renderItems();

    };

    Dashboard.prototype._renderItems = function () {

        this.ready = false;

        this.itemsReady = 0; //used for "ready" event

        //In case there are items set timeout
        if (this.items.length > 0) {

            this.validTimeout = window.setTimeout(function () {

                log.error(ERR.READY_TIMEOUT);

            }, C.VALID_TIMEOUT || DC.VALID_TIMEOUT);
        } else {

            //no items by default
            window.setTimeout(_.bind(function () {
               this._onReady();
            }, this), 100);
        }

        _.each(this.items, _.bind(function (item) {

            item.body = this._createProcessBody(item);

            //used during refresh
            item.filter = this.values ? this.values : item.filter;

            //Check if codelist is cached otherwise query
            var stored = this._getCachedResource(item.filter);

            if (stored === undefined) {

                log.info(this._getCacheKey(item.filter) + " not in session storage.");

                this._getProcessedResource(item)
                    .then(
                        _.bind(this._onGetProcessedResourceSuccess, this, item),
                        _.bind(this._onGetProcessedResourceError, this, item));

            } else {
                log.info(this._getCacheKey(item.filter) + " read from session storage.");

                item.body = stored;

                this._onGetProcessedResourceSuccess(item)
            }

        }, this));

    };

    Dashboard.prototype._getProcessedResource = function (item) {

        var body = this.preProcess.concat(item.body).concat(this.postProcess);

        return Bridge.getResource({
            uid: this.uid,
            version: this.version,
            body: body,
            params: {
                dsd: true,
                full: true,
                language: this.lang
            }
        })
    };

    Dashboard.prototype._createProcessBody = function (item) {

        var filterFor = item.filterFor || [],
            values = item.filter || {},
            filter = {};

        _.each(filterFor, function (r) {

            if (values.hasOwnProperty(r)) {
                filter[r] = values[r];
            } else {
                log.warn("Item " + item.id + ": filter " + r + " not included because not present in item.filterFor")
            }

        });

        var body = [{
            name: "filter",
            parameters: {
                rows: Utils.toD3P(this.filterConfiguration, {values: filter})
            }
        }];

        return body;

    };

    Dashboard.prototype._onGetProcessedResourceError = function (obj) {
        log.error("Resources load: error");
    };

    Dashboard.prototype._onGetProcessedResourceSuccess = function (item, resource) {
        log.info("Resources load: success");

        item.model = this._updateModel(resource);

        this._setCachedResource(item.filter, item.model);

        this._renderItem(item)

    };

    Dashboard.prototype._renderItem = function (item) {

        var Item = this._getItemRender(item.type);

        var is = new Item($.extend(true, {}, item, {
            controller: this,
            $el: this._getItemContainer(item.id)
        }));

        is.on("ready", _.bind(this._onItemReady, this));

        this.itemInstances[item.id] = is
    };

    // cache

    Dashboard.prototype._setCachedResource = function (obj, resource) {

        this.cache[this._getCacheKey(obj)] = resource;

        return this.cache[this._getCacheKey(obj)];
    };

    Dashboard.prototype._getCachedResource = function (obj) {

        return this.cache[this._getCacheKey(obj)];
    };

    Dashboard.prototype._getCacheKey = function (o) {

        var obj = typeof o === 'object' ? o : {},
            key = "_",
            keys = Object.keys(obj).sort();

        for (var i = 0; i < keys.length; i++) {
            key += "_" + keys[i] + ":" + obj[keys[i]];
        }

        return key;
    };

    // Handlers

    Dashboard.prototype._onItemReady = function () {

        this.itemsReady++;

        if (this.itemsReady === this.items.length) {

            this.ready = true;

            log.info("All items are ready");

            this._onReady();

        }
    };

    Dashboard.prototype._onReady = function () {
        log.info("Dashboard [" + this.id + "] is ready");

        window.clearTimeout(this.validTimeout);

        if (this.toSync) {

            var values = $.extend(true, {}, this.toSync);

            delete this.toSync;

            this._refresh(values);
        } else {
            amplify.publish(this._getEventName(EVT.DASHBOARD_READY));

            this._trigger('ready');
        }

    };

    Dashboard.prototype._getEventName = function (evt) {

        return this.id.concat(evt);
    };

    // utils for items

    Dashboard.prototype._getItemRender = function (id) {

        return require(this._getItemScriptPath(id));
    };

    Dashboard.prototype._getSelectorInstance = function (name) {

        var instance = this.selectors[name].instance;

        if (!instance) {

            log.warn("Impossible to find selector instance for " + name);
        }

        return instance;
    };

    Dashboard.prototype._bindEventListeners = function () {
    };

    Dashboard.prototype._updateModel = function (resource) {

        var model = this.model || {},
            newMetadata = Utils.getNestedProperty("metadata", resource),
            newDsd = Utils.getNestedProperty("metadata.dsd", resource),
            newData = Utils.getNestedProperty("data", resource);

        //if metadata exists updated only dsd
        if (model.metadata) {
            Utils.assign(model, "metadata.dsd", newDsd);
        } else {
            Utils.assign(model, "metadata", newMetadata);
        }

        if (Array.isArray(newData)) {
            Utils.assign(model, "data", newData);
        }

        return model;
    };

    //disposition
    Dashboard.prototype._unbindEventListeners = function () {


    };

    Dashboard.prototype._disposeItems = function () {
        _.each(this.itemInstances, function (item) {
            item.dispose();
        });
    };

    Dashboard.prototype.dispose = function () {

        this._disposeItems();

        //unbind event listeners
        this._unbindEventListeners();

    };

    return Dashboard;
});