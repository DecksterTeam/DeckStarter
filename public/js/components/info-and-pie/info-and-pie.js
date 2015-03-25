define([
    'jquery',
    'text!components/info-and-pie/info-and-pie.hbs',
    'handlebars',
    'bootstrap'
], function ($, InfoAndPieHBS, Handlebars) {

    'use strict';

    return {
        "smallCol": 1,
        "smallRow": 1,
    	"smallWidth": 1,
        "smallHeight": 1,
        "fullWidth": 2,
        "fullHeight": 2,
        render: function(options) {
            var params = options.params;
            this.id = "info-and-pie-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            this.smallWidth = options.smallWidth;
            this.smallHeight = options.smallHeight;
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var infoAndPieViewTemplate = Handlebars.compile(InfoAndPieHBS);
            var infoAndPieViewHTML = infoAndPieViewTemplate({
                "id": this.id,
                "title": params.title,
                "info": params.data,
                "description": params.description,
                "color": options.color || params.color,
                "percent": params.data,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(infoAndPieViewHTML);
			
			if(options.parent)
            	options.parent.append(this.$el);

            var that = this;

            this.data = [
                {
                    value: 100,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: "01"
                },
                {
                    value: 50,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: "02"
                },
                {
                    value: 30,
                    color: "#862B59",
                    highlight: "#924069",
                    label: "03"
                },
                {
                    value: 130,
                    color:"#7c699f",
                    highlight: "#8a79a9",
                    label: "04"
                },
                {
                    value: 30,
                    color: "#FFA14F",
                    highlight: "#ffaf69",
                    label: "05"
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

            var newHeight = $('#' + that.id + ' .pie-chart-container').height() - $('#' + that.id + ' .pie-chart-legend').height() - 25;
            var newWidth = newHeight;

            $('#' + that.id + ' .chart-container').append('<canvas width="' + newWidth + '" height="' + newHeight + '"></canvas>');

            var $canvas = $('#' + that.id + ' canvas');
            var ctx = $canvas.get(0).getContext("2d");
            var pieChart = new Chart(ctx).Pie(that.data, options);
        }
    };
});