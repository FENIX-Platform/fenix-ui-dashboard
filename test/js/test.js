define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-dashboard/start',
    'test/models/model-1'
], function (log, $, _, Dashboard, Model1 ) {

    'use strict';

    var s = {
        REFRESH_BTN : "#refresh-btn"
    },
        instances = [];

    function Test() {
    }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._render();

    };

    Test.prototype._render = function () {

        this._renderModel1();
    };

    Test.prototype._renderModel1 = function () {

        var dashboard = this.createDashboard(Model1);

        dashboard.on("ready", function () {
            $(s.REFRESH_BTN).on("click", function () {
                dashboard.refresh({
                    countrycode : ["1099"]
                });
            })
        })
    };

    //Utils

    Test.prototype.createDashboard = function (params) {

        var instance = new Dashboard(params);

        instances.push(instance);

        return instance;
    };

    return new Test();

});