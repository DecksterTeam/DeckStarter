define([
    'jquery',
    'text!components/bar-chart/bar-chart.hbs',
    'handlebars',
    'bootstrap',
    'nv'
], function ($, BarChartHBS, Handlebars) {

    'use strict';

    return {
        "smallCol": 1,
        "smallRow": 1,
        "smallWidth": 2,
        "smallHeight": 1,
        "fullWidth": 4,
        "fullHeight": 2,
        render: function(options) {
            var params = options.params;
            this.id = "bar-chart-" + params.id;
            var barChartViewTemplate = Handlebars.compile(BarChartHBS);
            var barChartViewHTML = barChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": params.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(barChartViewHTML);
            options.parent.append(this.$el);

            var that = this;

            nv.addGraph(function() {
                var chart = nv.models.discreteBarChart()
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
                    .margin({top:30, bottom: 40, right: 30})
                    .staggerLabels(true);

                d3.select('#' + that.id + '.bar-chart svg')
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
                    // grid.mutate_widget_in_gridmap(
                    //     that.$el,
                    //     grid.serialize(that.$el)[0],
                    //     {
                    //         col: 1,
                    //         row: 1,
                    //         size_x: that.fullWidth,
                    //         size_y: that.fullHeight,
                    //     }
                    // );
                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.smallWidth, that.smallHeight, function() {
                        setTimeout(function() {
                            that.chart.update();
                        }, 300);
                    });
                    // grid.mutate_widget_in_gridmap(
                    //     that.$el,
                    //     grid.serialize(that.$el)[0],
                    //     {
                    //         col: 2,
                    //         row: 1,
                    //         size_x: that.smallWidth,
                    //         size_y: that.smallHeight,
                    //     }
                    // );
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