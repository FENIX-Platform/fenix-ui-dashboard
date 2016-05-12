/*global define*/

define(function () {

    'use strict';

    return {

        uid: "adam_country_indicators",
        //version: "",
        //preProcess : {} //D3P process
        //postProcess : {} //D3P process
        //filter : {} //FX-filter format
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || table,
                config: {
                    type: "line",
                    y: ["Values"],
                    x : ["Year"],
                    series : ["IndicatorCode"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    //countrycode: ["1012"]
                },
                //filterFor: ["d"], // allowed dimension ids to filter,
            },
            {
                id: "olap_1", //ref [data-item=':id']
                type: "olap", //chart || map || olap,
                config: {
                    "aggregations": [],
                    "columns": ["Year"],
                    "rows": [ "IndicatorCode_EN"],
                    "values": ["Value"],
                    aggregationFn: {Value: "sum"},
                }
                , // :type-creator config
                filter: { //FX-filter format
                    //countrycode: ["1012"]
                }
                //filterFor: ["d"], // allowed dimension ids to filter,
            }

        ]
    }

});