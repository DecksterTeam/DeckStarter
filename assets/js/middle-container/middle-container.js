define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'handlebars',
    'text!middle-container/tile.hbs'
], function ($, MiddleContainerHBS, Handlebars, TileHBS) {
    'use strict';

	var _gridParent;
	var NUM_COLUMNS;
	var PADDING;
	var ROW_HEIGHT = 150;

	var getGridElement = function(event){
		return $(event.target).parents('li');
	};

    return {
        render: function(parent) {
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);

			parent.append(this.$el);
			return this;
        },
		
		initGrid: function(){
			_gridParent = $(this.$el).find('.gridster ul');
			NUM_COLUMNS = this.gatherColumns();
			PADDING = 5;
			
			this._width = $('.gridster').innerWidth() - NUM_COLUMNS * PADDING * 2;
			var gridster = _gridParent.gridster({
	          widget_base_dimensions: [this._width / NUM_COLUMNS, ROW_HEIGHT],
	          widget_margins: [5, 5]
	        }).data('gridster');
			
			this.renderTiles();
		},
		
		gatherColumns: function(){
			var col = $.map($(this.$el).find('.gridster ul li[data-col]'),
			 function(e,i){return parseInt($(e).data('col'));});
			return Math.max.apply(Math, col);
		},
		
		renderTiles: function(){
			var curr = this;
			_gridParent.children().each(function(i, el){
				var tile = Handlebars.compile(TileHBS);
				curr.applyTileTemplate(el);
				$(el).html(tile());
			});
			$('[data-tile-fullscreen]').on('click', this.resizeTile);
			$('[data-tile-visible]').on('click', this.closeTile);
		},
		
		applyTileTemplate: function(el){
			var t = $(el).data('template');
			if(t){
				require(['text!tiles/' + t + '.hbs'], function(innerTile){
					$(el).find('.parent').append(innerTile);
				});
			}
		},
		
		resizeTile: function(event){
			var elem = getGridElement(event);
			if(event.target.dataset.tileFullscreen === "true"){
				$(elem).data('o_x', $(elem).data('sizex'));
				$(elem).data('o_y', $(elem).data('sizey'));
				_gridParent.gridster().data('gridster').resize_widget(elem, 
					NUM_COLUMNS - parseInt($(elem).data('col')) + 1, 4);
				event.target.dataset.tileFullscreen = "false";
			}
			else {
				_gridParent.gridster().data('gridster').resize_widget(elem, 
					$(elem).data('o_x'), $(elem).data('o_y'));
				event.target.dataset.tileFullscreen = "true"
			}
		},
		
		closeTile: function(event){
			_gridParent.gridster().data('gridster').remove_widget(getGridElement(event));
		}
		
    };
});
