define([
    'jquery',
    'text!components/bar-chart/bar-chart.hbs',
    'handlebars',
    'bootstrap',
    'nv'
], function ($, BarChartHBS, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var params = options.params;
            var barChartViewTemplate = Handlebars.compile(BarChartHBS);
            var barChartViewHTML = barChartViewTemplate({
                "id": "bar-chart-" + params.id,
                "title": params.title,
                "description": params.description,
                "color": params.color
            });
            this.$el = $(barChartViewHTML);
            options.parent.append(this.$el);

            nv.addGraph(function() {
                var chart = nv.models.discreteBarChart()
                    .x(function(d) { return d.label })
                    .y(function(d) { return d.value })
                    .staggerLabels(false)
                    .tooltips(false)
                    .showValues(true);

                d3.select('#bar-chart-' + params.id + '.bar-chart svg')
                    .datum(params.data)
                    .call(chart);

                // nv.utils.windowResize(chart.update);

                return chart;
            });
        }
    };
});