/*global define*/

define(function () {

    'use strict';


    return {

        uid: "gift_process_ENERGY_000042BUR201001",

        //gift_process_FOOD_AMOUNT_PROC_000042BUR201001

        items: [
            {
                id: "item_1", //ref [data-item=':id']
                type: "chart", //chart || map || table || box,
                config: {
                    type: "bubblecircle",

/*         TODO........
                    x: ["year"], //x axis
                    y: ["value"],//Y dimension
                    series: ["flowcategory"], // series
                    aggregationFn: {"value": "sum"},
                    useDimensionLabelsIfExist: false,// || default raw else fenixtool
*/
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
                  }/*,
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
                  }*/
                ]
            }
        ]
    }

});