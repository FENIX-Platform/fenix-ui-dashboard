define([
    'jquery',
    'amplify',
    'fx-dashboard/views/base/view',
    'fx-dashboard/views/widgets-collection-view',
    'fx-dashboard/views/widget-view',
    'text!fx-dashboard/templates/dashboard.hbs',
    'fx-dashboard/lib/Fx-fluid-grid',
    'fx-dashboard/models/dashboard'
], function($, amplify, View, WidgetsCollectionView, WidgetView, template, FluidGrid, Dashboard) {
    'use strict';

    var DashboardView = View.extend({
        container: '#widgets-container',
        template: template,
        model: Dashboard,
        autoRender: true,
        events : {
        },
        defaults: {
            grid: '',
            css :{
                draggable: '.handle',
                item: '.item',
                gutter: '.gutter-sizer',
                columnWidth: '.grid-sizer'
            }
         },
        //listen: {
        // Same as this.subscribeEvent('pubSubEvent', this[methodName])
         //'widget_loaded mediator': 'refresh'
        //},

        initialize: function(attributes, options) {
            this.options = _.extend(this.defaults, attributes);
            _.bindAll(this);

            View.prototype.initialize.apply(this, arguments);

            amplify.subscribe('fx.component.dashboard.widgetloaded', this.refresh);

            //Chaplin.mediator.subscribe('widgetLoadedEvent', this.refresh);

            this.template = this.getTemplateFunction();

            this.grid = new FluidGrid();

            //console.log("WIDGETS ++++++++++++++++++++++");
           // console.log(this.model.widgets);

            this._widgetCollectionView = new WidgetsCollectionView({
                collection: this.model.widgets,
                childViewConstructor : WidgetView
            });

        },

        render : function() {
           $(this.el).empty();
           $(this.el).append(this.template(this.model.toJSON()));

            this._widgetCollectionView.listSelector = this.container;
            this._widgetCollectionView.render();

            amplify.subscribe('fx.component.dashboard.collectionrendered', this.initializeGrid);
           // Chaplin.mediator.subscribe('collectionRenderedEvent', this.initializeGrid);

            return this;
        },

        initializeGrid : function() {
            //console.log("============ COLLECTION RENDERED");
           this.grid.init({
              //  container: document.querySelector('.packery'),
               container: document.querySelector(this.container),  //.packery
               drag: {
                    containment: this.listSelector,
                    handle: this.options.css.draggable
                },
                config: {
                    itemSelector: this.options.css.item,
                    gutter:  this.options.css.gutter,
                    columnWidth:  this.options.css.columnWidth
                }
            });

            this.grid.render();
       },
        refresh : function() {
            //console.log("============ REFRESH");
            this.grid.pckry.layout();
        }
    });

    return DashboardView;
});