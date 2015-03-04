define([
    'amplify',
    'require',
    'jquery',
    'fx-dashboard/views/base/view',
    'text!fx-dashboard/templates/table.hbs',
    'fx-dashboard/models/table',
    'fx-t-c/start'
], function(amplify, require, $, View, template, Table, TableCreator) {
    'use strict';

    var TableView = View.extend({
        template: template,
        events     : {
        },
        model: Table,

        defaults : {},

        initialize: function(attributes, options) {
            this.options = _.extend(this.defaults, attributes);
            _.bindAll(this);
            View.prototype.initialize.apply(this, arguments);

            this.template = this.getTemplateFunction();
            var _this = this;
            amplify.subscribe('fx.component.table.created', function () {
                _this.onLoadComplete();
            })
        },

        onLoadComplete : function(){
            amplify.publish('fx.component.dashboard.widgetloaded', this.model);
        },

        render : function(){
            var _this = this;
            this.el = this.template(this.model.toJSON());

            this.model.fetch({
                success: function(response){
                                        var tableCreator = new TableCreator();

                                        tableCreator.render({
                                            container: '#'+_this.model.attributes.id,
                                            model: response.toJSON()
                                        });
                }
            });

            return this;
        }

    });


    return TableView;
});