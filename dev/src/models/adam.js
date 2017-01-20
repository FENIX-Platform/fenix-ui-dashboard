/*global define*/

define(function () {

    'use strict';


    return {

        uid: "adam_usd_commitment",

        items: [
            {
                id: "chart_1", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "line",
                    x: ["year"], //x axis
                    series: ["indicator"], // series
                    y: ["value"],//Y dimension
                    aggregationFn: {"value": "sum"},
                    useDimensionLabelsIfExist: false,// || default raw else fenixtool

                    config: {
                        xAxis: {
                            type: 'datetime'
                        }
                    }
                },

                filterFor: {
                    // "filter_total_ODA": ['fao_region_code', 'recipientcode', 'year', 'oda']
                    "filter_total_ODA": ['recipientcode', 'year', 'oda']
                },

                postProcess: [
                    {
                        "name": "filter",
                        "sid": [
                            {
                                "uid": "adam_usd_aggregation_table"
                            }
                        ],
                        "parameters": {
                            "columns": [
                                "year",
                                "value",
                                "unitcode"
                            ],
                            "rows": {
                                "oda": {
                                    "enumeration": [
                                        "usd_commitment"
                                    ]
                                },
                                "recipientcode": {
                                    "codes": [
                                        {
                                            "uid": "crs_recipients",
                                            "version": "2016",
                                            "codes": [
                                                "625"
                                            ]
                                        }
                                    ]
                                },
                                "year": {
                                    "time": [
                                        {
                                            "from": 2000,
                                            "to": 2014
                                        }
                                    ]
                                }
                            }
                        },
                        "rid":{"uid":"filter_total_ODA"}
                    },
                    {
                        "name": "group",
                        "parameters": {
                            "by": [
                                "year"
                            ],
                            "aggregations": [
                                {
                                    "columns": [
                                        "value"
                                    ],
                                    "rule": "SUM"
                                },
                                {
                                    "columns": [
                                        "unitcode"
                                    ],
                                    "rule": "first"
                                }
                            ]
                        },
                        "rid": {
                            "uid": "total_oda"
                        }
                    },
                    {
                        "name": "addcolumn",
                        "parameters": {
                            "column": {
                                "dataType": "text",
                                "id": "indicator",
                                "title": {
                                    "EN": "Indicator"
                                },
                                "domain": {
                                    "codes": [
                                        {
                                            "extendedName": {
                                                "EN": "Adam Processes"
                                            },
                                            "idCodeList": "adam_processes"
                                        }
                                    ]
                                },
                                "subject": null
                            },
                            "value": "ODA"
                        }
                    }
                ]
            }
        ]
    }

});