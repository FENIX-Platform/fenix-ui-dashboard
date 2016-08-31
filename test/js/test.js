if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-dashboard/start',
    'test/models/model-1',
    'test/models/uneca',
    'test/models/custom',
    'test/models/adam',

    'test/models/gift_bubble',
    'test/models/gift_treemap',
    'test/models/gift_donut'
], function (log, $, _, Dashboard, 

    Model1, UnecaModel, CustomItemModel, AdamModel, 
    GiftModelBubble,
    GiftModelTreemap,
    GiftModelDonut
    ) {

    'use strict';

    var s = {
            REFRESH_BTN: "#refresh-btn"
        },
        environment = "demo",//"production",
        cache = false,
        instances = [];

    function Test() {  }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._render();

    };

    Test.prototype._render = function () {

        //this._renderCustomItem();
        //this._renderModel1();
        //this._renderUneca();
		//this._renderAdam();

        this._renderGiftBubble();
        this._renderGiftTreemap();
        this._renderGiftDonut();
    };

    Test.prototype._renderCustomItem = function () {

        var dashboard = this.createDashboard($.extend(true, CustomItemModel, {
            itemsRegistry : {
                custom: {
                    path: 'test/js/custom'
                }
            }
        }));

    };

    Test.prototype._renderModel1 = function () {

        var dashboard = this.createDashboard(Model1);

        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                countrycode: ["1099"]
            });
        })
    };

    Test.prototype._renderUneca = function () {

        var dashboard = this.createDashboard(UnecaModel);

    };

    Test.prototype._renderAdam = function () {

        var dashboard = this.createDashboard(AdamModel);

        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        })

    };

    Test.prototype._renderGiftBubble = function () {
        var dashboard = this.createDashboard(GiftModelBubble);
        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        })
    };
    Test.prototype._renderGiftTreemap = function () {
        var dashboard = this.createDashboard(GiftModelTreemap);
        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        })
    };
    Test.prototype._renderGiftDonut = function () {
        var dashboard = this.createDashboard(GiftModelDonut);
        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                values : { year: ["2000"] }
            });
        })
    };    

    //Utils

    Test.prototype.createDashboard = function (params) {

        var instance = new Dashboard($.extend(true, params, {
            environment : environment,
            cache : cache
        }));

        instances.push(instance);

        return instance;
    };

    return new Test();

});