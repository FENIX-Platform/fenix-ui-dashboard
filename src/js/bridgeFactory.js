/*global define, amplify */
define([
    'jquery',
    'fx-ds/renders/chartItem',
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

    Factory.prototype.getRender = function ( model ) {

        //TODO add logic to discriminate if the resource shown is a dataset, a codelist or else
        return new this.renders.CHART(model);
    };

    Factory.prototype.render = function ( item ) {

        var render = this.getRender(item);

        render.render(item);
    };

    return Factory;
});