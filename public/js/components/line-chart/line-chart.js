define([
    'jquery',
    'text!components/line-chart/line-chart.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, LineChartHBS, Handlebars, Radio) {

    'use strict';

    var lineChartData;

    return {
        "id": "line-chart",
        render: function(options) {
            $.extend(true, this, options);
            var lineChartViewTemplate = Handlebars.compile(LineChartHBS);
            var lineChartViewHTML = lineChartViewTemplate({
                "id": this.id
            });
            this.$el = $(lineChartViewHTML);

            Radio('plotOnMap').subscribe([this.setNewData, this]);
            
            return this.$el;
        },
        onExpand: function() {
            if(lineChartData) {
                $('#line-chart.chart-container').empty();
                setTimeout(function() {
                    addChart();
                }, 500);
            }
        },
        onCollapse: function() {
            if(lineChartData) {
                $('#line-chart.chart-container').empty();
                setTimeout(function() {
                    addChart();
                }, 500);
            }
        },
        remove: function() {
            Radio('plotOnMap').unsubscribe(this.setNewData);
            if(this.data) {
                $('#' + this.id + '.chart-container').empty();
            }
            this.$el.remove();
            lineChartData = undefined;
        },
        onResize: function() {
            if(lineChartData) {
                $('#line-chart.chart-container').empty();
                setTimeout(function() {
                    addChart();
                }, 500);
            }
        },
        setNewData: function(data) {
            if(data) {
                var labels = [];
                var dataCount = [];

                $.each(data.data, function(index, obj){
                    labels.push(obj.key);
                    dataCount.push(obj.values.length);
                });

                lineChartData = {
                    labels: labels,
                    datasets: [
                        {
                            label: "Dataset",
                            fillColor: "rgba(151,187,205,0.5)",
                            strokeColor: "rgba(151,187,205,0.8)",
                            highlightFill: "rgba(151,187,205,0.75)",
                            highlightStroke: "rgba(151,187,205,1)",
                            data: dataCount
                        }
                    ]
                };

                $('#line-chart.chart-container').empty();
                addChart();
            }
        }
    };

    function addChart() {
        if(lineChartData) {
            var options = {};

            var newHeight = $('#line-chart.chart-container').height() - 20;
            var newWidth = $('#line-chart.chart-container').width() - 20;

            $('#line-chart.chart-container').append('<canvas width="' + newWidth + '" height="' + newHeight + '"></canvas>');

            var $canvas = $('#line-chart canvas');
            var ctx = $canvas.get(0).getContext("2d");
            var barChart = new Chart(ctx).Line(lineChartData, options);
        }
    }
});