/*global define*/

define(function () {

    'use strict';


    return {

        //uid: "gift_process_ENERGY_000042BUR201001",
        //gift_process_FOOD_AMOUNT_PROC_000042BUR201001
        uid: 'UNECA_Population',

        items: [
            {
                id: "item_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "bubblecircle",
                    useDimensionLabelsIfExist : true,
                    x: ["Year"], //x axis and series
                    series: ["CountryCode"], //Y dimension
                    y: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
                filter: { //FX-filter format

                    IndicatorCode: ["010101"],
                    GenderCode: ["3"],
                    AgeRangeCode: ["AGT"],
                    CountryCode: ["BEN", "BFA", "CAF", "COM", "DJI", "ERI", "GHA", "GNB", "KEN", "LBR",
                        "LBY", "MRT", "NER", "NGA", "STP", "SEN", "SLE", "SOM", "SDN", "TGO", "TUN"],
                    Year: ["2013"]
                },

                filterFor: ["IndicatorCode", "GenderCode", "AgeRangeCode", "CountryCode"] // allowed dimension ids to filter,
            }
            /*{
                id: "item_1", //ref [data-item=':id']
                type: "chart", //chart || map || table || box,
                config: {
                    type: "bubblecircle",
                },
                postProcess: [
                  {
                    "name": "group",
                    "parameters": {
                      "by": [
                        "subject",
                        "group_code",
                        "subgroup_code"//optional
                      ],
                      "aggregations": [
                        {
                          "columns": [ "value" ],
                          "rule": "SUM"
                        },
                        {
                          "columns": [ "um" ],
                          "rule": "first"
                        }
                      ]
                    }
                  },
                  {
                    "name": "group",
                    "parameters": {
                      "by": [
                        "group_code",
                        "subgroup_code"//optional
                      ],
                      "aggregations": [
                        {
                          "columns": [ "value" ],
                          "rule": "AVG"
                        },
                        {
                          "columns": [ "um" ],
                          "rule": "first"
                        }
                      ]
                    }
                  }
                ]
            }*/
        ]
    }

});