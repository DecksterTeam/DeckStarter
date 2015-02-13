define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'components/bar-chart/bar-chart',
    'components/line-chart/line-chart',
    'components/pie-chart/pie-chart',
    'components/percent-ring/percent-ring',
    'components/info-block/info-block',
    'components/table/table',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, BarChartView, LineChartView, PieChartView, PercentRingView, InfoBlockView, TableView, Handlebars) {

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

            var pieChart1 = PieChartView;
            pieChart1.render({
                "id": 1,
                "color": "orange",
                "startCol": 1,
                "startRow": 1,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });
            this.tiles.push(pieChart1);

            var pieChart2 = PieChartView;
            pieChart2.render({
                "id": 2,
                "color": "green",
                "startCol": 2,
                "startRow": 1,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });
            this.tiles.push(pieChart2);

            var pieChart3 = PieChartView;
            pieChart3.render({
                "id": 3,
                "color": "blue",
                "startCol": 3,
                "startRow": 1,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });
            this.tiles.push(pieChart3);

            var pieChart4 = PieChartView;
            pieChart4.render({
                "id": 4,
                "color": "red",
                "startCol": 4,
                "startRow": 1,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[2]
            });
            this.tiles.push(pieChart4);

            var percentRing1 = InfoBlockView;
            percentRing1.render({
                "id": 1,
                "color": "purple",
                "startCol": 2,
                "startRow": 2,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[6]
            });
            this.tiles.push(percentRing1);

            var percentRing2 = InfoBlockView;
            percentRing2.render({
                "id": 2,
                "color": "orange",
                "startCol": 3,
                "startRow": 2,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[6]
            });
            this.tiles.push(percentRing2);

            var table1 = TableView;
            table1.render({
                "id": 1,
                "color": "green",
                "startCol": 3,
                "startRow": 2,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[3]
            });
            this.tiles.push(table1);

            var table2 = TableView;
            table2.render({
                "id": 2,
                "color": "blue",
                "startCol": 1,
                "startRow": 3,
                "parent": $('.gridster ul'),
                "params": DataManager.tiles[3]
            });
            this.tiles.push(table2);

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