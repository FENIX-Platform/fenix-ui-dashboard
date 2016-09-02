/*global define*/
define(function () {

    'use strict';

    return {

        validityTimeout: 10000, //10 secs

        cache: false,

        itemsRegistry: {
            'chart': {
                path: 'chart'
            },
            'map': {
                path: 'map'
            },
            'table': {
                path: 'table'
            },
            'box': {
                path: 'box'
            }
        }

    }

});