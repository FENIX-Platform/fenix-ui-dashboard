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
          var widgets = new WidgetsCollection({
              url: params.config
          });

          this.model = new Dashboard({widgets: widgets, title: 'Dashboard'});
          this.view = new DashboardView({model : this.model, el: params.container});
      }

  });

  return DashboardController;
});
