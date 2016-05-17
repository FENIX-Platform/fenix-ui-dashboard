define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-dashboard/start',
    'test/models/model-1',
    'test/models/uneca'
], function (log, $, _, Dashboard, Model1, UnecaModel ) {

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

        //this._renderModel1();

        this._renderUneca();
    };

    Test.prototype._renderModel1 = function () {

        var dashboard = this.createDashboard(Model1);

        $(s.REFRESH_BTN).on("click", function () {
            dashboard.refresh({
                countrycode : ["1099"]
            });
        })
    };

    Test.prototype._renderUneca = function () {

        var dashboard = this.createDashboard(UnecaModel);
		
    };

    //Utils

    Test.prototype.createDashboard = function (params) {

        var instance = new Dashboard(params);

        instances.push(instance);

        return instance;
    };

    return new Test();

});