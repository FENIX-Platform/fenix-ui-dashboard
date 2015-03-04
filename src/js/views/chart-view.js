define([
    'amplify',
    'require',
    'jquery',
    'fx-dashboard/views/base/view',
    'text!fx-dashboard/templates/chart.hbs',
    'fx-dashboard/models/chart',
    'fx-c-c/start'
], function(amplify, require, $, View, template, Chart, ChartCreator) {
    'use strict';

    var ChartView = View.extend({
        template: template,
        events     : {
        },
        model: Chart,

        defaults : {},

        initialize: function(attributes, options) {
            this.options = _.extend(this.defaults, attributes);
            _.bindAll(this);
            View.prototype.initialize.apply(this, arguments);

            this.template = this.getTemplateFunction();

            var _this = this;
            amplify.subscribe('fx.component.chart.ready', function () {
                _this.onLoadComplete();
            })
        },

        onLoadComplete : function(){
            console.log('onLoadComplete CHART');
            amplify.publish('fx.component.dashboard.widgetloaded', this.model);
            //Chaplin.mediator.publish('widgetLoadedEvent', this.model);
        },

        render : function(){
            var _this = this;
            this.el = this.template(this.model.toJSON());

            this.model.fetch({
                success: function(response){
                      var chartCreator = new ChartCreator();
                                        chartCreator.render({
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