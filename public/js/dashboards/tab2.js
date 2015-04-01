define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/percent-ring/percent-ring',
    'components/info-block/info-block',
    'components/pie-chart/pie-chart',
    'components/line-chart/line-chart',
    'components/bar-chart/bar-chart',
    'components/table/table',
    'components/map/map',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, PercentRingView, InfoBlockView, PieChartView, LineChartView, BarChartView, TableView, MapView, Handlebars) {

    'use strict';

    return {
        tiles: [],
        populateTiles: function() {
            var map = MapView;
            map.render({
                "title": "Map",
                "color": "green",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 6,
                "smallHeight": 6,
                "fullWidth": 12,
                "fullHeight": 5
            });
            this.tiles.push(map);

            var table = TableView;
            var topts = {
                "title": "Table",
                "color": "blue",
                "startCol": 7,
                "startRow": 1,
                "smallWidth": 6,
                "smallHeight": 3,
                "fullWidth": 12,
                "fullHeight": 5
            };
            table.render(topts);
            this.tiles.push(table);

            var line = LineChartView;
            var lopts = {
                "title": "Line Chart",
                "color": "red",
                "startCol": 7,
                "startRow": 4,
                "smallWidth": 6,
                "smallHeight": 3,
                "fullWidth": 12,
                "fullHeight": 5
            };
            line.render(lopts);
            this.tiles.push(line);
        },
        removeTiles: function() {
            $.each(this.tiles, function(index, tile) {
                if(tile.remove) {
                    tile.remove();
                } else {
                    tile.$el.remove(); 
                }
            });
            this.tiles = [];
        },
        onResize: function() {
            $.each(this.tiles, function(index, tile) {
                if(tile.onResize) {
                    tile.onResize();
                }
            });
        }
    };
});