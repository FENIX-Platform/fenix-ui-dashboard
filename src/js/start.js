/*global define, amplify, console*/
define([
    "jquery",
    "underscore",
    'fx-ds/itemFactory',
    "text!fx-ds/templates/dashboard.hbs",
    "text!fx-ds/templates/item.hbs",
    "fx-common/structures/fx-fluid-grid",
    "handlebars",
    "amplify",
    "bootstrap"
], function ($, _, Factory, template, itemTemplate, FluidGrid, Handlebars) {

    'use strict';

    var defaultOptions = {

        grid: {
            container: '[data-role="grid-container"]',

            config: {
                itemSelector: '.fx-ds-item',
                percentPosition: true,
                rowHeight: '.fx-ds-item',
                transitionDuration: 0
            }
        }

    };

    function DS(o) {

        this.o = $.extend(true, {}, defaultOptions, o);
    }

    DS.prototype._bindEventListeners = function () {


    };

    DS.prototype.render = function (o) {

        $.extend(true, this.o, o);

        //Init auxiliary variables
        this._initVariables();

        this._bindEventListeners();

        this.$container.html(template);

        this._initComponents();

        this._renderItems();

    };

    DS.prototype._initVariables = function () {

        this.$container = $(this.o.container);

    };

    DS.prototype._initComponents = function () {

        //packery

        var gridConf = $.extend(true, this.o.grid, {
            container: this.$container.find(this.o.grid.container)[0]
        });

        this.grid = new FluidGrid().init(gridConf).render();

        //Item factory

        this.factory = new Factory();

    };

    DS.prototype._renderItems = function () {

        if (this.o.items && Array.isArray(this.o.items)) {

            _.each(this.o.items, _.bind(this._addItem, this));
        }

    };

    DS.prototype._addItem = function (item) {

        var itemTmpl = this._compileItemTemplate(item);

        this.grid.addItem(itemTmpl);

        this.factory.render($.extend(true, {}, item, {
            container: $(itemTmpl)
        }));

    };

    DS.prototype._compileItemTemplate = function (item) {

        var template = Handlebars.compile(itemTemplate);

        return $(template(item))[0];
    };

    DS.prototype._unbindEventListeners = function () {


    };

    DS.prototype.clear = function () {

        this.grid.clear();
    };

    DS.prototype.destroy = function () {

        this._unbindEventListeners();

        this.grid.destroy();

    };

    return DS;
});