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
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.fullWidth, that.fullHeight);
                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.smallWidth, that.smallHeight);
                }
            });
        },
        setFullWidth: function(newFullWidth) {
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            this.fullWidth = newFullWidth;
            if($resizeBtn.hasClass('glyphicon-resize-small')) {
                that.grid.resize_widget($resizeBtn.parent(), that.fullWidth, that.fullHeight);
            }
        }
    };
});