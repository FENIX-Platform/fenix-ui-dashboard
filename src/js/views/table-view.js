define([
    'amplify',
    'require',
    'jquery',
    'fx-dashboard/views/base/view',
    'text!fx-dashboard/templates/table.hbs',
    'fx-dashboard/models/table',
    'fx-t-c/start',
    'fx-dashboard/config/events'
], function(amplify, require, $, View, template, Table, TableCreator, Events) {
    'use strict';

    var TableView = View.extend({
        template: template,
        events     : {
        },
        model: Table,

        defaults : {},

        initialize: function(attributes, options) {
            this.options = _.extend(this.defaults, attributes);
            //_.bindAll(this);         
            View.prototype.initialize.apply(this, arguments);

            this.template = this.getTemplateFunction();
            this.tableCreator = new TableCreator();
            this.model.id = this.model.attributes.id;
           // console.log("INITIALIZE TABLE "+ this.model.attributes.id);

            var _this = this;

         //  amplify.subscribe('fx.component.table.ready', function (table) {
            //    _this.onLoadComplete(table);
          //  })

              amplify.subscribe(Events.TABLE_READY, function (table) {
               _this.onLoadComplete(table);
              })
        },

        onLoadComplete : function(table){
            this.table = table;

            amplify.publish(Events.REFRESH_GRID_ITEM, this.model);

        },

        redraw : function(){
            this.tableCreator.adapter.applyEvent('refresh');
           //  this.tableCreator.adapter.getContainer().jqxGrid('refresh');
        },

        render : function(){
            var _this = this;
            this.el = this.template(this.model.toJSON());

            this.model.fetch({
                success: function(response){

                                         _this.tableCreator.render({
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