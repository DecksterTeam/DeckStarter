define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'handlebars',
    'bootstrap',
	'gridster'
], function ($, MiddleContainerHBS, Handlebars) {
    'use strict';

    return {
        render: function() {
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            return this;
        },
		
		initGrid: function(){
			var gridElem = $(this.$el).find('.gridster ul');
			var NUM_COLUMNS = this.gatherColumns();
			var PADDING = 5;
			
			this._width = $('.gridster').innerWidth() - NUM_COLUMNS * PADDING * 2;
			var gridster = gridElem.gridster({
	          widget_base_dimensions: [this._width / 4, 100],
	          widget_margins: [5, 5],
	          helper: 'clone',
	          autogrow_cols: true,
	          resize: {
	            enabled: true
	          }
	        }).data('gridster');
			
  		  // // resize widgets on hover
//           gridster.$el
//             .on('mouseenter', '> li', function() {
//                 gridster.resize_widget($(this), 3, 3);
//             })
//             .on('mouseleave', '> li', function() {
//                 gridster.resize_widget($(this), 1, 1);
//             });
		},
		
		gatherColumns: function(){
			var col = $.map($(this.$el).find('.gridster ul li[data-col]'), function(e,i){return parseInt($(e).data('col'));});
			return Math.max.apply(Math, col);
		}
    };
});