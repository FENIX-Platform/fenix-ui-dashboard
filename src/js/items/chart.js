if (typeof define !== 'function') {
    var define = require('amdefine')(module);
}

define([
    "jquery",
    "loglevel",
    'underscore',
    'fx-dashboard/config/errors',
    'fx-dashboard/config/events',
    'fx-dashboard/config/config',
    'fx-chart/start',
    'amplify'
], function ($, log, _, ERR, EVT, C, ChartCreator) {

    'use strict';

    var defaultOptions = {};

    function Chart(o) {

        var self = this;

        $.extend(true, this, defaultOptions, o);
        this.$el = $(this.el);

        this._renderTemplate();

        this._initVariables();

        this._renderChart();

        this._bindEventListeners();

        //force async execution
        window.setTimeout(function () {
            self.status.ready = true;
            amplify.publish(self._getEventName(EVT.SELECTOR_READY), self);
            self._trigger("ready");
        }, 0);

        return this;
    }

    /**
     * Disposition method
     * Mandatory method
     */
    Chart.prototype.dispose = function () {

        this._dispose();
        
        log.info("Selector disposed successfully");

    };

    /**
     * refresh method
     * Mandatory method
     */
    Chart.prototype.refresh = function () {

        log.info("Item refresh successfully");

    };


    /**
     * pub/sub
     * @return {Object} component instance
     */
    Chart.prototype.on = function (channel, fn, context) {
        var _context = context || this;
        if (!this.channels[channel]) {
            this.channels[channel] = [];
        }
        this.channels[channel].push({context: _context, callback: fn});
        return this;
    };

    Chart.prototype._trigger = function (channel) {

        if (!this.channels[channel]) {
            return false;
        }
        var args = Array.prototype.slice.call(arguments, 1);
        for (var i = 0, l = this.channels[channel].length; i < l; i++) {
            var subscription = this.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }

        return this;
    };

    Chart.prototype._getStatus = function () {

        return this.status;
    };

    Chart.prototype._renderTemplate = function () {

        //TODO
    };

    Chart.prototype._initVariables = function () {

        //Init status
        this.status = {};

        // pub/sub
        this.channels = {};

        //TODO
    };

    Chart.prototype._renderChart = function () {

        var self = this;
        var config = $.extend(true, {}, this.config, {
                model : this.model,
                el : this.$el,
                id : this.id,
                controller: this
        });

        var cc = new ChartCreator(config);
        console.log('cc =================')
        console.log(cc)
        cc.on("click", _.bind(this._onChartCreatorClick, this));
        console.log('on() ==================')

    };

    Chart.prototype._onChartCreatorClick = function (values) {
        this.controller._trigger('click', values);
    };

    Chart.prototype._destroyChart = function () {

        //TODO

        log.info("Destroyed Chart: " + this.id);
    };

    Chart.prototype._bindEventListeners = function () {
        //TODO
    };

    Chart.prototype._unbindEventListeners = function () {
        //TODO
    };

    Chart.prototype._dispose = function () {

        this._unbindEventListeners();

        this._destroyChart();

    };

    Chart.prototype._getEventName = function (evt) {

        return this.controller.id + evt;
    };

    return Chart;

});