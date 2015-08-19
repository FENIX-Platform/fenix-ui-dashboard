/*global define, amplify */
define([
    'jquery',
    'underscore',
    'fx-m-c/start',
    'amplify'
], function ($, _, MapCreator) {

    'use strict';

    var defaultOptions = {

    };

    function MapItem(options) {

        this.o = $.extend(true, {}, defaultOptions, options);

        this._bindEventListeners();

        this.mapCreator = new MapCreator();

        this.mapCreator.render(this.o.config);

    }

    MapItem.prototype._bindEventListeners = function () {

    };

    MapItem.prototype._getProcess = function () {

        return this.o.filter || [];

    };

    MapItem.prototype.render = function () {

        var process = this._getProcess();

        this.bridge.query(process)
            .then(_.bind(this._onQuerySuccess, this), _.bind(this._onQueryError, this));
    };

    MapItem.prototype._onQuerySuccess = function (model) {

        this.mapCreator.addLayer(model);
        this.mapCreator.addCountryBoundaries();

    };

    MapItem.prototype.renderCharts = function(creator) {

        console.log(creator)

        creator.render( this.o.config);
    };

    MapItem.prototype._onQueryError = function () {

        alert("Query error")
    };

    MapItem.prototype._unbindEventListeners = function () {

    };

    MapItem.prototype.destroy = function () {

       this._unbindEventListeners();
    };

    return MapItem;
});