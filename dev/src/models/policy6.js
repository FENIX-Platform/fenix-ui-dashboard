/*global define*/

define(function () {// "id": "item_9",

    'use strict';

    return {
        "uid": "Policy_exportSubsidiesGraph",
        "items": [{
            "id": "item_9",
            "type": "chart",
            "config": {
                "type": "line",
                "x": ["startYear"],
                "series": ["element"],
                "y": ["value"],
                "useDimensionLabelsIfExist": true,
                "aggregationFn": {"value": "sum"},
                "config": {
                    "chart": {"borderWidth": 2, "marginBottom": 170, "events": {}, "spacingBottom": 50},
                    "title": {
                        "text": "Quantity and budgetary outlay export subsidies in Canada for Maize + Rice, commitments and notifications",
                        "style": {"fontSize": "15px"}
                    },
                    "subtitle": {"text": "1995/2011"},
                    "colors": ["#125824", "#255ba3", "#f6b539", "#199e34", "#7f7f7f", "#67b7e3", "#dc3018"],
                    "yAxis": {"min": 0, "allowDecimals": false, "title": {"text": "USD", "enabled": true}},
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
                        "title": {"text": "Policy Measure", "style": {"fontWeight": "bold"}},
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
                "sid": [{"uid": "OECD_View_ImportTariffs"}],
                "parameters": {
                    "columns": ["commodityclass", "element", "country", "startYear", "value", "um"],
                    "rows": {
                        "commodityclass": {
                            "codes": [{
                                "uid": "OECD_CommodityClass",
                                "version": "1.0",
                                "codes": ["9"]
                            }]
                        },
                        "policymeasure": {"codes": [{"uid": "OECD_PolicyMeasure", "version": "1.0", "codes": ["3"]}]},
                        "country": {"codes": [{"uid": "OECD_Country", "version": "1.0", "codes": ["46"]}]},
                        "policytype": {"codes": [{"uid": "OECD_PolicyType", "version": "1.0", "codes": ["1"]}]}
                    }
                }
            }, {
                "name": "group",
                "parameters": {
                    "by": ["commodityclass", "element", "country", "startYear", "um"],
                    "aggregations": [{"columns": ["value"], "rule": "SUM"}]
                }
            }, {"name": "order", "parameters": {"startYear": "ASC"}}]
        }]
    }

});