define([
    'jquery',
    'text!components/line-chart/line-chart.hbs',
    'handlebars',
    'bootstrap',
    'nv'
], function ($, LineChartHBS, Handlebars) {

    'use strict';

    return {
        "smallCol": 3,
        "smallRow": 2,
        "smallWidth": 2,
        "smallHeight": 1,
        "fullWidth": 4,
        "fullHeight": 2,
        render: function(options) {
            var params = options.params;
            this.id = "line-chart-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            var lineChartViewTemplate = Handlebars.compile(LineChartHBS);
            var lineChartViewHTML = lineChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": options.color || params.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(lineChartViewHTML);
            options.parent.append(this.$el);

            var that = this;

            nv.addGraph(function() {
                var chart = nv.models.lineChart()
                            .x(function(d) { return d.x })
                            .y(function(d) { return d.y })
                            .margin({left: 75, right: 30, top: 30})
                            .showLegend(false)
                            .useInteractiveGuideline(false)
                            .showYAxis(true)
                            .showXAxis(true);

                chart.xAxis
                    .axisLabel('x-Axis Label');

                chart.yAxis
                    .axisLabel('y-Axis Label');

                chart.tooltipContent(function(key, x, y, e, chart) {
                                return '<h3>' + key + '</h3>' +
                                    '<p>x = ' +  x + '</p>' +
                                    '<p>y = ' + y + '</p>';
                                    // '<p>(' +  x + ', ' + y + ')</p>';
                            });

                d3.select('#' + that.id + ' svg')
                    .datum(params.data)
                    .call(chart);

                    // nv.utils.windowResize(function() { chart.update() });

                    that.chart = chart;
                    return chart;
            });
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.fullWidth, that.fullHeight, function() {
                        setTimeout(function() {
                            that.chart.update();
                        }, 300);
                    });
                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.smallWidth, that.smallHeight, function() {
                        setTimeout(function() {
                            that.chart.update();
                        }, 300);
                    });
                }
            });
        },
        setFullWidth: function(newFullWidth) {
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            this.fullWidth = newFullWidth;
            if($resizeBtn.hasClass('glyphicon-resize-small')) {
                that.grid.resize_widget($resizeBtn.parent(), that.fullWidth, that.fullHeight, function() {
                    setTimeout(function() {
                        that.chart.update();
                    }, 300);
                });
            }
        }
    };
});