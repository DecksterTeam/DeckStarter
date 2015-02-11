define([
    'jquery',
    'text!components/pie-chart/pie-chart.hbs',
    'handlebars',
    'bootstrap',
    'nv'
], function ($, PieChartHBS, Handlebars) {

    'use strict';

    return {
        "smallWidth": 1,
        "smallHeight": 1,
        "fullWidth": 2,
        "fullHeight": 1,
        render: function(options) {
            var params = options.params;
            this.id = "pie-chart-" + params.id;
            var pieChartViewTemplate = Handlebars.compile(PieChartHBS);
            var pieChartViewHTML = pieChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": params.color
            });
            this.$el = $(pieChartViewHTML);
            options.parent.append(this.$el);

            var that = this;

            nv.addGraph(function() {
              var chart = nv.models.pieChart()
                    .margin({top: 20})
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
                    .showLabels(true);

                d3.select('#' + that.id + ' svg')
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