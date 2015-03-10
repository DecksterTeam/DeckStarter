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
            var infoAndPie = InfoAndPieView;
            infoAndPie.render({
                "id": 3,
                "color": "blue",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 4,
                "smallHeight": 2,
                "fullWidth": 8,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[6]
            });
            this.tiles.push(infoAndPie);

            var map = MapView;
            map.render({
                "id": 1,
                "color": "green",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 4,
                "smallHeight": 2,
                "fullWidth": 8,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[7]
            });
            this.tiles.push(map);

            var pie = PieChartView;
            pie.render({
                "id": 2,
                "color": "orange",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 2,
                "fullWidth": 8,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });
            this.tiles.push(pie);

            var line = LineChartView;
            line.render({
                "id": 1,
                "color": "purple",
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

            var bar = BarChartView;
            bar.render({
                "id": 1,
                "color": "red",
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

            var ring = PercentRingView;
            ring.render({
                "id": 4,
                "color": "red",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 1,
                "fullWidth": 8,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[0]
            });
            this.tiles.push(ring);

            var info = InfoBlockView;
            info.render({
                "id": 3,
                "color": "purple",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 1,
                "fullWidth": 8,
                "fullHeight": 4,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[6]
            });
            this.tiles.push(info);

            // var table = TableView;
            // table.render({
            //     "id": 1,
            //     "color": "blue",
            //     "startCol": 1,
            //     "startRow": 1,
            //     "smallWidth": 8,
            //     "smallHeight": 2,
            //     "fullWidth": 8,
            //     "fullHeight": 2,
            //     "parent": $('.gridster ul'),
            //     "params": DataManager.tiles[3]
            // });
            // this.tiles.push(table);
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