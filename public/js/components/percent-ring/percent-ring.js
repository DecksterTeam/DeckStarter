define([
    'jquery',
    'text!components/percent-ring/percent-ring.hbs',
    'handlebars',
    'bootstrap'
], function ($, PercentRingHBS, Handlebars) {

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
            this.id = "percent-ring-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            this.smallWidth = options.smallWidth;
            this.smallHeight = options.smallHeight;
			this.options = options;
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var percentRingViewTemplate = Handlebars.compile(PercentRingHBS);
            var barChartViewHTML = percentRingViewTemplate({
                "description": params.description,
                "color": options.color || params.color,
                "percent": params.data                
            });
            this.$el = $(barChartViewHTML);
        },
        // postRender: function(grid) {
        //     this.fillRing();
        //     this.grid = grid;
        //     var that = this;
        //     var $resizeBtn = $('#' + this.id + ' .resize-btn');
        //     $resizeBtn.on('click', function() {
        //         if($resizeBtn.hasClass('glyphicon-resize-full')) {
        //             $resizeBtn.removeClass('glyphicon-resize-full');
        //             $resizeBtn.addClass('glyphicon-resize-small');

        //             that.storedCol = that.$el.attr("data-col");

        //             grid.resize_widget_mod($resizeBtn.parent(), that.fullWidth, that.fullHeight, 1);

        //         } else {
        //             $resizeBtn.addClass('glyphicon-resize-full');
        //             $resizeBtn.removeClass('glyphicon-resize-small');

        //             // if(parseInt(that.storedCol) > Math.floor($('.gridster').width()/300)) {
        //             //     grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, 1);
        //             // } else {
        //                 grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, parseInt(that.storedCol));
        //             // }
        //         }
        //     });
        // },
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
        },
        fillRing: function() {
            var dark = $('#' + this.id + ' .dark')[0],
	            t = 5,
	            percentage = parseInt($('#' + this.id + ' .perc')[0].innerHTML.slice(0, -1), 10),
	            theta = 0,
	            maxTheta = (180 * percentage) / 50,
	            radius = $('#' + this.id + ' svg')[0].getBBox().width / 2;
            dark.setAttribute('transform', 'translate(' + radius + ',' + radius + ')');

            var animate = setInterval(function() {
	            theta += 2;
	            var d = 'M0,0 v' + -radius + 'A' + radius + ' ' + radius + ' 1 ' + ((theta > 180) ? 1 : 0) + ' 1 ' + Math.sin(theta * Math.PI / 180) * radius + ' ' + Math.cos(theta * Math.PI / 180) * -radius + 'z';
	            dark.setAttribute('d', d);
	            if (theta > maxTheta) {
	              clearInterval(animate);
	            }
            }, t);
        }
    };
});