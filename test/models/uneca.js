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
        //filter : {} //FX-filter format
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type : "column_stacked",
					inputFormat:"fenixtool",// || default raw else fenixtool
                    "x": ["GenderCode"],
                    "series": [ "IndicatorCode"],
            showCode:true,
                    "y": ["Value"], 
                   
                }
                , // :type-creator config
                filter: { //FX-filter format
                    Year: ["2001","2012"]
                },
                //filterFor: ["countrycode"], // allowed dimension ids to filter,
            },   {
                id: "chart_2", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type : "line",
                    "aggregations": [],
                    "x": ["Year"],
                    "series": [ "IndicatorCode_EN","GenderCode_EN"],
                    "hidden": [],
                    "y": ["Value"], 
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
            } ,
			{
                id: "olap_2", //ref [data-item=':id']
                type: "olap", //chart || map || olap,
                config: {
					inputFormat:"fenixtool",
                    "aggregations": [],
                    "columns": ["Year","IndicatorCode"],
                    "rows": [ "GenderCode"],
                    "hidden": [],
                    "values": ["Value"],
                    "aggregationFn": {"Value": "sum", "v1": "default"},
                    //"valueOutputType": "classicToNumber",
                    "formatter": "localstring",
                    "decimals": 2,
                    "showUnit": true,
                    "showFlag": true,
                    "showCode": true,
                    "showRowHeaders": true
                }
                , // :type-creator config
                filter: { //FX-filter format
                    GenderCode: [1]
                },
                //filterFor: ["d"], // allowed dimension ids to filter,
            }
        ]
    }

});