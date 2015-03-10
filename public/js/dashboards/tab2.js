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
        populateTiles: function(grid) {
            var map = MapView;
            map.render({
                "id": 1,
                "color": "blue",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 4,
                "smallHeight": 4,
                "fullWidth": 8,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[7]
            });
            this.tiles.push(map);
            
            var bar = BarChartView;
            bar.render({
                "id": 1,
                "color": "purple",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 4,
                "smallHeight": 2,
                "fullWidth": 8,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[1]
            });
            this.tiles.push(bar);

            var line = LineChartView;
            line.render({
                "id": 1,
                "color": "green",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 4,
                "smallHeight": 2,
                "fullWidth": 8,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[4]
            });
            this.tiles.push(line);
        },
        postRenderTiles: function(grid) {
            $.each(this.tiles, function(index, tile) {
                if(tile.postRender) {
                    tile.postRender(grid);
                }
            });
        },
        removeTiles: function() {
            $.each(this.tiles, function(index, tile) {
                tile.$el.remove();
            });
            this.tiles = [];
        },
        resize: function() {
            $.each(this.tiles, function(index, tile) {
                if(tile.postResize) {
                    tile.postResize();
                }
            });
        }
    };
});