define([
    'jquery',
    'text!components/bar-chart/bar-chart.hbs',
    'handlebars',
    'bootstrap',
    'nv'
], function ($, BarChartHBS, Handlebars) {

    'use strict';

    return {
        "smallWidth": 2,
        "smallHeight": 1,
        "fullWidth": 4,
        "fullHeight": 1,
        render: function(options) {
            var params = options.params;
            this.id = "bar-chart-" + params.id;
            var barChartViewTemplate = Handlebars.compile(BarChartHBS);
            var barChartViewHTML = barChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": params.color
            });
            this.$el = $(barChartViewHTML);
            options.parent.append(this.$el);

            var that = this;


            nv.addGraph(function() {
                var chart = nv.models.discreteBarChart()
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value });

                d3.select('#' + that.id + '.bar-chart svg')
                    .datum(params.data)
                    .call(chart);
                    
                return chart;
            });
        },
        postRender: function(grid) {
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.fullWidth, that.fullHeight);
                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.smallWidth, that.smallHeight);
                }
            });
        }
    };
});