/*global define*/

define(function () {

    'use strict';

    return {

        uid: "UNECA_Education",
        //version: "",
        //preProcess : [] //D3P process
        //postProcess : [] //D3P process
        //filter : {} //FX-filter format
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || table,
                config: {
                    type: "line",
                    useDimensionLabelsIfExist : true,
                    y: ["Values"],
                    x: ["Year"],
                    series: ["IndicatorCode"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format
                    //countrycode: ["1012"]
                },
                //filterFor: ["d"], // allowed dimension ids to filter,
                //preProcess : [] //D3P process
                //postProcess : [] //D3P process
            },
            {
                id: "olap_1", //ref [data-item=':id']
                type: "olap", //chart || map || olap,
                config: {
                    useDimensionLabelsIfExist : true,
                    columns: ["Year"],
                    rows: ["IndicatorCode"],
                    values: ["Value"],
                    aggregationFn: {Value: "sum"}
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