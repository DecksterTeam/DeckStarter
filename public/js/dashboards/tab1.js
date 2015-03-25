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
    'components/google-map/google-map',
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
                "title": "Map",
                "color": "green",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 8,
                "smallHeight": 4,
                "fullWidth": 12,
                "fullHeight": 4,
                "params": DataManager.tiles[7]
            });
            this.tiles.push(map);
			
            var info = InfoBlockView;
            var iopts = {
                "id": 3,
                "title": "Information",
                "color": "purple",
                "startCol": 9,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "params": DataManager.tiles[6]
            };
			info.render(iopts);
            this.tiles.push(info);

            var ring = PercentRingView;
			var ropts = {
                "id": 4,
                "title": "Percent Ring",
                "color": "orange",
                "startCol": 11,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "params": DataManager.tiles[0]
            }
            ring.render(ropts);
            this.tiles.push(ring);

            var table = TableView;
			var topts = {
                "id": 1,
                "title": "Table",
                "color": "blue",
                "startCol": 9,
                "startRow": 3,
                "smallWidth": 4,
                "smallHeight": 4,
                "fullWidth": 12,
                "fullHeight": 4,
                "params": DataManager.tiles[3]
            };
            table.render(topts);
            this.tiles.push(table);

            var bar = BarChartView;
            var bopts = {
                "id": 1,
                "title": "Bar Chart",
                "color": "red",
                "startCol": 1,
                "startRow": 9,
                "smallWidth": 8,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 4,
                "params": DataManager.tiles[1]
            };
			bar.render(bopts);
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
            // $.each(this.tiles, function(index, tile) {
            //     if(tile.postResize) {
            //         tile.postResize();
            //     }
            // });
        }
    };
});