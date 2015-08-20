/*global define, amplify */
define([
    'jquery',
    'underscore',
    'fx-c-c/start',
    'amplify'
], function ($, _, ChartCreator) {

    'use strict';

    var defaultOptions = {

    };

    function ChartItem(options) {

        this.o = $.extend(true, {}, defaultOptions, options);

        this._bindEventListeners();

        this.chartCreator = new ChartCreator();

    }

    ChartItem.prototype._bindEventListeners = function () {

    };

    ChartItem.prototype._getProcess = function () {

        return this.o.filter || [];

    };

    ChartItem.prototype.render = function () {

        var process = this._getProcess();

        this.bridge.query(process)
            .then(_.bind(this._onQuerySuccess, this), _.bind(this._onQueryError, this));
    };

    ChartItem.prototype._onQuerySuccess = function (model) {

        var data = [];
        for (var i=0; i < model.data.length; i++) {
            if (model.data[i][21] !== null) {
                console.log(model.data[i][21] + " " + model.data[i][3]);
                data.push(model.data[i]);
            }
        }

        //TODO implement
        var modelTest = {
            metadata: model.metadata,
            data: data
        };

        //console.log(model.data);
        //for (var i=0; i < model.data.length; i++) {
        //   console.log(model.data[i][21] + " " + model.data[i][3]);
        //}


        //this.o.model = model;
        this.o.model = modelTest;

        var chartConfig = $.extend(true, {}, this.o.config, {
            model : this.o.model,
            onReady: _.bind(this.renderCharts, this)
        });

        this.chartCreator.init(chartConfig);

    };

    ChartItem.prototype.renderCharts = function(creator) {

        creator.render( this.o.config);
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