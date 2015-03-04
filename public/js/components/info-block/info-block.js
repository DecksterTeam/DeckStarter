define([
    'jquery',
    'text!components/info-block/info-block.hbs',
    'handlebars',
    'bootstrap'
], function ($, InfoBlockHBS, Handlebars) {

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
            this.id = "info-block-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            var infoBlockViewTemplate = Handlebars.compile(InfoBlockHBS);
            var infoBlockViewHTML = infoBlockViewTemplate({
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
            this.$el = $(infoBlockViewHTML);
            options.parent.append(this.$el);

            this.postResize();
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');

                    that.fullWidth = 6;

                    that.storedCol = that.$el.attr("data-col");

                    grid.resize_widget_mod($resizeBtn.parent(), that.fullWidth, that.fullHeight, 1);

                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');

                    // if(parseInt(that.storedCol) > Math.floor($('.gridster').width()/300)) {
                    //     grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, 1);
                    // } else {
                        grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, parseInt(that.storedCol));
                    // }
                }
                that.postResize();
            });
        },
        postResize: function() {
            var that = this;
            setTimeout(function() {
                var height = $('#' + that.id + ' .tile-content-container').height()/2 - 15;

                var width = $('#' + that.id + ' .tile-content-container').width() - 10;

                var span = $('#' + that.id + ' .info');
                var fontSize = parseInt(span.css('font-size'));
                
                if(span.width() < width) {
                    do {
                        fontSize++;
                        span.css('font-size', fontSize.toString() + 'px').css('line-height', height + 'px').css('padding-top', height/2 - 10);
                    } while (span.width() <= width);
                } else {
                    do {
                        fontSize--;
                        span.css('font-size', fontSize.toString() + 'px').css('line-height', height + 'px').css('padding-top', height/2 - 10);
                    } while (span.width() >= width);
                }
            }, 300);
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