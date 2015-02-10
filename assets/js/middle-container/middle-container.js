define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/bar-chart/bar-chart',
    'components/line-chart/line-chart',
    'components/pie-chart/pie-chart',
    'components/percent-ring/percent-ring',
    'components/table/table',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, BarChartView, LineChartView, PieChartView, PercentRingView, TableView, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            options.parent.append(this.$el);
            this.populateTiles();

            $(".gridster ul").gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [290, 330]
            });

            var gridster = $(".gridster ul").gridster().data('gridster');
            // gridster.add_widget('<li>The HTML of the widget...</li>', 2, 1);
        },
        populateTiles: function() {
            var percentRing = PercentRingView;
            percentRing.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[0]
            });

            var barChart = BarChartView;
            barChart.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[1]
            });

            var pieChart = PieChartView;
            pieChart.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });

            var table = TableView;
            table.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[3]
            });

            var lineChart = LineChartView;
            lineChart.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[4]
            });
        }
    };
});