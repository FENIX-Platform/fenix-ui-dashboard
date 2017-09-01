define([
    'loglevel',
    'jquery',
    'underscore',
    '../../../src/js/index',
    '../models/model-1',
    '../models/uneca',
    '../models/custom',
    '../models/adam',
    '../models/gift_bubble',
    '../models/gift_treemap',
    '../models/gift_donut',
    '../models/gift_table'
], function (log, $, _, Dashboard,

    Model1, UnecaModel, CustomItemModel, AdamModel, 

    GiftModelBubble,
    GiftModelTreemap,
    GiftModelDonut,GiftModelTable
    ) {

    'use strict';

    var s = {
            REFRESH_BTN: "#refresh-btn"
        },
        //environment = "develop",
        environment = "demo",
        cache = false,
        instances = [];

    function Dev() {

        this._importThirdPartyCss();

        //console.clear();
        log.setLevel('trace');
        this.start();
    }

    Dev.prototype.start = function () {

        log.trace("Test started");

        this._render();

    };

    Dev.prototype._render = function () {
        //this._renderCustomItem();
        //this._renderModel1();
        //this._renderUneca();
        this._renderAdam();
        //this._renderGiftBubble();
        //this._renderGiftTreemap();
        //this._renderGiftDonut();
		//this._renderGiftTable();
        return;
    };

    Dev.prototype._renderCustomItem = function () {

        var dashboard = this.createDashboard($.extend(true, CustomItemModel, {
            itemsRegistry : {
                custom: {
                    path: 'test/js/custom'
                }
            }
        }));

    };

    Dev.prototype._renderModel1 = function () {

        var dashboard = this.createDashboard(Model1);

        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                countrycode: ["1099"]
            });
        })
    };

    Dev.prototype._renderUneca = function () {

        var dashboard = this.createDashboard(UnecaModel);

    };

    Dev.prototype._renderAdam = function () {
        var dashboard = this.createDashboard(AdamModel);



        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        });

        dashboard.on('error.resource', function(){
            alert("Resource Error");
        });

    };

    Dev.prototype._renderGiftBubble = function () {
        var dashboard = this.createDashboard(GiftModelBubble);
        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        })
    };
    Dev.prototype._renderGiftTreemap = function () {
        var dashboard = this.createDashboard(GiftModelTreemap);
        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        })
    };
    Dev.prototype._renderGiftDonut = function () {
        var dashboard = this.createDashboard(GiftModelDonut);
        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        })
    };  
    Dev.prototype._renderGiftTable = function () {
        var dashboard = this.createDashboard(GiftModelTable);
        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        })
    };  	

    //Utils

    Dev.prototype.createDashboard = function (params) {


        var instance = new Dashboard($.extend(true, params, {
            environment : environment,
            cache : cache
        }));

        instances.push(instance);

        return instance;
    };

    // utils

    Dev.prototype._importThirdPartyCss = function () {

        //Bootstrap
        require("bootstrap-loader");

        require("../../../node_modules/leaflet/dist/leaflet.css");
        //require("../../../node_modules/fenix-ui-map/dist/fenix-ui-map.min.css");

        // fenix-ui-table-creator
        require("../../../node_modules/fenix-ui-table-creator/dist/fenix-ui-table-creator.min.css");


    };

    return new Dev();

});