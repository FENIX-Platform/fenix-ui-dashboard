/*global define*/

define(function () {

    'use strict';

    /* *
     UNECA_Education
     UNECA_Health
     ILO_Labour
     UNECA_Labour
     * */

    var filter = {
        biofuelsPoliciesType : {
            year: {min: '2011-01-01', max: '2014-12-31', from: '2011-01-01', to: '2014-01-01'},
            yearTitle: {from: '01/2011', to: '01/2014'}
        },
        importTariffs : {
            yearTitle: {period: '2012/2015'}
        },
        exportSubsidies : {
            yearTitle: {period: '1995/2011'}
        },
        exportRestrictions : {
            year: {min: '2007-01-01', max: '2014-12-31', from: '2007-01-01', to: '2014-01-01'},
            yearTitle: {from: '01/2010', to: '01/2014'}
        }
    }

    var biofuelsPoliciesType = {
        title: {
            biofuelsPoliciesFreqGraph: {
                zero: 'Number of AMIS Countries',
                first:'Number of AMIS countries with biofuel policies, disaggregated by policy type'
            },
            biofuelsPoliciesTimeSeriesGraph: {
                zero: 'Number of AMIS Countries',
                first: 'Number of AMIS countries with ethanol policies, disaggregated by policy type',
                second: 'Number of AMIS countries with biodiesel policies, disaggregated by policy type',
                third: 'Number of AMIS countries with biofuel (unspecified) policies, disaggregated by policy type',
                fourth: 'Number of AMIS countries with biofuel policies targeted at ethanol, biodiesel or an unspecified type of biofuel, disaggregated by policy type'
            }
        },
        subtitle: {
            biofuelsPoliciesFreqGraph: {
                first: "Period "+ filter.biofuelsPoliciesType.yearTitle.from+" until "+filter.biofuelsPoliciesType.yearTitle.to
            },
            biofuelsPoliciesTimeSeriesGraph: {
            }
        },
        notes: {
            biofuelsPoliciesFreqGraph: {
                first: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Ethanol, biodiesel and biofuel (unspecified) are mutually exclusive categories.<br>Import measures do not include import tariffs or tariff quotas. <br>Source: AMIS Policy Database'
            },
            biofuelsPoliciesTimeSeriesGraph: {
                first: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                second: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                third: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level.<br>Unspecified biofuel policies can apply to ethanol and/or biodiesel.<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database',
                fourth: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Combination of policies targeted on ethanol, biodiesel and biofuel (unspecified).<br>Import measures do not include import tariffs or tariff quotas.<br>Source: AMIS Policy Database'
            }
        },
        legend: {
            biofuelsPoliciesFreqGraph: {
                title: 'Policy Type'
            },
            biofuelsPoliciesTimeSeriesGraph: {
            }
        },
        export: {
            title: 'Download',
            button_items: {
                first: 'As PNG image',
                second: 'As JPEG image',
                third: 'As SVG vector image',
                fourth: 'To PDF document',
            },
            biofuelsPoliciesFreqGraph: {
                filename: {
                    first: 'Biofuels-policies-frequency_graph'
                }
            },
            biofuelsPoliciesTimeSeriesGraph: {
                filename: {
                    first: 'Biofuels-policies-time_series_graph'
                }
            }
        },
        time: {
            biofuelsPoliciesTimeSeriesGraph: {
                min: {year: 2011, month: 0, day: 1},
                max: {year: 2014, month: 11, day: 31},
                floor: {year: 2011, month: 0, day: 1},
                ceiling: {year: 2014, month: 11, day: 31}
            }
        }
    };

    return {

        uid: "Policy_biofuelsPoliciesFreqGraph",
        items: [
            {
                id: "item_9", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "column",
                    x: ["commodityclass"], //x axis and series
                    series: ["policytype"], //Y dimension
                    y: ["VALUE0"],

                    useDimensionLabelsIfExist: true,// || default raw else fenixtool
                    aggregationFn: {"VALUE0": "sum"},
                    config: {
                        "chart": {
                            "borderWidth": 2,
                            "marginBottom": 170,
                            events: {
                                load: function () {
                                    var label = this.renderer.label(biofuelsPoliciesType.notes.biofuelsPoliciesFreqGraph.first)
                                        .css({
                                            width: '450px',
                                            fontSize: '9px'
                                        })
                                        .attr({
                                            'r': 5,
                                            'padding': 10
                                        })
                                        .add();

                                    label.align(Highcharts.extend(label.getBBox(), {
                                        align: 'left',
                                        x: 0, // offset
                                        verticalAlign: 'bottom',
                                        y: 50 // offset
                                    }), null, 'spacingBox');
                                }
                            },
                            "spacingBottom": 50
                        },
                        "title": {
                            "text": biofuelsPoliciesType.title.biofuelsPoliciesFreqGraph.first,
                            "style": {"fontSize": "15px"}
                        },
                        "subtitle": {"text": biofuelsPoliciesType.subtitle.biofuelsPoliciesFreqGraph.first},
                        "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                        //"xAxis": {"categories": ["Ethanol", "Biodiesel", "Biofuel (unspecified)"]},
                        "yAxis": {
                            "min": 0,
                            "allowDecimals": false,
                            "title": {"text": biofuelsPoliciesType.title.biofuelsPoliciesFreqGraph.zero, enabled: true}
                        },
                        "tooltip": {
                            "headerFormat": "<span style=\"font-size:10px\">{point.key}</span><table>",
                            "pointFormat": "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td><td style=\"padding:0\"><b>{point.y}</b></td></tr>",
                            "footerFormat": "</table>",
                            "shared": true,
                            "useHTML": true
                        },
                        "credits": {"enabled": false},
                        "plotOptions": {"column": {"pointPadding": 0.2, "borderWidth": 0}},
                        "legend": {
                            "title": {"text": biofuelsPoliciesType.legend.biofuelsPoliciesFreqGraph.title, "style": {"fontWeight": "bold"}},
                            "itemWidth": 200,
                            //"verticalAlign": "center",
                            "layout": "horizontal",
                            "align": "center",
                            "y": -30, // Posizionamento in verticale della legenda
                            "x": 0,
                            "useHTML": true,
                            "enabled": true,
                            "borderColor": "#4572a7",
                            "itemStyle": {"fontSize": "10px"}
                        },
                        "exporting": {
                            "buttons": {
                                "contextButton": {"enabled": false},
                                "exportButton": {
                                    "theme": {
                                        "title": biofuelsPoliciesType.export.title,
                                        "stroke-width": 1,
                                        "stroke": "#4572a7",
                                        "fill": "#ADD8E6",
                                        "r": 0,
                                        "states": {"hover": {"fill": "#d3d3d3"}}
                                    },
                                    "text": "Download",
                                    "menuItems": [
                                        {
                                            text: biofuelsPoliciesType.export.button_items.first,
                                            onclick: function () {

                                                var today = currentDate();
                                                this.exportChart({
                                                    filename: biofuelsPoliciesType.export.biofuelsPoliciesFreqGraph.filename.first
                                                }, {subtitle: {text: this.subtitle.textStr+today}});
                                            }
                                        },
                                        {
                                            text: biofuelsPoliciesType.export.button_items.second,
                                            onclick: function () {
                                                var today = currentDate();
                                                this.exportChart({
                                                    type: 'image/jpeg',
                                                    filename: biofuelsPoliciesType.export.biofuelsPoliciesFreqGraph.filename.first
                                                }, {subtitle: {text: this.subtitle.textStr+today}});
                                            }
                                        },
                                        {
                                            text: biofuelsPoliciesType.export.button_items.third,
                                            onclick: function () {
                                                var today = currentDate();
                                                this.exportChart({
                                                    type: 'image/svg+xml',
                                                    filename: biofuelsPoliciesType.export.biofuelsPoliciesFreqGraph.filename.first
                                                }, {subtitle: {text: this.subtitle.textStr+today}});
                                            }
                                        },
                                        {
                                            text: biofuelsPoliciesType.export.button_items.fourth,
                                            onclick: function () {
                                                var today = currentDate();
                                                this.exportChart({
                                                    type: 'application/pdf',
                                                    filename: biofuelsPoliciesType.export.biofuelsPoliciesFreqGraph.filename.first
                                                }, {subtitle: {text: this.subtitle.textStr+today}});
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }, // :type-creator config
                postProcess: [
                    {
                        "name": "filter",
                        "sid": [
                            {
                                "uid": "OECD_View_BiofuelPolicy"
                            }
                        ],
                        "parameters": {
                            "columns": [
                                "commodityclass",
                                "policytype",
                                "country",
                                "startDate",
                                "endDate"
                            ],
                            "rows": {
                                "commodityclass": {
                                    "codes": [
                                        {
                                            "uid": "OECD_CommodityClass",
                                            "version": "1.0",
                                            "codes": [
                                                "5",
                                                "6",
                                                "7"
                                            ]
                                        }
                                    ]
                                }
                            }
                        },
                    },
                    {
                        "name": "select",
                        "parameters": {
                            "query": "WHERE (((startdate BETWEEN ? AND ?) OR (enddate BETWEEN ? AND ?))OR ((startdate <= ?) AND (enddate>=?)) OR (enddate IS NULL AND  startdate<=?))",
                            "queryParameters": [
                                {
                                    "value": 20110101
                                },
                                {
                                    "value": 20140131
                                },
                                {
                                    "value": 20110101
                                },
                                {
                                    "value": 20140131
                                },
                                {
                                    "value": 20110101
                                },
                                {
                                    "value": 20140131
                                },
                                {
                                    "value": 20140131
                                }
                            ]
                        },
                        "rid": {"uid" : "filter1"}                            },

                    {
                        "name": "group",
                        "parameters": {
                            "by": [
                                "commodityclass",
                                "policytype",
                                "country"
                            ],
                            "aggregations": [

                            ]
                        }
                    },
                    {
                        "name": "addcolumn",
                        "parameters": {
                            "column": {
                                "dataType": "number",
                                "id": "VALUE0",
                                "title": {
                                    "EN": "Value"
                                },
                                "subject":"value"
                            },
                            "value": 1
                        }
                    },
                    {
                        "name": "group",
                        "parameters": {
                            "by": [
                                "commodityclass",
                                "policytype"
                            ],
                            "aggregations": [
                                {
                                    "columns": [
                                        "VALUE0"
                                    ],
                                    "rule": "SUM"
                                }
                            ]
                        },
                        "rid":{
                            "uid":"final"
                        }
                    }
                ]
            }
        ]
    }

});