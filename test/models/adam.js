/*global define*/

define(function () {

    'use strict';


    return {

        uid: "adam_usd_commitment",

        items: [
            {
                id: "item_1", //ref [data-item=':id']
                type: "chart", //chart || map || table || box,
                config: {
                    type: "line",
                    x: ["year"], //x axis
                    series: ["flowcategory"], // series
                    y: ["value"],//Y dimension
                    aggregationFn: {"value": "sum"},
                    useDimensionLabelsIfExist: false,// || default raw else fenixtool

                    config: {
                        xAxis: {
                            type: 'datetime'
                        }
                    }
                },

                // filterFor: ['parentsector_code', 'purposecode', 'year-from', 'year-to'],

                filterFor: {
                    "filter_sector_oda": ['sectorcode', 'year', 'oda'],
                    "filter_total_oda": ['year']
                },

                postProcess: [
                    {
                        "name": "union",
                        "sid": [
                            {
                                "uid": "sector_oda"
                            },
                            {
                                "uid": "total_oda"
                            },
                            {
                                "uid": "percentage_ODA"
                            }
                        ],
                        "parameters": {},
                        "rid": {
                            "uid": "union_process"
                        }
                    },
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
                                "sectorcode": {
                                    "codes": [
                                        {
                                            "uid": "crs_sectors",
                                            "version": "2016",
                                            "codes": [
                                                "114"
                                            ]
                                        }
                                    ]
                                },
                                "year": {
                                    "time": [
                                        {
                                            "from": 2000,
                                            "to": 2013
                                        }
                                    ]
                                }
                            }
                        },
                        rid: "filter_sector_oda"
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
                            "value": "SECTOR"
                        },
                        "rid": {
                            "uid": "sector_oda"
                        }
                    },
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
                                "sectorcode": {
                                    "codes": [
                                        {
                                            "uid": "crs_sectors",
                                            "version": "2016",
                                            "codes": [
                                                "NA"
                                            ]
                                        }
                                    ]
                                },
                                "purposecode": {
                                    "codes": [
                                        {
                                            "uid": "crs_purposes",
                                            "version": "2016",
                                            "codes": [
                                                "NA"
                                            ]
                                        }
                                    ]
                                },
                                "donorcode": {
                                    "codes": [
                                        {
                                            "uid": "crs_donors",
                                            "version": "2016",
                                            "codes": [
                                                "NA"
                                            ]
                                        }
                                    ]
                                },
                                "recipientcode": {
                                    "codes": [
                                        {
                                            "uid": "crs_recipients",
                                            "version": "2016",
                                            "codes": [
                                                "NA"
                                            ]
                                        }
                                    ]
                                },
                                "year": {
                                    "time": [
                                        {
                                            "from": 2000,
                                            "to": 2013
                                        }
                                    ]
                                }
                            }
                        },
                        rid: "filter_total_oda"
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
                            "value": "TOTAL"
                        },
                        "rid": {
                            "uid": "total_oda"
                        }
                    },
                    {
                        "name": "join",
                        "sid": [
                            {
                                "uid": "sector_oda"
                            },
                            {
                                "uid": "total_oda"
                            }
                        ],
                        "parameters": {
                            "joins": [
                                [
                                    {
                                        "type": "id",
                                        "value": "year"
                                    }
                                ],
                                [
                                    {
                                        "type": "id",
                                        "value": "year"
                                    }
                                ]
                            ],
                            "values": []
                        },
                        "rid": {
                            "uid": "join_process"
                        }
                    },
                    {
                        "name": "addcolumn",
                        "sid": [
                            {
                                "uid": "join_process"
                            }
                        ],
                        "parameters": {
                            "column": {
                                "dataType": "number",
                                "id": "value",
                                "title": {
                                    "EN": "Value"
                                },
                                "subject": null
                            },
                            "value": {
                                "keys": ["1=1"],
                                "values": ["(sector_oda_value/total_oda_value)*100"]
                            }
                        },
                        "rid": {
                            "uid": "percentage_Value"
                        }
                    },
                    {
                        "name": "filter",
                        "parameters": {
                            "columns": [
                                "year",
                                "value"
                            ],
                            "rows": {}
                        },
                        "rid": {
                            "uid": "percentage_with_two_values"
                        }
                    },
                    {
                        "name": "addcolumn",
                        "parameters": {
                            "column": {
                                "id": "unitcode",
                                "title": {
                                    "EN": "Measurement Unit"
                                },
                                "domain": {
                                    "codes": [
                                        {
                                            "idCodeList": "crs_units",
                                            "version": "2016",
                                            "level": 1
                                        }
                                    ]
                                },
                                "dataType": "code",
                                "subject": "um"
                            },
                            "value": "percentage"
                        }
                    },
                    {
                        "name": "addcolumn",
                        "parameters": {
                            "column": {
                                "dataType": "text",
                                "id": "unitcode_EN",
                                "title": {
                                    "EN": "Measurement Unit_TEST"
                                },
                                "subject": null
                            },
                            "value": "%"
                        },
                        "rid": {
                            "uid": "percentage_withUM"
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
                            "value": "PERCENTAGE"
                        },
                        "rid": {
                            "uid": "percentage_ODA"
                        }
                    }
                ]
            }
        ]
    }

});