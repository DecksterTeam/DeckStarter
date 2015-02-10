define([
    'jquery',
    'text!components/line-chart/line-chart.hbs',
    'handlebars',
    'bootstrap',
    'nv'
], function ($, LineChartHBS, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var params = options.params;
            this.id = "line-chart-" + params.id;
            var lineChartViewTemplate = Handlebars.compile(LineChartHBS);
            var lineChartViewHTML = lineChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": params.color
            });
            this.$el = $(lineChartViewHTML);
            options.parent.append(this.$el);

            var that = this;

            nv.addGraph(function() {
                var chart = nv.models.lineChart()
                            .margin({left: 100})
                            .showLegend(false)
                            .tooltips(false)
                            .showYAxis(true)
                            .showXAxis(true);

                chart.xAxis.axisLabel('x-Axis Label');

                chart.yAxis.axisLabel('y-Axis Label');

                d3.select('#' + that.id + ' svg')
                  .datum(params.data)
                  .call(chart);

                return chart;
            });
        }
    };
});