define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'dashboards/tab1',
    'dashboards/tab2',
    'handlebars'
], function ($, MiddleContainerHBS, Tab1View, Tab2View, Handlebars) {

    'use strict';
	
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
            this.options = options;
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            options.parent.append(this.$el);
			this.dashboards[this.currentDashboard].populateTiles();

            var that = this;
            
			var opts = _getDecksterSetup()
			
			this.cards = this.dashboards[this.currentDashboard].tiles.map(function(card){
				var obj = {
                    id: card.id,
                    title: card.title,
                    class: card.color,
                    summaryContentHtml: card.$el.html(),
                    onSummaryLoad: card.onSummaryLoad,
                    onExpand: card.onExpand,
                    onCollapse: card.onCollapse,
                    position: {
                        size_x: card.smallWidth,
                        size_y: card.smallHeight,
                        col: card.startCol,
                        row: card.startRow,
                        expanded_x: card.fullWidth,
                        expanded_y: card.fullHeight
                    },
                    resizable: false,
                    fieldsToSerialize: ["id", "position"]
	  	        };

                var serialization = that.dashboards[that.currentDashboard].serialization;
                if(serialization.length != 0) {
                    $.each(serialization, function(index, cardData) {
                        if(obj.id === cardData.id) {
                            obj.position = cardData.position;
                        }
                    });
                }

                return obj;
			});

			this.deck = $('.gridster ul').deckster(opts.options).data('deckster');
			
			this.deck.addCards(this.cards);

            $('.navbar-brand').on('click', function(){
                console.log(that.deck.serializeDeck());
            });
        },
        changeDashboard: function(newDash) {
            var serializedDeckData = this.deck.serializeDeck();
            this.dashboards[this.currentDashboard].serialization = serializedDeckData.cards;

            this.deck.destroy();
            $('.gridster').remove();
            this.dashboards[this.currentDashboard].removeTiles();

            this.currentDashboard = newDash;

            this.render({
                "parent": $('body')
            });
        },
        onResize: function() {
            this.dashboards[this.currentDashboard].onResize();
        }
    };
});
