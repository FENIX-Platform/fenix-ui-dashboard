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

    var exportSubsidies = {
        title: {
            exportSubsidiesFreqGraph: {
                zero: 'USD',
                first:'Quantity and budgetary outlay export subsidies in Brazil for Maize + Rice, commitments and notifications',
                second: 'Tonnes'
            }
        },
        subtitle: {
            exportSubsidiesFreqGraph: {
                first: filter.exportSubsidies.yearTitle.period
            }
        },
        notes: {
            exportSubsidiesFreqGraph: {
                first: 'Graph excludes Special and Differential Treatment (SDT) Notifications<br>Source: AMIS Policy Database.'
            }
        },
        legend: {
            exportSubsidiesFreqGraph: {
                title: 'Policy Measure'
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
            exportSubsidiesFreqGraph: {
                filename: {
                    first: 'Export-Subsidies'
                }
            }
        }
    }

    return {

        uid: "Policy_exportSubsidiesGraph",
        items: [
            {
                id: "item_9", //ref [data-item=':id']
                type: "chart", //chart || map || olap,
                config: {
                    type: "line",
                    x: ["startYear"], //x axis and series
                    series: ["policymeasure"], //Y dimension
                    y: ["value"],

                    useDimensionLabelsIfExist: true,// || default raw else fenixtool
                    aggregationFn: {"value": "sum"},
                    config: {
                        "chart": {
                            "borderWidth": 2,
                            "marginBottom": 170,
                            events: {
                                load: function () {
                                    var label = this.renderer.label(exportSubsidies.notes.exportSubsidiesFreqGraph.first)
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
                            "text": exportSubsidies.title.exportSubsidiesFreqGraph.first,
                            "style": {"fontSize": "15px"}
                        },
                        "subtitle": {"text": exportSubsidies.subtitle.exportSubsidiesFreqGraph.first},
                        "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                        //"xAxis": {"categories": ["Ethanol", "Biodiesel", "Biofuel (unspecified)"]},
                        "yAxis": {
                            "min": 0,
                            "allowDecimals": false,
                            "title": {"text": exportSubsidies.title.exportSubsidiesFreqGraph.zero, enabled: true}
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
                            "title": {"text": exportSubsidies.legend.exportSubsidiesFreqGraph.title, "style": {"fontWeight": "bold"}},
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
                                        "title": exportSubsidies.export.title,
                                        "stroke-width": 1,
                                        "stroke": "#4572a7",
                                        "fill": "#ADD8E6",
                                        "r": 0,
                                        "states": {"hover": {"fill": "#d3d3d3"}}
                                    },
                                    "text": "Download",
                                    "menuItems": [
                                        {
                                            text: exportSubsidies.export.button_items.first,
                                            onclick: function () {

                                                var today = currentDate();
                                                this.exportChart({
                                                    filename: exportSubsidies.export.exportSubsidiesFreqGraph.filename.first
                                                }, {subtitle: {text: this.subtitle.textStr+today}});
                                            }
                                        },
                                        {
                                            text: exportSubsidies.export.button_items.second,
                                            onclick: function () {
                                                var today = currentDate();
                                                this.exportChart({
                                                    type: 'image/jpeg',
                                                    filename: exportSubsidies.export.exportSubsidiesFreqGraph.filename.first
                                                }, {subtitle: {text: this.subtitle.textStr+today}});
                                            }
                                        },
                                        {
                                            text: exportSubsidies.export.button_items.third,
                                            onclick: function () {
                                                var today = currentDate();
                                                this.exportChart({
                                                    type: 'image/svg+xml',
                                                    filename: exportSubsidies.export.exportSubsidiesFreqGraph.filename.first
                                                }, {subtitle: {text: this.subtitle.textStr+today}});
                                            }
                                        },
                                        {
                                            text: exportSubsidies.export.button_items.fourth,
                                            onclick: function () {
                                                var today = currentDate();
                                                this.exportChart({
                                                    type: 'application/pdf',
                                                    filename: exportSubsidies.export.exportSubsidiesFreqGraph.filename.first
                                                }, {subtitle: {text: this.subtitle.textStr+today}});
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                }, // :type-creator config
                postProcess:  [
                    {
                        "name": "filter",
                        "sid": [
                            {
                                "uid": "OECD_View_ImportTariffs"
                            }
                        ],
                        "parameters": {
                            "columns": [
                                "commodityclass",
                                "element",
                                "country",
                                "startYear",
                                "value",
                                "um"
                            ],
                            "rows": {
                                "commodityclass": {
                                    "codes": [
                                        {
                                            "uid": "OECD_CommodityClass",
                                            "version": "1.0",
                                            "codes": [
                                                "9"
                                            ]
                                        }
                                    ]
                                },
                                "policymeasure": {
                                    "codes": [
                                        {
                                            "uid" : "OECD_PolicyMeasure",
                                            "version" : "1.0",
                                            "codes": [
                                                "3"
                                            ]
                                        }
                                    ]
                                },
                                "country": {
                                    "codes": [
                                        {
                                            "uid" : "OECD_Country",
                                            "version" : "1.0",
                                            "codes": [
                                                "37"
                                            ]
                                        }
                                    ]
                                },
                                "policytype": {
                                    "codes": [
                                        {
                                            "uid" : "OECD_PolicyType",
                                            "version" : "1.0",
                                            "codes": [
                                                "1"
                                            ]
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    {
                        "name": "group",
                        "parameters": {
                            "by": [
                                "commodityclass",
                                "element",
                                "country",
                                "startYear",
                                "um"
                            ],
                            "aggregations": [
                                {
                                    "columns": [
                                        "value"
                                    ],
                                    "rule": "SUM"
                                }
                            ]
                        }
                    },
                    {
                        "name": "order",
                        "parameters": {
                            "startYear": "ASC"
                        }
                    }
                ]
            }
        ]
    }

});