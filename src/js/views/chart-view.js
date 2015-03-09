define([
    'amplify',
    'require',
    'jquery',
    'fx-dashboard/views/base/view',
    'text!fx-dashboard/templates/chart.hbs',
    'fx-dashboard/models/chart',
    'fx-c-c/start',
    'fx-dashboard/config/events'
], function(amplify, require, $, View, template, Chart, ChartCreator, Events) {
    'use strict';

    var ChartView = View.extend({
        template: template,

        model: Chart,

        defaults : {},

        initialize: function(attributes, options) {
            this.options = _.extend(this.defaults, attributes);
            _.bindAll(this);
            View.prototype.initialize.apply(this, arguments);

            this.template = this.getTemplateFunction();
            this.chartCreator = new ChartCreator();
            this.model.id = this.model.attributes.id;
            var _this = this;

              amplify.subscribe(Events.CHART_READY, function (chart) {
                _this.onLoadComplete(chart);
             })
        },

        onLoadComplete : function(chart){
             this.chart = chart;

            amplify.publish(Events.REFRESH_GRID_ITEM, this.model);

        },

        redraw : function(){
             this.chartCreator.adapter.reflow();
        },

        render : function(){
            var _this = this;
            this.el = this.template(this.model.toJSON());

            this.model.fetch({
                success: function(response){
                                        _this.chartCreator.render({
                                            container: '#'+_this.model.attributes.id,
                                            model: response.toJSON()
                                        });
                }
            });

            return this;
        }



    });


    return ChartView;
});