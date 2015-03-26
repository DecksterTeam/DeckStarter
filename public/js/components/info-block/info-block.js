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
            this.smallWidth = options.smallWidth;
            this.smallHeight = options.smallHeight;
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
			this.options = options;
            var infoBlockViewTemplate = Handlebars.compile(InfoBlockHBS);
            var infoBlockViewHTML = infoBlockViewTemplate({
                "info": params.data,
                "description": params.description
            });
            this.$el = $(infoBlockViewHTML);
			
			if(options.parent)
            	options.parent.append(this.$el);
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