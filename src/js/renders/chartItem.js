/*global define, amplify */
define([
    'jquery',
    //'fx-ds/items/Fx-ana-dataset',
    'amplify',
    'bootstrap'
], function ($) {

    'use strict';

    var defaultOptions = {

    };

    function ChartItem(options) {

        this.o = $.extend(true, {}, defaultOptions, options);

        this._bindEventListeners();
    }

    ChartItem.prototype._bindEventListeners = function () {

    };

    ChartItem.prototype.render = function ( item ) {

       item.container.html("Daniele")
    };

    return ChartItem;
});