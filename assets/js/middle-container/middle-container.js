define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/bar-chart/bar-chart',
    'components/line-chart/line-chart',
    'components/pie-chart/pie-chart',
    'components/percent-ring/percent-ring',
    'components/info-block/info-block',
    'components/table/table',
    'components/map/map',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, BarChartView, LineChartView, PieChartView, PercentRingView, InfoBlockView, TableView, MapView, Handlebars) {

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
            this.gridster = $('.gridster ul').gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [280, 280],
                resize: {
                    stop: that.resize
                }
            }).data('gridster');

            this.postRenderTiles(this.gridster);
        },
        populateTiles: function() {

            var map = MapView;
            map.render({
                "id": 1,
                "color": "blue",
                "startCol": 1,
                "startRow": 1,
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
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });
            this.tiles.push(pie);

            var info = InfoBlockView;
            info.render({
                "id": 3,
                "color": "green",
                "startCol": 1,
                "startRow": 1,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[6]
            });
            this.tiles.push(info);

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
            var that = this;

            console.log(this.gridster.$widgets);
            console.log(this.gridster.serialize());
            this.widgets = this.gridster.$widgets;
            this.serializedWidgets = this.gridster.serialize();

            this.gridster.destroy();
            $('.gridster ul').empty();
            $('.gridster').removeClass('ready');

            this.gridster = $('.gridster ul').gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [280, 280],
                resize: {
                    stop: that.resize
                }
            }).data('gridster');

            var maxCols = Math.floor($('.gridster').width()/300);

            $.each(this.widgets, function(index, widget) {
                var attrs = that.serializedWidgets[index];
                that.gridster.add_widget(widget, attrs.size_x, attrs.size_y);
            });

            this.postRenderTiles(this.gridster);
        }
    };
});