/*global define, Promise, amplify */

define([
    "jquery",
    "loglevel",
    'underscore',
    'fx-dashboard/config/errors',
    'fx-dashboard/config/events',
    'fx-dashboard/config/config',
    'fx-dashboard/config/config-default',
    'amplify'
], function ($, log, _, ERR, EVT, C, CD) {

    'use strict';

    var defaultOptions = {};

    function Custom(o) {

        var self = this;

        $.extend(true, this, defaultOptions, o);

        this._renderTemplate();

        this._initVariables();

        this._renderCustomItem();

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
    Custom.prototype.dispose = function () {

        this._dispose();

        log.info("Selector disposed successfully");

    };

    /**
     * refresh method
     * Mandatory method
     */
    Custom.prototype.refresh = function () {

        log.info("Item refresh successfully");

    };

    /**
     * pub/sub
     * @return {Object} Dashboard instance
     */
    Custom.prototype.on = function (channel, fn) {
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: this, callback: fn});
        return this;
    };

    Custom.prototype._trigger = function (channel) {

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

    Custom.prototype._getStatus = function () {

        return this.status;
    };

    Custom.prototype._renderTemplate = function () {

        //TODO
    };

    Custom.prototype._initVariables = function () {

        //Init status
        this.status = {};

        // pub/sub
        this.channels = {};

        //TODO
    };

    Custom.prototype._renderCustomItem = function () {

        var $customContent = $('<ul class="list-group"></ul>'),
            data = this.model.data || [],
            limit = Math.min(5, data.length);

        log.warn("Custom dashboard item. [$el, model]");
        log.warn(this.$el);
        log.warn(this.model);

        for (var i = 0; i < limit; i++) {
            $customContent.append('<li class="list-group-item">' + data[i][0] + '</li>')
        }

        this.$el.append($customContent);
    };

    Custom.prototype._destroyCustomItem = function () {

        //TODO

        log.info("Destroyed Custom: " + this.id);
    };

    Custom.prototype._bindEventListeners = function () {
        //TODO
    };

    Custom.prototype._unbindEventListeners = function () {
        //TODO
    };

    Custom.prototype._dispose = function () {

        this._unbindEventListeners();

        this._destroyCustomItem();

    };

    Custom.prototype._getEventName = function (evt) {

        return this.controller.id + evt;
    };

    return Custom;

});