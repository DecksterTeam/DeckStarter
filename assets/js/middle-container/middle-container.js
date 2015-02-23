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

            $('.gridster ul').gridster({
                widget_margins: [10, 10],
                widget_base_dimensions: [280, 280]
            });

            this.gridster = $('.gridster ul').gridster().data('gridster');

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

            $.each(this.tiles, function(index, tile) {
                if(tile.setFullWidth) {
                    var cols = Math.floor($('.gridster').width()/300);
                    tile.setFullWidth(cols);
                }
            });

            var cols = Math.floor($('.gridster').width()/300);

            // this.gridster.set_dom_grid_width(cols * 300);

            // var curRow = 1;
            // var curCol = 1;

            // $.each(this.tiles, function(index, tile) {
            //     var dataRow = curRow;
            //     var dataCol = curCol;

            //     var endCol = curCol + tile.smallWidth - 1;

            //     if(endCol > cols) {
            //         curRow++;
            //         dataRow = curRow;
            //         dataCol = 1;
            //         curCol = 1 + tile.smallWidth;
            //     } else {
            //         curCol = endCol + 1;
            //     }

            //     console.log(dataRow + ', '+ dataCol);


            //     that.gridster.move_widget(tile.$el, dataCol, dataRow);
            // });
        }
    };
});