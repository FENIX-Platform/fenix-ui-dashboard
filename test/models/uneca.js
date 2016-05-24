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

        uid: "UNECA_Population",
        //version: "",
        //preProcess : [{id:"preResource"}], //D3P process
        //postProcess : [{id: "postResource"}], //D3P process
        //filter : {} //FX-filter format
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type : "pyramide",
					inputFormat:"fenixtool",// || default raw else fenixtool
                    "x": ["GenderCode"],
                    "series": [ "AgeRangeCode"],
                    "y": ["Value"], 
                   
                }
                , // :type-creator config
                filter: { //FX-filter format
                    IndicatorCode: ["010101"],
                           GenderCode: ["1","2"],
                           AgeRangeCode: [
                               "AG02",
                                "AG03",
                                "AG04",
                                "AG05",
                                "AG06",
                                "AG07",
                                "AG08",
                                "AG09",
                                "AG10",
                                "AG11",
                                "AG12",
                                "AG13",
                                "AG14",
                                "AG15"
                            ],
                            Year: ["2008"]
                },
                //preProcess : [{id:"preItem"}], //D3P process
                //postProcess : [{id: "postIem"}] //D3P process
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