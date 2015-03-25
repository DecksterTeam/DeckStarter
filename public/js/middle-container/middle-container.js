define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'dashboards/tab1',
    'dashboards/tab2',
    'handlebars'
], function ($, MiddleContainerHBS, Tab1View, Tab2View, Handlebars) {

    'use strict';
	var getSummaryTemplate = function(){return "<div></div>"};
	
	var getDetailsTemplate = function(){return "<div></div>"};
	
	var _getDecksterSetup = function(){
	  	  var mainDeckOptions = {
	  	    rootUrl: '#/',
	  	    gridsterOpts: {
	  	      max_cols: 4,
	  	      widget_margins: [10, 10],
	  	      widget_base_dimensions: ['auto', 250],
	  	      responsive_breakpoint: 850
	  	    }
	  	  };

	  	  // Define a static array of card configurations or load them from a server (ex: user defined cards)
	  	  var cards = [
	  	    {
	  	      title: 'Bar Chart',
	  	      id: 'bar-chart',
	  	      class: 'blue',
	  	      summaryContentHtml: getSummaryTemplate,
	  	      detailsContentHtml: getDetailsTemplate,
	  	      position: {
	  	        size_x: 1,
	  	        size_y: 1,
	  	        col: 1,
	  	        row: 1
	  	      }
	  	    },
	  	    {
	  	      title: 'Pie Chart',
	  	      id: 'pie-chart',
	  	      class: 'red',
	  	      summaryContentHtml: getSummaryTemplate,
	  	      detailsContentHtml: getDetailsTemplate,
	  	      position: {
	  	        size_x: 1,
	  	        size_y: 2,
	  	        col: 4,
	  	        row: 1
	  	      }
	  	    },
	  	    {
	  	      title: 'Geospatial',
	  	      id: 'mapCard',
	  	      class: 'purple',
	  	      summaryContentHtml: getSummaryTemplate,
	  	      detailsContentHtml: getDetailsTemplate,
	  	      position: {
	  	        size_x: 2,
	  	        size_y: 2,
	  	        col: 2,
	  	        row: 1
	  	      }
	  	    },
	  	    {
	  	      title: 'Table Data',
	  	      id: 'table',
	  	      class: 'orange',
	  	      summaryContentHtml: getSummaryTemplate,
	  	      detailsContentHtml: getDetailsTemplate,
	  	      position: {
	  	        size_x: 1,
	  	        size_y: 2,
	  	        col: 1,
	  	        row: 2
	  	      }
	  	    },
	  	    {
	  	      title: 'Timeline',
	  	      id: 'timelineCard',
	  	      summaryContentHtml: getSummaryTemplate,
	  	      detailsContentHtml: getDetailsTemplate,
	  	      position: {
	  	        size_x: 3,
	  	        size_y: 1,
	  	        col: 2,
	  	        row: 3
	  	      }
	  	    }
	  	  ];
		
		return {
			options: mainDeckOptions,
			cards: cards
		};
	};


    return {
        dashboards: {
            "tab1": Tab1View,
            "tab2": Tab2View
        },
        currentDashboard: "tab1",
        render: function(options) {
            var serializedComponents = options.serializedComponents;
            this.options = options;
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            options.parent.append(this.$el);
			this.dashboards[this.currentDashboard].populateTiles();

            var that = this;
            //
            // var phDimensions = ($('.gridster').width()/12) - 5;
            // var marginWidth = phDimensions * .03;
            // var baseDimensions = phDimensions - (2*marginWidth);

            // this.gridster = $('.gridster ul').gridster({
            //     widget_base_dimensions: [baseDimensions, baseDimensions],
            //     widget_margins: [marginWidth, marginWidth],
            //     draggable: {
            //         handle: '.tile h4'
            //     }
            // }).data('gridster');
			var opts = _getDecksterSetup()
			var deck = $('.gridster ul').deckster(opts.options).data('deckster');
			deck.addCard(opts.cards[0]);
            this.dashboards[this.currentDashboard].postRenderTiles(this.gridster);
        },
        resize: function() {
            var bodyWidth = $('body').width();
            var fullTileWidth = 12;

            var phDimensions = ($('.gridster').width()/fullTileWidth) - 5;
            var marginWidth = phDimensions * .03;
            var baseDimensions = phDimensions - (2*marginWidth);

            this.gridster.resize_widget_dimensions({
                widget_base_dimensions: [baseDimensions, baseDimensions],
                widget_margins: [marginWidth, marginWidth]
            });

            this.dashboards[this.currentDashboard].resize(fullTileWidth);

            this.gridster.generate_grid_and_stylesheet();
            this.gridster.get_widgets_from_DOM();
            this.gridster.set_dom_grid_height();
            this.gridster.set_dom_grid_width();
        },
        changeDashboard: function(newDash) {
            $('.gridster').remove();
            this.dashboards[this.currentDashboard].removeTiles();

            this.currentDashboard = newDash;

            this.render({
                "parent": $('body')
            });
        }
    };
});