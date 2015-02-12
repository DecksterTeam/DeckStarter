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
        "fullWidth": 2,
        "fullHeight": 2,
        render: function(options) {
            this.options = options;
            var params = options.params;
            this.id = "pie-chart-" + params.id;
            var pieChartViewTemplate = Handlebars.compile(PieChartHBS);
            var pieChartViewHTML = pieChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": params.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(pieChartViewHTML);
            options.parent.append(this.$el);

            this.addChart();
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
                            d3.selectAll('#' + that.id + ' svg > *').remove();
                            that.addChart();
                        }, 300);
                    });
                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.smallWidth, that.smallHeight, function() {
                        setTimeout(function() {
                            d3.selectAll('#' + that.id + ' svg > *').remove();
                            that.addChart();
                        }, 300);
                    });
                }
            });
        },
        addChart: function() {
            var that = this;

            nv.addGraph(function() {
                var chart = nv.models.pieChart()
                    .margin({top: 20})
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
                    .showLabels(true);

                d3.select('#' + that.id + ' svg')
                    .datum(that.options.params.data)
                    .call(chart);

                // nv.utils.windowResize(function() { chart.update() });

                return chart;
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