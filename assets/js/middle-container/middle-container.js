define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'handlebars',
    'text!middle-container/tile.hbs'
], function ($, MiddleContainerHBS, Handlebars, TileHBS) {
    'use strict';

    return {
        render: function() {
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            return this;
        },
		
		initGrid: function(){
			this._gridParent = $(this.$el).find('.gridster ul');
			var NUM_COLUMNS = this.gatherColumns();
			var PADDING = 5;
			
			this._width = $('.gridster').innerWidth() - NUM_COLUMNS * PADDING * 2;
			var gridster = this._gridParent.gridster({
	          widget_base_dimensions: [this._width / 4, 100],
	          widget_margins: [5, 5],
	          helper: 'clone',
	          autogrow_cols: true,
	          resize: {
	            enabled: true
	          }
	        }).data('gridster');
			
			this.renderTiles();
		},
		
		gatherColumns: function(){
			var col = $.map($(this.$el).find('.gridster ul li[data-col]'), function(e,i){return parseInt($(e).data('col'));});
			return Math.max.apply(Math, col);
		},
		
		renderTiles: function(){
			this._gridParent.children().each(function(i, el){
				var tile = Handlebars.compile(TileHBS);
				$(el).html(tile());
			});
		}
    };
});