/*global define*/

define(function () {

    'use strict';

    return {

        uid: "UNECA_Population",
        //version: "",
        //preProcess : [] //D3P process
        //postProcess : [] //D3P process
        //filter : {} //FX-filter format
        items: [
        /*    {
                id: "item_1", //ref [data-item=':id']
                type: "box", //chart || map || table || box,
                config: {

                }, // :type-creator config
                filter: { //FX-filter format

                    IndicatorCode: ["010101"],
                    GenderCode: ["3"],
                    AgeRangeCode: ["AGT"],
                    CountryCode: ["BEN", "BFA", "CAF", "COM", "DJI", "ERI", "GHA", "GNB", "KEN", "LBR",
                        "LBY", "MRT", "NER", "NGA", "STP", "SEN", "SLE", "SOM", "SDN", "TGO", "TUN"],
                    Year: ["2013"]
                },

 /!*               preProcess : [
                    {
                        sid : "Test"
                    }
                ],*!/

                filterFor: ["IndicatorCode", "GenderCode", "AgeRangeCode", "CountryCode"] // allowed dimension ids to filter,
            },*/
            {
                id: "item_2", //ref [data-item=':id']
                type: "table", //chart || map || table || box,
                config: {
                    type: "scatter",
                    useDimensionLabelsIfExist : true,
                    x: ["Year"], //x axis and series
                    series: ["CountryCode"], //Y dimension
                    y: ["Value"],
                    aggregationFn: {"Value": "sum"}
                }, // :type-creator config
/*                preProcess : [
                    {rid : "step_1"},
                    {rid : "step_2"}
                ],*/
                filter: { //FX-filter format
                    IndicatorCode: ["010101"],
                    GenderCode: ["3"],
                    AgeRangeCode: ["AGT"],
                    CountryCode: ["BEN", "BFA", "CAF", "COM", "DJI", "ERI", "GHA", "GNB", "KEN", "LBR",
                        "LBY", "MRT", "NER", "NGA", "STP", "SEN", "SLE", "SOM", "SDN", "TGO", "TUN"],
                    Year: [{value :"2013", parent : "from"}, {value :"2016", parent : "to"}]
                },

                //filterFor: ["IndicatorCode", "GenderCode", "AgeRangeCode", "CountryCode"] // allowed dimension ids to filter,
                filterFor: ["Year"] // allowed dimension ids to filter,
/*                filterFor: {
                    "step_1" : ["Year"],
                    "step_2" : ["IndicatorCode","Year"],
                }*/
            }
        ]
    }
});