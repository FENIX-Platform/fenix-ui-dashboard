define([
    "jquery",
    "loglevel",
    'underscore',
    '../../config/errors',
    '../../config/events',
    '../../config/config',
    'fenix-ui-table-creator',
    'amplify-pubsub'
], function ($, log, _, ERR, EVT, C, OlapCreator, amplify) {

    'use strict';

    var defaultOptions = {};

    function Table(o) {

        var self = this;

        $.extend(true, this, defaultOptions, o);
        this.$el = $(this.el);

        this._renderTemplate();

        this._initVariables();

        this._renderOlap();

        this._bindEventListeners();

        //force async execution
        window.setTimeout(function () {
            self.status.ready = true;
            amplify.publish(self._getEventName(EVT.SELECTOR_READY), self);
            self._trigger("ready");
        }, 0);

        return this;
    }

    /**
     * Disposition method
     * Mandatory method
     */
    Table.prototype.dispose = function () {

        this._dispose();
        
        log.info("Selector disposed successfully");

    };

    /**
     * refresh method
     * Mandatory method
     */
    Table.prototype.refresh = function () {

        log.info("Item refresh successfully");

    };


    /**
     * pub/sub
     * @return {Object} component instance
     */
    Table.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };
    Table.prototype._trigger = function (channel) {

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

    Table.prototype._getStatus = function () {

        return this.status;
    };

    Table.prototype._renderTemplate = function () {

        //TODO
    };

    Table.prototype._initVariables = function () {

        //Init status
        this.status = {};

        // pub/sub
        this.channels = {};

        //TODO
    };

    Table.prototype._renderOlap = function () {

        var config = $.extend(true, {}, this.config, {
                model : this.model,
                el : this.$el
        });

        this.olap = new OlapCreator(config);

    };

    Table.prototype._destroyOlap = function () {

        //TODO
        this.olap.dispose();
        log.info("Destroyed Table: " + this.id);
    };

    Table.prototype._bindEventListeners = function () {
        //TODO
    };

    Table.prototype._unbindEventListeners = function () {
        //TODO
    };

    Table.prototype._dispose = function () {

        this._unbindEventListeners();

        this._destroyOlap();

    };

    Table.prototype._getEventName = function (evt) {

        return this.controller.id + evt;
    };

    return Table;

});