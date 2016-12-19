/*global define*/

define(function () {

    'use strict';

    return {
    "uid": "Policy_biofuelsPoliciesFreqGraph",
    "items": [{
        "id": "item_9",
        "type": "chart",
        "config": {
            "type": "column",
            "x": ["commodityclass"],
            "series": ["policytype"],
            "y": ["VALUE0"],
            "useDimensionLabelsIfExist": true,
            "aggregationFn": {"VALUE0": "sum"},
            "config": {
                "chart": {"borderWidth": 2, "marginBottom": 170, "events": {}, "spacingBottom": 50},
                "title": {
                    "text": "Number of AMIS countries with biofuel policies, disaggregated by policy type",
                    "style": {"fontSize": "15px"}
                },
                "subtitle": {"text": "Period 01/2011 until 01/2014"},
                "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                "yAxis": {
                    "min": 0,
                    "allowDecimals": false,
                    "title": {"text": "Number of AMIS Countries", "enabled": true}
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
                    "title": {"text": "Policy Type", "style": {"fontWeight": "bold"}},
                    "itemWidth": 200,
                    "layout": "horizontal",
                    "align": "center",
                    "y": -30,
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
                                "title": "Download",
                                "stroke-width": 1,
                                "stroke": "#4572a7",
                                "fill": "#ADD8E6",
                                "r": 0,
                                "states": {"hover": {"fill": "#d3d3d3"}}
                            },
                            "text": "Download",
                            "menuItems": [{"text": "As PNG image"}, {"text": "As JPEG image"}, {"text": "As SVG vector image"}, {"text": "To PDF document"}]
                        }
                    }
                }
            }
        },
        "postProcess": [{
            "name": "filter",
            "sid": [{"uid": "OECD_View_BiofuelPolicy"}],
            "parameters": {
                "columns": ["commodityclass", "policytype", "country", "startDate", "endDate"],
                "rows": {
                    "commodityclass": {
                        "codes": [{
                            "uid": "OECD_CommodityClass",
                            "version": "1.0",
                            "codes": ["5", "6", "7"]
                        }]
                    }
                }
            }
        }, {
            "name": "select",
            "parameters": {
                "query": "WHERE (((startdate BETWEEN ? AND ?) OR (enddate BETWEEN ? AND ?))OR ((startdate <= ?) AND (enddate>=?)) OR (enddate IS NULL AND  startdate<=?))",
                "queryParameters": [{"value": 20110101}, {"value": 20140131}, {"value": 20110101}, {"value": 20140131}, {"value": 20110101}, {"value": 20140131}, {"value": 20140131}]
            },
            "rid": {"uid": "filter1"}
        }, {
            "name": "group",
            "parameters": {"by": ["commodityclass", "policytype", "country"], "aggregations": []}
        }, {
            "name": "addcolumn",
            "parameters": {
                "column": {
                    "dataType": "number",
                    "id": "VALUE0",
                    "title": {"EN": "Value"},
                    "subject": "value"
                }, "value": 1
            }
        }, {
            "name": "group",
            "parameters": {
                "by": ["commodityclass", "policytype"],
                "aggregations": [{"columns": ["VALUE0"], "rule": "SUM"}]
            },
            "rid": {"uid": "final"}
        }]
    }]
}

});