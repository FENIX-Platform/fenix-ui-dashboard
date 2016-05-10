/*global define*/

define(function () {

    'use strict';

    /* *
     UNECA_Education
     UNECA_Health
     ILO_Labour
     UNECA_Labour
     * */

    return {

        uid: "UNECA_Education",
        //version: "",
        //preProcess : {} //D3P process
        //postProcess : {} //D3P process
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type : "line",
                    "aggregations": [],
                    "columns": ["Year"],
                    "rows": [ "IndicatorCode_EN","GenderCode_EN"],
                    "hidden": [],
                    "values": ["Value"],
                    "aggregationFn": {"Value": "sum", "v1": "default"},
                    //"valueOutputType": "classicToNumber",
                    "formatter": "value",
                    "decimals": 2,
                    "showUnit": false,
                    "showFlag": false,
                    "showCode": false,
                    "showRowHeaders": false
                }
                , // :type-creator config
                filter: { //FX-filter format
                    //countrycode: ["1012"]
                },
                //filterFor: ["countrycode"], // allowed dimension ids to filter,
            },
            //"IndicatorCode_EN",, "CountryCode_EN"
            {
                id: "olap_1", //ref [data-item=':id']
                type: "olap", //chart || map || olap,
                config: {
                    "aggregations": [],
                    "columns": ["Year"],
                    "rows": [ "GenderCode_EN"],
                    "hidden": [],
                    "values": ["Value"],
                    "aggregationFn": {"Value": "sum", "v1": "default"},
                    //"valueOutputType": "classicToNumber",
                    "formatter": "localstring",
                    "decimals": 2,
                    "showUnit": false,
                    "showFlag": false,
                    "showCode": false,
                    "showRowHeaders": true
                }
                , // :type-creator config
                filter: { //FX-filter format
                    //countrycode: ["1012"]
                },
                //filterFor: ["d"], // allowed dimension ids to filter,
            }
        ]
    }

});