define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-dashboard/start',
    'test/models/model-1',
    'test/models/uneca',
    'test/models/custom',
    'test/models/adam'
], function (log, $, _, Dashboard, Model1, UnecaModel, CustomItemModel, AdamModel) {

    'use strict';

    var s = {
            REFRESH_BTN: "#refresh-btn"
        },
        environment = "develop",//"production",
        cache = false,
        instances = [];

    function Test() {
    }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._render();

    };

    Test.prototype._render = function () {

       // this._renderCustomItem();

        //this._renderModel1();

        //this._renderUneca();

        this._renderAdam();
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