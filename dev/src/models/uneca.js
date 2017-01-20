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

        uid:  "D3P_R_3",
        version: "65280662580072738468598523287757025566",
        //preProcess : [{id:"preResource"}], //D3P process
        //postProcess : [{id: "postResource"}], //D3P process
        //filter : {} //FX-filter format
        items: [
            {
                //Average annual growth rate 010103
                id: "item_5", //ref [data-item=':id'] // 010103  Average annual growth rate
                type: "map", //chart || map || olap,
                config: {
                    fenix_ui_map: {
                        guiController: {
                            overlay: false,
                            baselayer: false,
                            wmsLoader: false
                        },
                        baselayers: {
                            "cartodb": {
                                title_en: "Baselayer",
                                url: 'http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png',
                                subdomains: 'abcd',
                                maxZoom: 19
                            }
                        },
                        zoomToCountry: ["DZA"]//,
                        // highlightCountry: ["DZA"]
                    }
                },
                filterFor: {
                    "filtered_ds": ['CountryCode']
                },
                postProcess: [
                    {
                        "name": "join",
                        "sid": [
                            {
                                "uid": "filtered_ds"
                            },
                            {
                                "uid": "last_year_country"
                            }
                        ],
                        "parameters": {
                            "joins": [
                                [
                                    {
                                        "type": "id",
                                        "value": "CountryCode"
                                    },
                                    {
                                        "type": "id",
                                        "value": "Year"
                                    }

                                ],
                                [
                                    {
                                        "type": "id",
                                        "value": "CountryCode"
                                    },
                                    {
                                        "type": "id",
                                        "value": "Year"
                                    }

                                ]
                            ],
                            "values": []
                        },
                        "rid": {
                            "uid": "filtered_join"
                        }
                    },

                    {
                        "name": "filter",
                        "sid": [
                            {
                                "uid": "Uneca_PopulationNew"
                            }
                        ],
                        "parameters": {
                            "columns": [
                                "CountryCode",
                                "Year",
                                "Value"
                            ],
                            "rows": {

                                "IndicatorCode": {
                                    "codes": [
                                        {
                                            "uid": "UNECA_ClassificationOfActivities",
                                            "codes": [
                                                "010103"
                                            ]
                                        }
                                    ]
                                },
                                "CountryCode": {
                                    "codes": [
                                        {
                                            "uid": "ISO3",
                                            "codes": [
                                                "DZA"
                                            ]
                                        }
                                    ]
                                }
                            }
                        },
                        "rid": {
                            "uid": "filtered_ds"
                        }
                    },

                    {
                        "name": "group",
                        "sid": [
                            {
                                "uid": "filtered_ds"
                            }
                        ],
                        "parameters": {
                            "by": [                   //
                                "CountryCode"
                            ],
                            "aggregations": [
                                {
                                    "columns": [
                                        "Year"
                                    ],
                                    "rule": "max"
                                }
                            ]
                        },
                        "rid": {
                            "uid": "last_year_country"
                        }
                    },
                    {
                        "name": "group",
                        "sid": [
                            {
                                "uid": "filtered_join"
                            }
                        ],
                        "parameters": {
                            "by": [
                                "CountryCode"
                            ],
                            "aggregations": [
                                {
                                    "columns": [
                                        "filtered_ds_Value"
                                    ],
                                    "rule": "max"
                                }
                            ]
                        }
                    }

                ]
            }
        ]
    }

});