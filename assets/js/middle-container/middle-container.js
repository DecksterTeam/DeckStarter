define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/bar-chart/bar-chart',
    'components/percent-ring/percent-ring',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, BarChartView, PercentRingView, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            options.parent.append(this.$el);
            this.populateTiles();
        },
        populateTiles: function() {
            var that = this;

            var barChart = BarChartView;
            barChart.render({
                "parent": $('.tile-container'),
                "params": DataManager.tiles[0]
            });

            var percentRing = PercentRingView;
            percentRing.render({
                "parent": $('.tile-container'),
                "params": DataManager.tiles[1]
            });

            var percentRing = PercentRingView;
            percentRing.render({
                "parent": $('.tile-container'),
                "params": DataManager.tiles[2]
            });
        }
    };
});