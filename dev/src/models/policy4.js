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

    var biofuelsPoliciesDetailed = {
        title: {
            biofuelsPoliciesFreqGraph: {
                zero: 'Number of AMIS Countries',
                first:'Number of AMIS countries with ' + 'Biofuel targets' + ' policies, disaggregated by policy measure'
            },
            biofuelsPoliciesTimeSeriesGraph: {
                zero: 'Number of AMIS Countries',
                first: 'Number of AMIS countries with ethanol policies, disaggregated by policy type and policy measure',
                second: 'Number of AMIS countries with biodiesel policies, disaggregated by policy type and policy measure',
                third: 'Number of AMIS countries with biofuel (unspecified) policies, disaggregated by policy type and policy measure',
                fourth: 'Number of AMIS countries with biofuel policies targeted at ethanol, biodiesel or an unspecified type of biofuel, disaggregated by policy type and policy measure'
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
                first: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Ethanol, biodiesel and biofuel (unspecified) are mutually exclusive categories.<br>Import measures do not include import tariffs or tariff quotas. <br>Source: AMIS Policy Database',
                second: 'In Australia, Brazil, Canada, Mexico and US biofuel policies can be implemented at state-level. <br>Ethanol, biodiesel and biofuel (unspecified) are mutually exclusive categories.<br>Source: AMIS Policy Database'
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
                title: 'Policy Measure'
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
    }

    var importTariffs = {
        title: {
            importTariffsFreqGraph: {
                zero: '%',
                first:'Average values of applied and bound ad valorem import tariffs in the AMIS countries'
            }
        },
        subtitle: {
            importTariffsFreqGraph: {
                first: "Period "+ filter.importTariffs.yearTitle.period
            }
        },
        notes: {
            importTariffsFreqGraph: {
                first: 'Graph only considers tariffs on raw agricultural commodities (HS codes 1001, 1005, 1006, 1201)<br>Non-ad valorem tariffs were excluded in the calculation of the averages<br>Source: AMIS Policy Database.'
            }
        },
        legend: {
            importTariffsFreqGraph: {
                title: 'Commodity Class'
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
            importTariffsFreqGraph: {
                filename: {
                    first: 'Import-tariffs-frequency_graph'
                }
            }
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

    var exportRestrictions = {
        title: {
            exportRestrictionsFreqGraph: {
                zero: 'Number of AMIS Countries',
                first:'Number of AMIS countries with export restriction policies, disaggregated by policy measure'
            },
            exportRestrictionsTimeSeriesGraph: {
                zero: 'Number of AMIS Countries',
                first: 'Number of AMIS countries with export restrictions on wheat',
                second: 'Number of AMIS countries with export restrictions on maize',
                third: 'Number of AMIS countries with export restrictions on rice',
                fourth: 'Number of AMIS countries with export restrictions on soybeans',
                fifth: 'Number of AMIS countries with export restrictions on wheat, maize, rice or soybeans'
            }
        },
        subtitle: {
            exportRestrictionsFreqGraph: {
                first: "Period "+ filter.exportRestrictions.yearTitle.from+" until "+filter.exportRestrictions.yearTitle.to
            },
            exportRestrictionsTimeSeriesGraph: {
            }
        },
        notes: {
            exportRestrictionsFreqGraph: {
                first: 'Graph excludes mixed commodity classes. <br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database'
            },
            exportRestrictionsTimeSeriesGraph: {
                first: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                second: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                third: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                fourth: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database',
                fifth: 'Graph excludes mixed commodity classes.<br>Countries target their interventions on specific varieties, often at the HS8 or HS10 digit level.<br>Source: AMIS Policy Database'
            }
        },
        legend: {
            exportRestrictionsFreqGraph: {
                title: 'Policy Measure'
            },
            exportRestrictionsTimeSeriesGraph: {
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
            exportRestrictionsFreqGraph: {
                filename: {
                    first: 'Export-restrictions-frequency_graph'
                }
            },
            exportRestrictionsTimeSeriesGraph: {
                filename: {
                    first: 'Export-restrictions-time_series_graph'
                }
            }
        },
        time: {
            exportRestrictionsTimeSeriesGraph: {
                min: {year: 2010, month: 0, day: 1},
                max: {year: 2014, month: 0, day: 1},
                floor: {year: 2007, month: 0, day: 1},
                ceiling: {year: 2014, month: 11, day: 31}
            }
        }
    };

return {

    uid: "Policy_biofuelsPoliciesTimeSeriesGraph1",
    items: [
        {
            id: "item_9", //ref [data-item=':id']
            type: "chart", //chart || map || olap,
            config: {
                type: "highstock_series",
                x: ["day"], //x axis and series
                series: ["policytype"], //Y dimension
                y: ["value"],

                useDimensionLabelsIfExist: true,// || default raw else fenixtool
                aggregationFn: {"VALUE0": "sum"},

                config: {
                    chart: {
                        borderWidth: 2,
                        marginBottom: 200,
                        spacingBottom: 50,
                        events: {
                            load: function(event) {
                                // modify the legend symbol from a rect to a line
                                $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                var label = this.renderer.label(biofuelsPoliciesType.notes.biofuelsPoliciesTimeSeriesGraph.first)
                                    .css({
                                        width: '450px',
                                        margin : '200px',
                                        fontSize: '9px'
                                    })
                                    .attr({
                                        'r': 5,
                                        'padding': 50
                                    })
                                    .add();

                                label.align(Highcharts.extend(label.getBBox(), {
                                    align: 'left',
                                    x: -40, // offset
                                    verticalAlign: 'bottom',
                                    y: 60 // offset
                                }), null, 'spacingBox');
                            }
                        },
                        height:600
                    },
                    colors: [
                        '#125824',//Dark Green
                        '#255ba3',//Dark Blue
                        '#f6b539',//
                        // Dark Yellow
                        '#199e34',//Light Green
                        '#7f7f7f',//Dark Gray
                        '#67b7e3',//Light Blue
                        '#dc3018'//Red
                    ],
                    rangeSelector: {
                        enabled: true,
                        inputDateFormat: '%d-%m-%Y',
                        inputEditDateFormat: '%d-%m-%Y',
                        inputDateParser: function (value) {
                            value = value.split(/[-\.]/);
                            var month = parseInt(value[1],10)-1;
                            return Date.UTC(
                                parseInt(value[2], 10),
                                month,
                                parseInt(value[0], 10)
                            );
                        }
                    },
                    xAxis : {
                        min: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.min.day),
                        max: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.max.day),
                        floor: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.floor.day),
                        ceiling: Date.UTC(biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.year,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.month,biofuelsPoliciesType.time.biofuelsPoliciesTimeSeriesGraph.ceiling.day)
                    },
                    yAxis: {
                        min: 0,
                        allowDecimals: false,
                        title: {
                            text: biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.zero
                        },
                        opposite: false,
                        labels: {
                            formatter: function() {
                                return this.value;
                            }
                        },
                        plotLines: [{
                            value: 0,
                            width: 2,
                            color: 'silver'
                        }]
                    },

                    plotOptions: {
                        area:{
                            dataGrouping: {
                                enabled: false
                            }
                        },
                        series: {
                            events: {
                                show: function () {
                                    $('.highcharts-legend-item path').attr('stroke-width', '12').attr('y', '10');
                                }
                            }
                        }
                    },

                    title : {
                        text : biofuelsPoliciesType.title.biofuelsPoliciesTimeSeriesGraph.first,
                        style: {"fontSize": "15px"},
                        widthAdjust: -200
                    },

                    tooltip: {
                        formatter: function () {
                            var s = '<b>' + Highcharts.dateFormat('%B %Y', this.x) + '</b> <br/>';

                            $.each(this.points, function (i,point) {

                                s +='<span style="color:'+point.series.color+'">'+point.series.name+'</span>: '+Highcharts.numberFormat(point.y, 0) +'<br/>';

                            });
                            return s;
                        }
                    },
                    legend: {
                        title: {
                            text: biofuelsPoliciesType.legend.biofuelsPoliciesFreqGraph.title,
                            style: {
                                fontWeight: 'bold'
                            }
                        },
                        itemWidth: 200,
                        layout: 'horizontal',
                        align: 'center',
                        margin: 90,
                        y: -60,
                        x:0,
                        useHTML: true,
                        enabled: true,
                        borderColor: '#4572a7',
                        labelFormatter: function() {
                            var html_legend = ''+this.name;
                            return html_legend;
                        }
                    },
                    credits: {
                        enabled: false
                    },
                    exporting: {
                        buttons: {
                            contextButton: {
                                enabled: false

                            },
                            exportButton: {
                                theme: {
                                    "title": biofuelsPoliciesType.export.title,
                                    'stroke-width': 1,
                                    stroke: '#4572a7',
                                    fill:'#ADD8E6',
                                    r: 0,
                                    states: {
                                        hover: {
                                            fill: '#d3d3d3'
                                        }
                                    }
                                },
                                text: biofuelsPoliciesType.export.title,
                                menuItems: [
                                    {
                                        text: biofuelsPoliciesType.export.button_items.first,
                                        onclick: function () {
                                            var today = currentDate();
                                            this.exportChart({
                                                filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                            }, {subtitle: {text: today}});
                                        }

                                    },
                                    {
                                        text: biofuelsPoliciesType.export.button_items.second,
                                        onclick: function () {
                                            var today = currentDate();
                                            this.exportChart({
                                                type: 'image/jpeg',
                                                filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                            }, {subtitle: {text: today}});
                                        }
                                    },
                                    {
                                        text: biofuelsPoliciesType.export.button_items.third,
                                        onclick: function () {
                                            var today = currentDate();
                                            this.exportChart({
                                                type: 'image/svg+xml',
                                                filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                            }, {subtitle: {text: today}});
                                        }

                                    },
                                    {
                                        text: biofuelsPoliciesType.export.button_items.fourth,
                                        onclick: function () {
                                            var today = currentDate();
                                            this.exportChart({
                                                type: 'application/pdf',
                                                filename: biofuelsPoliciesType.export.biofuelsPoliciesTimeSeriesGraph.filename.first
                                            }, {subtitle: {text: today}});
                                        }
                                    }
                                ]
                            }
                        }
                    },
                }
            }, // :type-creator config

            postProcess: [
                {
                    "name": "filter",
                    "sid": [
                        {
                            "uid": "OECD_Timeseries_BiofuelPolicy"
                        }
                    ],
                    "parameters": {
                        "columns": [
                            "commodityclass",
                            "policytype",
                            "policymeasure",
                            "country",
                            "day"
                        ],
                        "rows": {
                            "commodityclass": {
                                "codes": [
                                    {
                                        "uid": "OECD_CommodityClass",
                                        "version": "1.0",
                                        "codes": [
                                            "5","6","7"
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
                            "day",
                            "policytype",
                            "country"
                        ],
                        "aggregations": []
                    }
                },
                {
                    "name": "addcolumn",
                    "parameters": {
                        "column": {
                            "dataType": "number",
                            "id": "value",

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
                            "day",
                            "policytype"
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
                }
            ]
        }]
}

});