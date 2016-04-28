define([
    'loglevel',
    'jquery',
    'underscore',
    'fx-filter/start',
    'fx-filter/js/utils',
    'demo/models/all'
], function (log, $, _, Filter, Utils, AllModel) {

    'use strict';

    var s = {
            ALL: "#all",
            ALL_SUMMARY: "#all-summary"
        };

    function Test() { }

    Test.prototype.start = function () {

        log.trace("Test started");

        this._render();
    };

    Test.prototype._render = function () {

        this._bindEventListeners();
        
        this._renderAll();
    };

    Test.prototype._bindEventListeners = function () {

        $("#snippet-btn").on("click", function () {

            _.each(AllModel, function (obj, key) {

                var $snippet = $("<div class='col-xs-6'><code></code></div>");
                $snippet.find("code").html(JSON.stringify(obj));

                if ($("[data-selector='"+key+"']").length > 0 ){
                    $("[data-selector='"+key+"']").after($snippet);
                } else {
                    $("[data-semantic='"+key+"']").after($snippet);
                }

            })

        });

    };

    Test.prototype._renderAll = function () {

        var filter = new Filter({
            items: AllModel,
            $el: s.ALL,
            summary$el: s.ALL_SUMMARY
        });

    };
    
    return new Test();

});