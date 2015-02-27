define([
    'jquery',
    'text!components/pie-chart/pie-chart.hbs',
    'handlebars',
    'bootstrap',
    'nv'
], function ($, PieChartHBS, Handlebars) {

    'use strict';

    return {
        "smallCol": 1,
        "smallRow": 1,
        "smallWidth": 1,
        "smallHeight": 1,
        "fullWidth": 4,
        "fullHeight": 2,
        render: function(options) {
            this.options = options;
            var params = options.params;
            this.id = "pie-chart-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            var pieChartViewTemplate = Handlebars.compile(PieChartHBS);
            var pieChartViewHTML = pieChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": options.color || params.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(pieChartViewHTML);
            options.parent.append(this.$el);

            this.addChart(this.id);
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');

                    that.fullWidth = Math.floor($('.gridster').width()/300);

                    that.storedCol = that.$el.attr("data-col");

                    grid.resize_widget_mod($resizeBtn.parent(), that.fullWidth, that.fullHeight, 1, function() {
                        setTimeout(function() {
                            d3.selectAll('#' + that.id + ' svg > *').remove();
                            that.addChart(that.id);
                        }, 300);
                    });

                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');

                    grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, parseInt(that.storedCol), function() {
                        setTimeout(function() {
                            d3.selectAll('#' + that.id + ' svg > *').remove();
                            that.addChart(that.id);
                        }, 300);
                    });
                }
            });
        },
        postResize: function() {
            var that = this;
            setTimeout(function() {
                d3.selectAll('#' + that.id + ' svg > *').remove();
                that.addChart(that.id);
            }, 300);
        },
        addChart: function(id) {
            var that = this;

            nv.addGraph(function() {
                var chart = nv.models.pieChart()
                    .margin({top: 20})
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
                    .showLabels(true);

                d3.select('#' + id + ' svg')
                    .datum(that.options.params.data)
                    .call(chart);

                return chart;
            });
        },
        updateWidth: function() {
            var that = this;
            var gridWidth = Math.floor($('.gridster').width()/300);
            var $widget = $(this.$el);
            $widget.attr("data-col",1).attr("data-row",1);

            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            if($resizeBtn.hasClass('glyphicon-resize-full')) {
                if($widget.attr("data-sizex") > gridWidth) {
                    $widget.attr("data-sizex", gridWidth);
                } else {
                    $widget.attr("data-sizex", that.smallWidth);
                }
            } else {
                $widget.attr("data-sizex", gridWidth);
            }
        }
    };
});