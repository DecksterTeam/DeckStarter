define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/link-chart/link-chart',
    'components/search-bar/search-bar',
    'components/link-chart-table/table',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, LinkChartView, SearchBarView, LinkChartTableView, Handlebars) {

    'use strict';

    return {
        tiles: [],
        serialization: [],
        populateTiles: function() {
            var linkChart = LinkChartView;
            linkChart.render({
                "title": "Link Chart",
                "color": "green",
                "startCol": 5,
                "startRow": 1,
                "smallWidth": 8,
                "smallHeight": 6,
                "fullWidth": 12,
                "fullHeight": 5
            });
            this.tiles.push(linkChart);

            var searchBar = SearchBarView;
            searchBar.render({
                "title": "Search for Selector",
                "color": "red",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 4,
                "smallHeight": 1,
                "fullWidth": 12,
                "fullHeight": 5
            });
            this.tiles.push(searchBar);

            var table = LinkChartTableView;
            table.render({
                "title": "No Selector",
                "color": "blue",
                "startCol": 1,
                "startRow": 2,
                "smallWidth": 4,
                "smallHeight": 5,
                "fullWidth": 12,
                "fullHeight": 5
            });
            this.tiles.push(table);
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