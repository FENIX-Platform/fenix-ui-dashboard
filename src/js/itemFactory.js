/*global define, amplify */
define([
    'jquery',
    'fx-ds/itemRenders/chartItem',
    'amplify',
    'bootstrap'
], function ($, ChartItem) {

    'use strict';

    var defaultOptions = {

    };

    function Factory(options) {

        this.o = $.extend(true, {}, defaultOptions, options);

        this.renders = {};

        this.renders.CHART = ChartItem;

        this.bindEventListeners();
    }

    Factory.prototype.bindEventListeners = function () {

    };

    Factory.prototype.getItemRender = function ( item ) {

        //TODO add logic to discriminate if the resource shown is a dataset, a codelist or else
        return new this.renders.CHART(item);
    };

    return Factory;
});