/*global define*/

define(function () {

    'use strict';

    return {

        uid: "UNECA_Population",
        //version: "",
        //preProcess : {} //D3P process
        //postProcess : {} //D3P process
        //filter : {} //FX-filter format
        items: [
        
            {
                id: "chart_1", //ref [data-item=':id']
                type: "box", //chart || map || olap || box,
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

                filterFor: ["IndicatorCode", "GenderCode", "AgeRangeCode", "CountryCode"] // allowed dimension ids to filter,
            },
            {
                id: "custom_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap || box,
                config: {
                    type: "scatter",
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
                    Year: [{value :"2013", parent : "from"}, {value :"2016", parent : "to"}]
                },

                //filterFor: ["IndicatorCode", "GenderCode", "AgeRangeCode", "CountryCode"] // allowed dimension ids to filter,
                filterFor: ["Year"] // allowed dimension ids to filter,
            }
        ]
    }
});