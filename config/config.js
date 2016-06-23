/*global define*/

define(function () {

    'use strict';

    var selectorPath = "fx-dashboard/js/items/";

    return {

        validityTimeout: 10000, //10 secs

        cache : false,

        itemsRegistry: {
            'chart': {
                path: selectorPath + 'chart'
            },
            'map': {
                path: selectorPath + 'map'
            },
            'table': {
                path: selectorPath + 'table'
            },
            'box': {
                path: selectorPath + 'box'
            }
        }

    }

});