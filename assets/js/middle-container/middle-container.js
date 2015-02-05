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
			this.initGrid();
            return this;
        },
		
		initGrid: function(){
			var gridster = $(this.$el).find('.gridster ul').gridster({
	          widget_base_dimensions: [100, 100],
	          widget_margins: [5, 5],
	          helper: 'clone'
	        }).data('gridster');
			
  // resize widgets on hover
          gridster.$el
            .on('mouseenter', '> li', function() {
                gridster.resize_widget($(this), 3, 3);
            })
            .on('mouseleave', '> li', function() {
                gridster.resize_widget($(this), 1, 1);
            });
		}
    };
});