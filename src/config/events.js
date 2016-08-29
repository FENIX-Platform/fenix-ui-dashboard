if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}
define(function () {

    'use strict';

    var prefix = "fx.dashboard.";

    return {

        ITEM_READY: prefix + "item.ready",
        DASHBOARD_READY: prefix + "dashboard.ready",
      
       
    };
});
