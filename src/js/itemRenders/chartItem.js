/*global define, amplify */
define([
    'jquery',
    'underscore',
    'fx-c-c/start',
    'amplify',
    'bootstrap'
], function ($, _, ChartCreator) {

    'use strict';

    var defaultOptions = {

    };

    function ChartItem(options) {

        console.log(ChartCreator)

        this.o = $.extend(true, {}, defaultOptions, options);

        this._bindEventListeners();
    }

    ChartItem.prototype._bindEventListeners = function () {

    };

    ChartItem.prototype._getProcess = function () {

        return [];

    };

    ChartItem.prototype.render = function () {

        var process = this._getProcess();

        this.bridge.query(process)
            .then(_.bind(this._onQuerySuccess, this), _.bind(this._onQueryError, this));
    };

    ChartItem.prototype._onQuerySuccess = function () {

        alert("Query ok")

    };

    ChartItem.prototype._onQueryError = function () {

        alert("Query error")

    };

    ChartItem.prototype._unbindEventListeners = function () {

    };

    ChartItem.prototype.destroy = function () {

       this._unbindEventListeners();
    };


    return ChartItem;
});