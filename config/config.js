/*global define*/

define(function () {

    'use strict';

    var selectorPath = "fx-dashboard/js/items/";

    return {

        VALID_TIMEOUT: 10000, //10 secs

        items_registry: {
            'chart': {
                path: selectorPath + 'chart'
            },
            'map': {
                path: selectorPath + 'map'
            },
            'olap': {
                path: selectorPath + 'olap'
            }
        }

    }

});