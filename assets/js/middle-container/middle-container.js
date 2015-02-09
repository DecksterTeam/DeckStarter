define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/bar-chart/bar-chart',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, BarChartView, Handlebars) {

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
            $.each(DataManager.tiles, function(index, tile) {
                var barChart = BarChartView;
                barChart.render({
                    "parent": $('.tile-container'),
                    "params": tile
                });
            });
        }
    };
});