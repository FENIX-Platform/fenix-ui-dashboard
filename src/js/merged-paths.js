define(function () {
   var config = {
    paths:  {
        'fx-dashboard/start': './start',
        'fx-dashboard/controllers': './controllers',
        'fx-dashboard/models': './models',
        'fx-dashboard/templates': '../templates',
        'fx-dashboard/views': './views',
        'fx-dashboard/lib': './lib',
        'fx-dashboard/widgets': './widgets',
        'fx-dashboard/utils': './utils',

        // explicit references for TABLE CREATOR (needs to be dealt with in a better way)
        'fx-c-c' : '../../../fenix-ui-chart-creator/src/js',
        'fx-c-c/start' : '../../../fenix-ui-chart-creator/src/js/start',
        'fx-c-c/html' : '../../../fenix-ui-chart-creator/src/html',
        'fx-c-c/config' : '../../../fenix-ui-chart-creator/config',
        'fx-c-c/adapters' : '../../../fenix-ui-chart-creator/src/js/adapters',
        'fx-c-c/templates' : '../../../fenix-ui-chart-creator/src/js/templates',

        // explicit references for TABLE CREATOR (needs to be dealt with in a better way)
        'fx-t-c' : '../../../fenix-ui-table-creator/src/js',
        'fx-t-c/start' : '../../../fenix-ui-table-creator/src/js/start',
        'fx-t-c/html' : '../../../fenix-ui-table-creator/src/html',
        'fx-t-c/config' : '../../../fenix-ui-table-creator/config',
        'fx-t-c/adapters' : '../../../fenix-ui-table-creator/src/js/adapters',
        'fx-t-c/templates' : '../../../fenix-ui-table-creator/src/js/templates',

        // third party libs
        'jquery': 'http://fenixapps.fao.org/repository/js/jquery/2.1.1/jquery.min',
        'amplify': 'http://fenixapps.fao.org/repository/js/amplify/1.1.2/amplify.min',
        'bootstrap': 'http://fenixapps.fao.org/repository/js/bootstrap/3.2/js/bootstrap.min',
        'underscore': 'http://fenixapps.fao.org/repository/js/lodash/2.4.1/lodash',
        'backbone': 'http://fenixapps.fao.org/repository/js/backbone/1.1.2/backbone.min',
        'handlebars': 'http://fenixapps.fao.org/repository/js/handlebars/2.0.0/handlebars',
        'text': 'http://fenixapps.fao.org/repository/js/requirejs/plugins/text/2.0.12/text',
        'chaplin': 'http://fenixapps.fao.org/repository/js/chaplin/1.0.1/chaplin.min',
        'packery': 'http://fenixapps.fao.org/repository/js/packery/dist/packery.pkgd',
        'draggabilly': 'http://fenixapps.fao.org/repository/js/packery/bower_components/draggabilly/dist/draggabilly.pkgd',

        highcharts : 'http://code.highcharts.com/highcharts',
        jqwidgets: 'http://fenixapps.fao.org/repository/js/jqwidgets/3.1/jqx-all',
        moment: "http://fenixapps.fao.org/repository/js/moment/2.9.0/moment.min"
    },
            shim: {
                bootstrap: {
                    deps: ['jquery']
                },
                underscore: {
                    exports: '_'
                },
                "jquery.i18n.properties": {
                    deps: ['jquery']
                },
                pnotify: {
                    deps: ['bootstrap']
                },

                backbone: {
                    deps: ['underscore', 'jquery'],
                    exports: 'Backbone'
                },
                handlebars: {
                    exports: 'Handlebars'
                },
                jqwidgets: {
                    "deps": ["jquery"]
                },
                highcharts: {
                    "exports": "Highcharts",
                    "deps": ["jquery"]
                },
                amplify: {
                    deps: ["jquery"],
                    exports: "amplify"
                }
            }
        };

    return config;
});