/*global define*/

define(function () {

    'use strict';


    return {
        //default dataset id
        uid: "adam_project_analysis",

        items: [
            {
                id: "custom_1",
                type: 'table',
                //type: 'custom',
                config: {
                    "type" : "bootstrap-table",
                    "groupedRow":false,
                    "aggregationFn":{"commitment_value":"sum"},
                    "formatter":"localstring",
                    "decimals":2,
                    "pageSize": "150",
                    "showRowHeaders":true,
                    // "rows":["recipientcode_EN", "donorcode_EN", "projecttitle", "year", "parentsector_code_EN", "purposecode_EN", 'commitment_value', "disbursement_value" ],
                    "rows":["recipientcode_EN", "donorcode_EN", "projecttitle", "year", "parentsector_code_EN", "purposecode_EN", 'value', "unitcode_EN" ],
                    "aggregations":[],
                    //"values":["value"],

                    config: {
                        pageSize: 150,
                        height: 700,
                        autoSelectFirstRow: false,
                        columns: [
                            {id: "recipientcode_EN", width: 110},
                            {id: "donorcode_EN", width: 120},
                            {id: "projecttitle", width: 160},
                            {id: "year", width: 60,  align: 'center'},
                            {id: "parentsector_code_EN", width: 100},
                            {id: "purposecode_EN", width: 100},
                            {id: "value", width: 100, align: 'center', sortOrder: 'desc'},
                            {id: "unitcode_EN", width: 100, align: 'center'}
                            // {id: "commitment_value", width: 100, align: 'center', sortOrder: 'desc'},
                            // {id: "disbursement_value", width: 100, align: 'center'}
                        ]
                    }
                },


                filterFor: {
                    "filter_projects": ['recipientcode', 'donorcode', 'purposecode', 'year', 'fao_region', 'oda']
                },

                postProcess: [
                    {
                        "name": "filter",
                        "sid": [
                            {
                                "uid": "adam_project_analysis"
                            }
                        ],
                        "parameters": {
                            "columns": [
                                "recipientcode",
                                "oda",
                                "donorcode",
                                "projecttitle",
                                "year",
                                "parentsector_code",
                                "purposecode",
                                "value",
                                "unitcode"
                            ],
                            "rows": {
                                "oda": {
                                    "codes": [{
                                        "uid": "oda_crs",
                                        "version": "2016",
                                        "codes": ["usd_commitment"]
                                    }]
                                },
                                "year": {
                                    "time": [
                                        {
                                            "from": 2010,
                                            "to": 2014
                                        }
                                    ]
                                },
                                "fao_region": {
                                    "codes": [
                                        {
                                            "uid": "crs_fao_regions",
                                            "version": "2016",
                                            "codes": [
                                                "RAP"
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
                                                "625"
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
                                                "1"
                                            ]
                                        }
                                    ]
                                },
                                "fao_sector":{
                                    "enumeration":[
                                        "1"
                                    ]
                                }
                            }
                        },
                        "rid": {
                            "uid": "filter_projects"
                        }
                    },
                    {
                        "name" : "select",
                        "parameters" : {
                            "values" : {
                                "recipientcode" : null,
                                "donorcode" : null,
                                "projecttitle" : null,
                                "year" : null,
                                "parentsector_code" : null,
                                "purposecode" : null,
                                "value" : "round(value::numeric,2)",
                                "unitcode" : null
                            }
                        }
                    },
                    {
                        "name": "order",
                        "parameters": {
                            "year": "DESC",
                            "value":"DESC"
                        }
                    },
                    {
                        "name": "page",
                        "parameters": {
                            "perPage": 500,
                            "page": 1
                        }
                    }
                ]
            }
        ]
    }

});