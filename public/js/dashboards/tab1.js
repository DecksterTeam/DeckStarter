define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/percent-ring/percent-ring',
    'components/info-block/info-block',
    'components/bar-chart/bar-chart',
    'components/table/table',
    'components/google-map/google-map',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, PercentRingView, InfoBlockView, BarChartView, TableView, GoogleMapView, Handlebars) {

    'use strict';

    return {
        tiles: [],
        serialization: [],
        populateTiles: function() {
            var gMap = GoogleMapView;
            gMap.render({
                "title": "Map",
                "color": "green",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 8,
                "smallHeight": 4,
                "fullWidth": 12,
                "fullHeight": 5
            });
            this.tiles.push(gMap);
			
            var info = InfoBlockView;
            var iopts = {
                "title": "Information",
                "color": "purple",
                "startCol": 9,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 5
            };
            info.render(iopts);
            this.tiles.push(info);

            var ring = PercentRingView;
            var ropts = {
                "title": "Percent Ring",
                "color": "orange",
                "startCol": 11,
                "startRow": 1,
                "smallWidth": 2,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 5
            }
            ring.render(ropts);
            this.tiles.push(ring);

            var table = TableView;
            var topts = {
                "title": "Table",
                "color": "blue",
                "startCol": 9,
                "startRow": 3,
                "smallWidth": 4,
                "smallHeight": 4,
                "fullWidth": 12,
                "fullHeight": 5
            };
            table.render(topts);
            this.tiles.push(table);

            var bar = BarChartView;
            var bopts = {
                "title": "Bar Chart",
                "color": "red",
                "startCol": 1,
                "startRow": 5,
                "smallWidth": 8,
                "smallHeight": 2,
                "fullWidth": 12,
                "fullHeight": 5
            };
            bar.render(bopts);
            this.tiles.push(bar);
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