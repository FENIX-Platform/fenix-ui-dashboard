/*global define, Promise, amplify */

define([
    "jquery",
    "loglevel",
    'underscore',
    'fx-dashboard/config/errors',
    'fx-dashboard/config/events',
    'fx-dashboard/config/config',
    'fx-dashboard/config/config-default',
    'fx-olap/start',
    'amplify'
], function ($, log, _, ERR, EVT, C, CD, OlapCreator) {

    'use strict';

    var defaultOptions = {},
        s = { };

    function Olap(o) {

        var self = this;

        $.extend(true, this, defaultOptions, o);

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
    Olap.prototype.dispose = function () {

        this._dispose();
        
        log.info("Selector disposed successfully");

    };

    /**
     * refresh method
     * Mandatory method
     */
    Olap.prototype.refresh = function () {

        log.info("Item refresh successfully");

    };


    /**
     * pub/sub
     * @return {Object} Dashboard instance
     */
    Olap.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

    Olap.prototype._trigger = function (channel) {

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

    Olap.prototype._getStatus = function () {

        return this.status;
    };

    Olap.prototype._renderTemplate = function () {

        //TODO
    };

    Olap.prototype._initVariables = function () {

        //Init status
        this.status = {};

        // pub/sub
        this.channels = {};

        //TODO
    };

    Olap.prototype._renderOlap = function () {

        var config = $.extend(true, {}, this.config, {
                model : this.model,
                el : this.$el
        });

        new OlapCreator(config);

    };

    Olap.prototype._destroyOlap = function () {

        //TODO

        log.info("Destroyed Olap: " + this.id);
    };

    Olap.prototype._bindEventListeners = function () {
        //TODO
    };

    Olap.prototype._unbindEventListeners = function () {
        //TODO
    };

    Olap.prototype._dispose = function () {

        this._unbindEventListeners();

        this._destroyOlap();

    };

    Olap.prototype._getEventName = function (evt) {

        return this.controller.id + evt;
    };

    return Olap;

});