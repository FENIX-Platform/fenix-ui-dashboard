define([
    'chaplin',
    'jquery',
    'require',
    'fx-dashboard/views/base/view',
    'text!fx-dashboard/templates/widget.hbs',
    'fx-dashboard/models/widget',
    'fx-dashboard/models/chart',
    'fx-dashboard/views/chart-view'
], function(Chaplin, $, require, View, template, Widget, ChartModel, ChartView) {
    'use strict';

    var WidgetView = View.extend({

        template: template,
        events     : {
            'click .resize': 'resize'
        },
        model: Widget,
        childView: ChartView,

        defaults: {
            widgetModel: ChartModel,
            html:''
        },

        initialize: function(attributes, options) {
            this.options = _.extend(this.defaults, attributes);
            _.bindAll(this);

            View.prototype.initialize.apply(this, arguments);

            this.template = this.getTemplateFunction();

            this._widgetTypeModel = "fx-dashboard/models/"+this.model.attributes.type;
            this._widgetTypeView = "fx-dashboard/views/"+this.model.attributes.type+"-view";
        },

        render : function(){
            this.el = $(this.template(this.model.toJSON()));
            var _that = this;

            require([this._widgetTypeModel, this._widgetTypeView], function(WidgetTypeModel, WidgetTypeView){
                _that._widgetTypeModel = new WidgetTypeModel;
                _that._widgetTypeModel.attributes.id = _that.model.attributes.type +'-'+_that.model.id;
                _that._widgetTypeModel.url = _that.model.attributes.url;


                _that.childView = new WidgetTypeView({model : _that._widgetTypeModel, grid: _that.options.grid});

                _that.renderChild(_that.childView);
            });
        },

        renderChild : function(childView){
            this.childView = childView;
            $(this.el).append(this.childView.render().el);
        }

    });


    return WidgetView;
});