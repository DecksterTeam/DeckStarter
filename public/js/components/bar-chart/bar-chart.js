define([
    'jquery',
    'text!components/bar-chart/bar-chart.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, BarChartHBS, Handlebars, Radio) {

    'use strict';

    return {
        "smallCol": 3,
        "smallRow": 2,
        "smallWidth": 2,
        "smallHeight": 1,
        "fullWidth": 4,
        "fullHeight": 2,
        render: function(options) {
            var params = options.params;
            this.id = "bar-chart-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            this.smallWidth = options.smallWidth;
            this.smallHeight = options.smallHeight;
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var barChartViewTemplate = Handlebars.compile(BarChartHBS);
            var barChartViewHTML = barChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": options.color || params.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(barChartViewHTML);
            options.parent.append(this.$el);

            this.setNewData();

            Radio('plotOnMap').subscribe([this.setNewData, this]);
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');

                    that.storedCol = that.$el.attr("data-col");

                    grid.resize_widget_mod($resizeBtn.parent(), that.fullWidth, that.fullHeight, 1, function() {
                        $('#' + that.id + ' .chart-container').empty();
                        setTimeout(function() {
                            that.addChart(that.id);
                        }, 300);
                    });

                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');

                    grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, parseInt(that.storedCol), function() {
                        $('#' + that.id + ' .chart-container').empty();
                        setTimeout(function() {
                            that.addChart(that.id);
                        }, 300);
                    });
                }
            });
        },
        remove: function() {
            Radio('plotOnMap').unsubscribe(this.setNewData);
            $('#' + this.id + ' .chart-container').empty();
            this.$el.remove();
        },
        postResize: function() {
            var that = this;
            $('#' + that.id + ' .chart-container').empty();
            setTimeout(function() {
                that.addChart(that.id);
            }, 300);
        },
        addChart: function(id) {
            var options = {};

            var that = this;

            var newHeight = $('#' + that.id + ' .chart-container').height() - 20;
            var newWidth = $('#' + that.id + ' .chart-container').width() - 20;

            $('#' + that.id + ' .chart-container').append('<canvas width="' + newWidth + '" height="' + newHeight + '"></canvas>');

            var $canvas = $('#' + that.id + ' canvas');
            var ctx = $canvas.get(0).getContext("2d");
            var barChart = new Chart(ctx).Bar(that.data, options);
        },
        setNewData: function() {
            this.data = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "Dataset",
                        fillColor: "rgba(151,187,205,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(151,187,205,0.75)",
                        highlightStroke: "rgba(151,187,205,1)",
                        data: generateRandomData(1, 100)
                    }
                ]
            };

            var that = this;
            $('#' + that.id + ' .chart-container').empty();
            setTimeout(function() {
                that.addChart(that.id);
            }, 300);
        }
    };

    function generateRandomData(x, y) {
        var dataArray = [];
        for(var i = 0; i < 7; i++) {
            dataArray.push(Math.floor(Math.random() * ((y-x)+1) + x));
        }
        return dataArray;
    }
});