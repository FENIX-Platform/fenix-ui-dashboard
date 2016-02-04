/*global define, amplify */
define([
    'jquery',
    'underscore',
    'fx-ds/config/events',
    'amplify'
], function ($, _, E) {

    'use strict';

    var defaultOptions = {};
    var template;

    function CustomItem(options) {

        this.o = $.extend(true, {}, defaultOptions, options);

        this._bindEventListeners();

    }

    CustomItem.prototype._bindEventListeners = function () {

    };

    CustomItem.prototype._getProcess = function () {

        return this.o.filter || [];

    };

    CustomItem.prototype.render = function () {

        var process = this._getProcess();

        this.bridge.query(process)
            .then(_.bind(this._onQuerySuccess, this), _.bind(this._onQueryError, this));
    };

    CustomItem.prototype._onQuerySuccess = function (model) {
        this.o.model = model;

        var payload = {
            container: this.o.config.container,
            model: this.o.model,
            config: this.o.config
        };

        amplify.publish(E.CUSTOM_ITEM_RESPONSE+this.o.config.eventId, payload);

    };

    CustomItem.prototype._onQueryError = function () {

        alert("Query error")
    };

    CustomItem.prototype._unbindEventListeners = function () {

    };

    CustomItem.prototype.destroy = function () {

        this._unbindEventListeners();
    };

    CustomItem.prototype.getModel = function () {
        return this.o.model;
    };

    return CustomItem;
});