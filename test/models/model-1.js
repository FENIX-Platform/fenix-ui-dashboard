/*global define*/

define(function () {

    'use strict';

    return {

        uid: "adam_country_indicators",
        //version: "",
        //preProcess : {} //D3P process
        //postProcess : {} //D3P process
        //filter : {} //FX-filter format
        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || table,
                config: {
                    test: "param"
                }, // :type-creator config
                filter: { //FX-filter format
                    countrycode: ["1012"]
                },
                filterFor: ["d"], // allowed dimension ids to filter,
            },
            {
                id: "chart_2", //ref [data-item=':id']
                type: "chart", //chart || map || table,
                config: {
                    test: "param"
                }, // :type-creator config
                filter: { //FX-filter format
                    countrycode: ["1012"]
                },
                filterFor: [] // allowed dimension ids to filter
            }
        ]
    }

});