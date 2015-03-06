define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/percent-ring/percent-ring',
    'components/info-block/info-block',
    'components/pie-chart/pie-chart',
    'components/table/table',
    'components/map/map',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, PercentRingView, InfoBlockView, PieChartView, TableView, MapView, Handlebars) {

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

            var that = this;

            var phDimensions = ($('.gridster').width()/8) - 10;
            var marginWidth = phDimensions * .03;
            var baseDimensions = phDimensions - (2*marginWidth);

            this.gridster = $('.gridster ul').gridster({
                widget_base_dimensions: [baseDimensions, baseDimensions],
                widget_margins: [marginWidth, marginWidth]
            }).data('gridster');

            this.postRenderTiles(this.gridster);
        },
        populateTiles: function() {

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

            var table1 = TableView;
            table1.render({
                "id": 1,
                "color": "blue",
                "startCol": 1,
                "startRow": 1,
                "smallWidth": 8,
                "smallHeight": 2,
                "fullWidth": 8,
                "fullHeight": 2,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[3]
            });
            this.tiles.push(table1);

        },
        postRenderTiles: function(grid) {
            var that = this;
            TableView.postRender(grid);
            $.each(this.tiles, function(index, tile) {
                if(tile.postRender) {
                    tile.postRender(grid);
                }
            });
            // this.resize();
        },
        resize: function() {

            var phDimensions = ($('.gridster').width()/8) - 10;
            var marginWidth = phDimensions * .03;
            var baseDimensions = phDimensions - (2*marginWidth);

            this.gridster.resize_widget_dimensions({
                widget_base_dimensions: [baseDimensions, baseDimensions],
                widget_margins: [marginWidth, marginWidth]
            });
            this.gridster.generate_grid_and_stylesheet();
            this.gridster.get_widgets_from_DOM();
            this.gridster.set_dom_grid_height();
            this.gridster.set_dom_grid_width();

            $.each(this.tiles, function(index, tile) {
                if(tile.postResize) {
                    tile.postResize();
                }
            });

        }
    };
});