define([
    'jquery',
    'text!components/pie-chart/pie-chart.hbs',
    'handlebars',
    'bootstrap',
    'nv'
], function ($, PieChartHBS, Handlebars) {

    'use strict';

    return {
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
        }
    };
});