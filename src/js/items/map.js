/*global define, Promise, amplify */

define([
    "jquery",
    "loglevel",
    'underscore',
    'fx-dashboard/config/errors',
    'fx-dashboard/config/events',
    'fx-dashboard/config/config',
    'fx-dashboard/config/config-default',
    'fx-m-c/start',
    'amplify'
], function ($, log, _, ERR, EVT, C, CD, MapCreator) {

    'use strict';

    var defaultOptions = {},
        s = {};

    function Map(o) {

        var self = this;

        $.extend(true, this, defaultOptions, o);

        this._renderTemplate();

        this._initVariables();

        this._renderMap();

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
    Map.prototype.dispose = function () {

        this._dispose();

        log.info("Selector disposed successfully");

    };

    /**
     * refresh method
     * Mandatory method
     */
    Map.prototype.refresh = function () {

        log.info("Item refresh successfully");

    };


    /**
     * pub/sub
     * @return {Object} Dashboard instance
     */
    Map.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

    Map.prototype._trigger = function (channel) {

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

    Map.prototype._getStatus = function () {

        return this.status;
    };

    Map.prototype._renderTemplate = function () {

        //TODO
    };

    Map.prototype._initVariables = function () {

        //Init status
        this.status = {};

        // pub/sub
        this.channels = {};

        //TODO
    };

    Map.prototype._renderMap = function () {

        var config = $.extend(true, {}, this.config, {
            model: this.model,
            el: this.$el
        });

        console.log(config)

        this.map = new MapCreator(config);

    };

    Map.prototype._destroyMap = function () {

        this.map.dispose();

        log.info("Destroyed Map: " + this.id);
    };

    Map.prototype._bindEventListeners = function () {
        //TODO
    };

    Map.prototype._unbindEventListeners = function () {
        //TODO
    };

    Map.prototype._dispose = function () {

        this._unbindEventListeners();

        this._destroyMap();

    };

    Map.prototype._getEventName = function (evt) {

        return this.controller.id + evt;
    };

    return Map;

});