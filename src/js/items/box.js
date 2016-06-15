/*global define, Promise, amplify */

define([
    "jquery",
    "loglevel",
    'underscore',
    'fx-dashboard/config/errors',
    'fx-dashboard/config/events',
    'fx-dashboard/config/config',
    'fx-box/start',
    'amplify'
], function ($, log, _, ERR, EVT, C, Box) {

    'use strict';

    var defaultOptions = {},
        s = { };

    function BoxTab(o) {
        
        var self = this;

        $.extend(true, this, defaultOptions, o);

        this._renderTemplate();

        this._initVariables();

        this.renderBoxTab();

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
    BoxTab.prototype.dispose = function () {

        this._dispose();
        
        log.info("Selector disposed successfully");

    };

    /**
     * refresh method
     * Mandatory method
     */
    BoxTab.prototype.refresh = function () {

        log.info("Item refresh successfully");

    };

    /**
     * pub/sub
     * @return {Object} component instance
     */
    BoxTab.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    BoxTab.prototype._trigger = function (channel) {

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

    BoxTab.prototype._getStatus = function () {

        return this.status;
    };

    BoxTab.prototype._renderTemplate = function () {

        //TODO
    };

    BoxTab.prototype._initVariables = function () {

        //Init status
        this.status = {};

        // pub/sub
        this.channels = {};

        //TODO
    };

    BoxTab.prototype.renderBoxTab = function () {

        var config = $.extend(true, {}, this.config, {
                model : this.model,
                el : this.$el
        });

        this.box = new Box(config);

    };

    BoxTab.prototype._destroyBoxTab = function () {

        this.box.dispose();

        log.info("Destroyed BoxTab: " + this.id);
    };

    BoxTab.prototype._bindEventListeners = function () {
        //TODO
    };

    BoxTab.prototype._unbindEventListeners = function () {
        //TODO
    };

    BoxTab.prototype._dispose = function () {

        this._unbindEventListeners();

        this._destroyBoxTab();

    };

    BoxTab.prototype._getEventName = function (evt) {

        return this.controller.id + evt;
    };

    return BoxTab;

});