/*global define*/

define(function () {

    'use strict';


    return {

        uid: "gift_process_FOOD_AMOUNT_PROC_000042BUR201001",
        //gift_process_FOOD_AMOUNT_PROC_000042BUR201001
        //uid: 'UNECA_Population',
        items: [{
                id: "item_0",
                type: "table",
				
				config:{
                   // type: "donut",
				   groupedRow:true,
				  "formatter":"localstring",
				  "decimals":["2"],
				  "showRowHeaders":true,
                    inputFormat : "fenixtool",
                    columns: [], //x axis and series
                    rows: ["group_code","subgroup_code"], //Y dimension
                    values: ["value"],
					hidden:[],
                    aggregationFn: {"value": "sum"}
                },
				
				
               
/*              filter: {
                    IndicatorCode: ["010101"],
                    GenderCode: ["3"],
                    AgeRangeCode: ["AGT"],
                    CountryCode: ["BEN", "BFA", "CAF", "COM", "DJI", "ERI", "GHA", "GNB", "KEN", "LBR",
                        "LBY", "MRT", "NER", "NGA", "STP", "SEN", "SLE", "SOM", "SDN", "TGO", "TUN"],
                    Year: ["2013"]
                },
                filterFor: ["IndicatorCode", "GenderCode", "AgeRangeCode", "CountryCode"]*/
                postProcess: [
                    {
                      "name": "group",
                      "parameters": {
                        "by": [
                          "group_code",
                          "subgroup_code" 
                        ],
                        "aggregations": [
                          {
                            "columns": [ "value" ],
                            "rule": "SUM"
                          }
                        ]
                      }
                    }
                ]
            }  
			
			]
    }

});