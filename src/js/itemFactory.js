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

        var type = item.type || '';

        switch (type.toLocaleLowerCase()){
            case 'chart' :
                return new this.renders.CHART(item);
                break;
            case 'map' :
                return new this.renders.MAP(item);
                break;
            case 'table' :
                return new this.renders.TABLE(item);
                break;
        }

    };

    return Factory;
});