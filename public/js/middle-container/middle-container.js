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
	
	var _getDecksterSetup = function() {
        var mainDeckOptions = {
            rootUrl: '#/',
            gridsterOpts: {
                max_cols: 12,
                widget_margins: [10, 10],
                widget_base_dimensions: ['auto', 100],
                columns: 12,
                responsive_breakpoint: 850
            }
	  	};
		
		return {
			options: mainDeckOptions
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
            
			var opts = _getDecksterSetup()
			
			var cards = this.dashboards[this.currentDashboard].tiles.map(function(card){
			console.log(card.$el.html());
				return {
		  	      title: card.options.title,
		  	      id: card.options.id,
		  	      class: card.options.color,
		  	      summaryContentHtml: card.$el.html(),
		  	      detailsContentHtml: card.$el.html(),
		  	      position: {
		  	        size_x: card.options.smallWidth,
		  	        size_y: card.options.smallHeight,
		  	        col: card.options.startCol,
					row: card.options.startRow
		  	      },
                  resizable: false
	  	    }
			});
			var deck = $('.gridster ul').deckster(opts.options).data('deckster');
			
			deck.addCards(cards);
            // this.dashboards[this.currentDashboard].postRenderTiles(this.gridster);
        },
        // resize: function() {
        //     var bodyWidth = $('body').width();
        //     var fullTileWidth = 12;

        //     var phDimensions = ($('.gridster').width()/fullTileWidth) - 5;
        //     var marginWidth = phDimensions * .03;
        //     var baseDimensions = phDimensions - (2*marginWidth);

        //     this.gridster.resize_widget_dimensions({
        //         widget_base_dimensions: [baseDimensions, baseDimensions],
        //         widget_margins: [marginWidth, marginWidth]
        //     });

        //     this.dashboards[this.currentDashboard].resize(fullTileWidth);

        //     this.gridster.generate_grid_and_stylesheet();
        //     this.gridster.get_widgets_from_DOM();
        //     this.gridster.set_dom_grid_height();
        //     this.gridster.set_dom_grid_width();
        // },
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
