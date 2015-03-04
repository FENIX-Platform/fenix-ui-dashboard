define([
  'chaplin',
  'fx-dashboard/models/widget',
  'fx-dashboard/models/base/collection'

], function(Chaplin, Widget, Collection) {
  'use strict';

  var WidgetsCollection = Collection.extend({
      model: Widget,
      defaults: {
          display: 'list'
      },

      parse : function(response){
          //console.log("Parse ...");
          return response.widgets;
      },

      initialize: function(attributes, options) {
          this.options = _.extend(this.defaults, attributes);
          this.url = this.options.url;
          Collection.prototype.initialize.apply(this, arguments);
      }
  });

  return WidgetsCollection;
});
