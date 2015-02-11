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
        tiles: [],
        render: function(options) {
            var serializedComponents = options.serializedComponents;
            this.options = options;
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            options.parent.append(this.$el);
            this.populateTiles();

            $(".gridster ul").gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [290, 330]
            });

            this.gridster = $(".gridster ul").gridster().data('gridster');

            this.postRenderTiles(this.gridster);
        },
        populateTiles: function() {
            var percentRing = PercentRingView;
            percentRing.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[0]
            });
            this.tiles.push(percentRing);

            var barChart = BarChartView;
            barChart.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[1]
            });
            this.tiles.push(barChart);

            var pieChart = PieChartView;
            pieChart.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });
            this.tiles.push(pieChart);

            var table = TableView;
            table.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[3]
            });
            this.tiles.push(table);

            var lineChart = LineChartView;
            lineChart.render({
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[4]
            });
            this.tiles.push(lineChart);
        },
        postRenderTiles: function(grid) {
            var that = this;
            $.each(this.tiles, function(index, tile) {
                if(tile.postRender) {
                    tile.postRender(grid);
                }
            });
        },
        destroy: function() {
            var serializedComponents = this.gridster.serialize();
            this.gridster.destroy();
            this.$el.remove();
            return serializedComponents;
        }
    };
});