define([
  'chaplin',
  'fx-dashboard/controllers/base/controller',
  'fx-dashboard/views/dashboard-view',
  'fx-dashboard/models/dashboard',
  'fx-dashboard/models/widgets-collection'
], function(Chaplin, Controller, DashboardView, Dashboard, WidgetsCollection) {
  'use strict';

  var DashboardController = Controller.extend({

    title: 'Dashboard',
   // historyURL : function(params) {
     //   if (params.id) {
      //      return "widgets/" + params.id;
      //  } else {
       //     return '';
      //  }
   // },

    initialize: function() {
      Controller.prototype.initialize.apply(this, arguments);
    },

    show : function(params) {

        if (!params.hasOwnProperty('config')) {
            throw 'Dashboard requires a JSON configuration!'
        }
        if (!params.hasOwnProperty('container')) {
            throw 'Dashboard requires a container!'
        }

        if (params.hasOwnProperty('title')) {
            this.title = params.title;
        }

          var widgets = new WidgetsCollection({
              url: params.config
          });

          this.model = new Dashboard({widgets: widgets, title: this.title});
          this.view = new DashboardView({model : this.model, el: params.container});
      }

  });

  return DashboardController;
});
