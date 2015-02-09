define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/bar-chart/bar-chart',
    'components/percent-ring/percent-ring',
    'components/table/table',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, BarChartView, PercentRingView, TableView, Handlebars) {

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

            var percentRing = PercentRingView;
            percentRing.render({
                "parent": $('.tile-container'),
                "params": DataManager.tiles[1]
            });

            var barChart = BarChartView;
            barChart.render({
                "parent": $('.tile-container'),
                "params": DataManager.tiles[0]
            });

            var percentRing = PercentRingView;
            percentRing.render({
                "parent": $('.tile-container'),
                "params": DataManager.tiles[2]
            });

            var table = TableView;
            table.render({
                "parent": $('.tile-container'),
                "params": DataManager.tiles[3]
            });

            var percentRing = PercentRingView;
            percentRing.render({
                "parent": $('.tile-container'),
                "params": DataManager.tiles[4]
            });
        }
    };
});