define([
    'jquery',
    'text!components/bar-chart/bar-chart.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, BarChartHBS, Handlebars, Radio) {

    'use strict';

    var barChartData;

    return {
        "id": "bar-chart",
        render: function(options) {
            $.extend(true, this, options);
            var barChartViewTemplate = Handlebars.compile(BarChartHBS);
            var barChartViewHTML = barChartViewTemplate({
                "id": this.id
            });
            this.$el = $(barChartViewHTML);

            Radio('plotOnMap').subscribe([this.setNewData, this]);
			
            return this.$el;
        },
        onExpand: function() {
            if(barChartData) {
                $('#bar-chart.chart-container').empty();
                setTimeout(function() {
                    addChart();
                }, 500);
            }
        },
        onCollapse: function() {
            if(barChartData) {
                $('#bar-chart.chart-container').empty();
                setTimeout(function() {
                    addChart();
                }, 500);
            }
        },
        remove: function() {
            Radio('plotOnMap').unsubscribe([this.setNewData, this]);
            if(this.data) {
                $('#' + this.id + '.chart-container').empty();
            }
            this.$el.remove();
            barChartData = undefined;
        },
        onResize: function() {
            if(barChartData) {
                $('#bar-chart.chart-container').empty();
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

                barChartData = {
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

                $('#bar-chart.chart-container').empty();
                addChart();
            }
        }
    };

    function addChart() {
        if(barChartData) {
            var options = {};

            var newHeight = $('#bar-chart.chart-container').height() - 20;
            var newWidth = $('#bar-chart.chart-container').width() - 20;

            $('#bar-chart.chart-container').append('<canvas width="' + newWidth + '" height="' + newHeight + '"></canvas>');

            var $canvas = $('#bar-chart canvas');
            var ctx = $canvas.get(0).getContext("2d");
            var barChart = new Chart(ctx).Bar(barChartData, options);
        }
    }
});