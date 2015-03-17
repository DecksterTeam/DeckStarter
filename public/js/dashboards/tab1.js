define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/info-and-pie/info-and-pie',
    'components/percent-ring/percent-ring',
    'components/info-block/info-block',
    'components/pie-chart/pie-chart',
    'components/line-chart/line-chart',
    'components/bar-chart/bar-chart',
    'components/table/table',
    'components/map/map',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, InfoAndPieView, PercentRingView, InfoBlockView, PieChartView, LineChartView, BarChartView, TableView, MapView, Handlebars) {

    'use strict';

    return {
        tiles: [],
        populateTiles: function(grid) {
            var map = MapView;
            map.render({
                "id": 1,
                "color": "green",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 8,
                "smallHeight": 4,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[7]
            });
            this.tiles.push(map);

            var info = InfoBlockView;
            info.render({
                "id": 3,
                "color": "purple",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[6]
            });
            this.tiles.push(info);

            var ring = PercentRingView;
            ring.render({
                "id": 4,
                "color": "orange",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[0]
            });
            this.tiles.push(ring);

            var table = TableView;
            table.render({
                "id": 1,
                "title": "Table",
                "color": "blue",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 4,
                "smallHeight": 4,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[3]
            });
            this.tiles.push(table);

            var bar = BarChartView;
            bar.render({
                "id": 1,
                "color": "red",
                "startCol": 1,
                "startRow": 9,
                "smallWidth": 8,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[1]
            });
            this.tiles.push(bar);
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
                if(tile.remove) {
                    tile.remove();
                } else {
                    tile.$el.remove(); 
                }
            });
            this.tiles = [];
        },
        resize: function(newFullWidth) {
            $.each(this.tiles, function(index, tile) {
                // tile.$el.attr('data-col', 1).attr('data-row', 1);
                // tile.fullWidth = newFullWidth;
                if(tile.postResize) {
                    tile.postResize();
                }
            });
        }
    };
});