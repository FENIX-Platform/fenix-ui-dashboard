/*global define*/

define(function () {

    'use strict';


    return {

        uid: "gift_process_ENERGY_000042BUR201001",

        //gift_process_FOOD_AMOUNT_PROC_000042BUR201001

        items: [
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
    }

});