/*global define, amplify*/
define([
    'jquery',
    'require',
    'underscore',
    'loglevel',
    'fx-dashboard/config/errors',
    'fx-dashboard/config/events',
    'fx-dashboard/config/config',
    'text!fx-dashboard/html/templates.hbs',
    "fx-common/bridge",
    "fx-common/utils",
    'amplify',
    'bootstrap'
], function ($, require, _, log, ERR, EVT, C, templates, Bridge, Utils) {

    'use strict';

    var defaultOptions = {lang: "EN"}, s = {};

    function Dashboard(o) {
        log.info("FENIX Dashboard");
        log.info(o);

        $.extend(true, this, C, {initial: o}, defaultOptions);

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

        if (this.ready !== true) {
            this.toSync = values;
        } else {
            this._refresh(values);
        }
    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    Dashboard.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    Dashboard.prototype._refresh = function (values) {

        if (!values.values) {
            log.warn("Refresh values is not valid. Missing values.values field. Is it FENIX plain filter format?")
        }
        this.values = values.values;

        this._disposeItems();

        this._renderDashboard();

        log.info("Dashboard refresh");
    };

    // end API

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

    Dashboard.prototype._parseInput = function () {

        this.uid = this.initial.uid;
        this.el = this.initial.el || window.document;
        this.version = this.initial.version;
        this.items = this.initial.items || [];
        this.preProcess = this.initial.preProcess || [];
        this.postProcess = this.initial.postProcess || [];
        this.commonFilter = this.initial.filter || {};
        this.environment = this.initial.environment;
        this.cache = typeof this.initial.cache === "boolean" ? this.initial.cache : C.cache;
        this.itemsRegistry = $.extend(true, {}, C.itemsRegistry, this.initial.itemsRegistry);

        //not from input
        this.$el = $(this.el);
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
            log.info("Set dashboard id to: " + this.id);
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

        // pub/sub
        this.channels = {};

        this.itemInstances = {};

        this.bridge = new Bridge({
            environment: this.environment
        });

    };

    Dashboard.prototype._getItemContainer = function (id) {

        return this.$el.find("[data-item='" + id + "']");

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

        var registeredItems = $.extend(true, {}, this.itemsRegistry),
            path;

        var conf = registeredItems[name];

        if (!conf) {
            log.error('Registration not found for "' + name + '" item.');
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
        log.info('Load resource metadata');

        this._preloadMetadataResource().then(
            _.bind(this._preloadMetadataResourceSuccess, this),
            _.bind(this._preloadMetadataResourceError, this)
        );

    };

    Dashboard.prototype._preloadMetadataResource = function () {

        return this.bridge.getMetadata({
            uid: this.uid,
            version: this.version,
            cache: this.cache,
            params: {
                dsd: true,
                full: true
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

            }, C.validityTimeout);
        } else {

            //no items by default
            window.setTimeout(_.bind(function () {
                this._onReady();
            }, this), 100);
        }

        _.each(this.items, _.bind(function (item) {

            //used during refresh
            item.filter = $.extend(true, {}, item.filter, this.values);

            item.body = this._createProcessBody(item);

            this._getProcessedResource(item)
                .then(
                    _.bind(this._onGetProcessedResourceSuccess, this, item),
                    _.bind(this._onGetProcessedResourceError, this, item));

        }, this));

    };

    Dashboard.prototype._getProcessedResource = function (item) {

        var isMultiResource = hasSid(item.body);

        return this.bridge.getProcessedResource($.extend({
            body: item.body,
            params: {
                dsd: true,
                full: true,
                language: this.lang
            }
        }, !isMultiResource ? { //include uid and version if is not multi resource
            uid: this.uid,
            version: this.version
        } : null));

        // if at least one step has sid is multi resource
        function hasSid(array) {

            var itemsFound = _.filter(array, function (item) {
                    return item.hasOwnProperty("sid");
                }) || [];

            return Array.isArray(array) && itemsFound.length > 0;
        }
    };

    Dashboard.prototype._createProcessBody = function (item) {

        var self = this,
            filterFor = item.filterFor || [],
            values = item.filter || {},
            filter = {},
            rowsFilter,
            body,
            postProcess;

        // prepend pre process
        body = _.union(this.preProcess, item.preProcess) || [];

        // create post process
        postProcess = _.union(this.postProcess, item.postProcess);

        if (Array.isArray(filterFor)) {

            log.info("Apply 'filter' to process chain");

            filter = filterAllowedValues(filterFor);

            //append filter step
            var f = createFilterStep(filter);
            if (f) {
                body.push(f);
            }

            //append post process
            body = _.union(body, postProcess);

        }
        else {

            log.info("Apply 'filter' to process step");

            //append post process
            body = _.union(body, postProcess);

            _.each(filterFor, function (filterRidFor, rid ) {

                log.info("rid: " + rid);

                var filteredSteps = _.filter(body, function (s) {
                    return Utils.getNestedProperty("rid.uid", s) === rid;
                }) || [], filterStep, step;

                if (filteredSteps.length > 1 ) {
                    log.error("Rid " + rid + " is not unique in configuration.")
                }

                step = filteredSteps[0];

                if (step) {
                    log.info("Step found:");

                    filter = filterAllowedValues(filterRidFor);

                    filterStep = createFilterStep(filter);

                    $.extend(true, step, filterStep);

                } else {
                    log.warn("Filter for rid: " + rid + " was specified but no step was found");
                }

            });
        }

        log.info("Body for item id [" + item.id + "]: ");
        log.info(body);

        return body;

        function createFilterStep(filter) {

            if (_.isEmpty(filter)) {
                return;
            }

            rowsFilter = $.extend(true, {},
                Utils.toD3P(self.filterConfiguration, {values: self.commonFilter}),
                Utils.toD3P(self.filterConfiguration, {values: filter}));

            return {
                name: "filter",
                parameters: {
                    rows: rowsFilter
                }
            };

        }

        function filterAllowedValues(filterFor) {

            var filter = {};

            if (filterFor.length !== 0) {

                _.each(filterFor, function (r) {

                    if (values.hasOwnProperty(r)) {
                        filter[r] = values[r];
                    } else {
                        log.warn("Item " + item.id + ": filter " + r + " not included because not present in item.filterFor")
                    }

                });

            }
            else {

                //include all filter values
                filter = values;
            }

            return filter;
        }
    };

    Dashboard.prototype._onGetProcessedResourceError = function (obj) {
        log.error("Resources load: error");
        log.error(obj);
    };

    Dashboard.prototype._onGetProcessedResourceSuccess = function (item, resource) {
        log.info("Resources load: success");

        item.model = this._updateModel(resource);

        this._renderItem(item)

    };

    Dashboard.prototype._renderItem = function (item) {

        var Item = this._getItemRender(item.type),
            conf = $.extend(true, {}, item, {
                controller: this,
                el: this._getItemContainer(item.id)
            });

        var is = new Item(conf);

        is.on("ready", _.bind(this._onItemReady, this));

        this.itemInstances[item.id] = is
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
            newDsd = Utils.getNestedProperty("dsd", newMetadata) || {},
            newData = Utils.getNestedProperty("data", resource),
            newSize = Utils.getNestedProperty("size", resource);

        var dsdWithoutRid = _.without(Object.keys(newDsd), "rid");

        //if metadata exists updated only dsd
        if (dsdWithoutRid.length > 0) {
            Utils.assign(model, "metadata.dsd", newDsd);
        }

        if (Array.isArray(newData)) {
            Utils.assign(model, "data", newData);
        }

        if (model.size !== newSize) {
            Utils.assign(model, "size", newSize);
        }

        this.model = model;

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