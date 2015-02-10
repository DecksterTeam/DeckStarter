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
                    .y(function(d) { return d.value })
                    .staggerLabels(false)
                    .tooltips(false)
                    .showValues(true);

                d3.select('#' + that.id + '.bar-chart svg')
                    .datum(params.data)
                    .call(chart);

                return chart;
            });
        }
    };
});