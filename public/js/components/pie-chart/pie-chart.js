define([
    'jquery',
    'text!components/pie-chart/pie-chart.hbs',
    'chart',
    'handlebars',
    'bootstrap'
], function ($, PieChartHBS, Chart, Handlebars) {

    'use strict';

    return {
        "smallCol": 1,
        "smallRow": 1,
        "smallWidth": 1,
        "smallHeight": 1,
        "fullWidth": 6,
        "fullHeight": 2,
        render: function(options) {
            this.options = options;
            var params = options.params;
            this.id = "pie-chart-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            this.fullWidth = options.fullWidth;
            var pieChartViewTemplate = Handlebars.compile(PieChartHBS);
            var pieChartViewHTML = pieChartViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": options.color || params.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(pieChartViewHTML);
            options.parent.append(this.$el);

            var that = this;

            this.data = [
                {
                    value: 100,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "Label 1"
                },
                {
                    value: 50,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "Label 2"
                },
                {
                    value: 30,
                    color: "#862B59",
                    highlight: "#924069",
                    label: "Label 3"
                },
                {
                    value: 130,
                    color:"#7c699f",
                    highlight: "#8a79a9",
                    label: "Label 4"
                },
                {
                    value: 30,
                    color: "#4884b8",
                    highlight: "#5a90bf",
                    label: "Label 5"
                }
            ];

            var $legend = $('#' + that.id + ' .pie-chart-legend');
            $.each(that.data, function(index, elem) {
                $legend.append('<span style="background-color:' + elem.color + ';">' + elem.label + '</span>');
            });

            setTimeout(function() {
                that.addChart(that.id);
            }, 300);
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');

                    // that.fullWidth = 6;

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

                    // if(parseInt(that.storedCol) > Math.floor($('.gridster').width()/300)) {
                    //     that.storedCol = 1;
                    // }

                    grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, parseInt(that.storedCol), function() {
                        $('#' + that.id + ' .chart-container').empty();
                        setTimeout(function() {
                            that.addChart(that.id);
                        }, 300);
                    });
                }
            });
        },
        postResize: function() {
            var that = this;
            $('#' + that.id + ' .chart-container').empty();
            setTimeout(function() {
                that.addChart(that.id);
            }, 300);
        },
        addChart: function(id) {
            var options = {
                segmentStrokeWidth : 1,
                animationEasing : "easeOutCirc",
                animationSteps : 30
            };

            var that = this;

            var newHeight = $('#' + that.id + ' .tile-content-container').height() - 50;
            var newWidth = newHeight;

            $('#' + that.id + ' .chart-container').append('<canvas width="' + newWidth + '" height="' + newHeight + '"></canvas>');

            var $canvas = $('#' + that.id + ' canvas');
            var ctx = $canvas.get(0).getContext("2d");
            var pieChart = new Chart(ctx).Pie(that.data, options);
        },
        updateWidth: function() {
            var that = this;
            var gridWidth = Math.floor($('.gridster').width()/300);
            var $widget = $(this.$el);
            $widget.attr("data-col",1).attr("data-row",1);

            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            if($resizeBtn.hasClass('glyphicon-resize-full')) {
                if($widget.attr("data-sizex") > gridWidth) {
                    $widget.attr("data-sizex", gridWidth);
                } else {
                    $widget.attr("data-sizex", that.smallWidth);
                }
            } else {
                $widget.attr("data-sizex", gridWidth);
            }
        }
    };
});