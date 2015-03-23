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
                "smallWidth": 6,
                "smallHeight": 4,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[7]
            });
            this.tiles.push(map);
            
            var line = LineChartView;
            line.render({
                "id": 1,
                "color": "green",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 6,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[1]
            });
            this.tiles.push(line);

            var ring = PercentRingView;
            ring.render({
                "id": 4,
                "color": "red",
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

            var info = InfoBlockView;
            info.render({
                "id": 3,
                "color": "blue",
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

            var pie = PieChartView;
            pie.render({
                "id": 3,
                "color": "orange",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });
            this.tiles.push(pie);

            var table = TableView;
            table.render({
                "id": 1,
                "title": "Table",
                "color": "purple",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 12,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[3]
            });
            this.tiles.push(table);
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
        resize: function() {
            $.each(this.tiles, function(index, tile) {
                if(tile.postResize) {
                    tile.postResize();
                }
            });
        }
    };
});