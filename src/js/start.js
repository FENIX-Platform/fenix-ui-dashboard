/*global define, amplify, console*/
define([
    "jquery",
    "underscore",
    'fx-ds/itemFactory',
    'fx-ds/bridgeFactory',
    'fx-ds/layoutManager',
    "text!fx-ds/templates/dashboard.hbs",
    "text!fx-ds/templates/item.hbs",
    "handlebars",
    "amplify",
    "bootstrap"
], function ($, _, ItemFactory, BridgeFactory, Layout, template, itemTemplate, Handlebars) {

    'use strict';

    var defaultOptions = {

        layout : "fluid",

        grid: {
            container: '[data-role="grid-container"]',

            config: {
                itemSelector: '.fx-ds-item',
                percentPosition: true,
                rowHeight: '.fx-ds-item',
                transitionDuration: 0
            }
        },

        bridge : {

            type : "d3p"

        }

    };

    function DS(o) {

        this.o = $.extend(true, {}, defaultOptions, o);

        this.items = [];

        return this;
    }

    DS.prototype._initVariables = function () {

    };

    DS.prototype._bindEventListeners = function () {

    };

    DS.prototype._initComponents = function () {

        this.layout = new Layout(this.o);

        this.itemFactory = new ItemFactory(this.o);

        this.bridgeFactory = new BridgeFactory(this.o);

    };

    DS.prototype.render = function (o) {

        $.extend(true, this.o, o);

        //Init auxiliary variables
        this._initVariables();

        this._bindEventListeners();

        this._initComponents();

        this._renderItems();

    };

    DS.prototype.filter = function ( filter ) {

        //update base filter and render items
        //this.o.filter = filter;

        this._destroyItems();

        this._renderItems(filter);
    };

    DS.prototype._renderItems = function (filter) {

        if (this.o.items && Array.isArray(this.o.items)) {
            
            _.each(this.o.items, _.bind(function (item) {

                item.filter = this._prepareFilter(item, filter);

                this._addItem( item );

            }, this ));
        }
        
    };

    DS.prototype._prepareFilter = function (item, filter) {

        var originalFilter = item.filter || [],
            allowedFilter = item.allowedFilter;

        if (!allowedFilter) {
            return originalFilter;
        }

        _.each(filter, function (f) {
            _.each(f, function (v, filterKey) {
                if (allowedFilter.indexOf(filterKey) >= 0) {
                    _.each(originalFilter, function (of) {
                        if (of.hasOwnProperty("parameters")
                            && of.parameters.hasOwnProperty("filter")
                            && of.parameters.filter.hasOwnProperty("rows")) {
                            of.parameters.filter.rows[filterKey] = f[filterKey];
                        }
                    });
                }
            });

        });

        return originalFilter;
    };

    DS.prototype._addItem = function (item) {

        var itemTmpl = this._compileItemTemplate(item);

        //Add item template to dashboard
        this.layout.addItem(itemTmpl, item);

        //Get bridge
        var bridge = this.bridgeFactory.getBridge(this.o, item);

        //Get item render
        var renderer = this.itemFactory.getItemRender(item);

        //inject bridge and template within render
        $.extend(true, renderer, {
            bridge: bridge,
            el : itemTmpl,
            $el : $(itemTmpl)
        });

        //take track of displayed item
        this.items.push(renderer);

        renderer.render();

    };

    DS.prototype._compileItemTemplate = function (item) {

        var template = Handlebars.compile(itemTemplate);

        return $(template(item))[0];
    };

    DS.prototype._unbindEventListeners = function () {


    };

    DS.prototype._destroyItems = function () {

        //Destroy items
        _.each(this.items, function (item) {
            if (item.destroy){
                item.destroy();
            }
        });

    };

    DS.prototype.clear = function () {

        this.layout.clear();
    };

    DS.prototype.destroy = function () {

        this._unbindEventListeners();

        if (this.layout && this.layout.destroy){
            this.layout.destroy();
        }

        this._destroyItems();

    };

    return DS;
});