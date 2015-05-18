define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'dashboards/tab1',
    'dashboards/tab2',
    'dashboards/tab3',
    'handlebars'
], function ($, MiddleContainerHBS, Tab1View, Tab2View, Tab3View, Handlebars) {

    'use strict';
	
	var _getDecksterSetup = function() {
        var mainDeckOptions = {
            rootUrl: '#/',
            gridsterOpts: {
                max_cols: 12,
                widget_margins: [10, 10],
                widget_base_dimensions: ['auto', 100],
                columns: 12,
                responsive_breakpoint: 768
            }
	  	};
		
		return {
			options: mainDeckOptions
		};
	};

    return {
        dashboards: {
            "tab1": Tab1View,
            "tab2": Tab2View,
            "tab3": Tab3View
        },
        currentDashboard: "tab1",
        marginLeft: "",
        render: function(options) {
            this.options = options;
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate({
                "marginLeft": this.marginLeft
            });
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
                    expandable: card.expandable || false,
                    fieldsToSerialize: ["id", "position"]
	  	        };

                if (typeof card.getSummaryContentHtml == 'function') { 
                    obj.getSummaryContentHtml = card.getSummaryContentHtml();
                }

                if (typeof card.getDetailsContentHtml == 'function') { 
                    obj.detailsContentHtml = card.getDetailsContentHtml();
                }

                if (typeof card.onDetailsLoad == 'function') { 
                    obj.onDetailsLoad = card.onDetailsLoad;
                }

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

            if(this.deck) {
                this.cards.sort(function (x, y) {
                    var n = x.position.row - y.position.row;
                    if (n != 0) {
                        return n;
                    }
                    return x.position.col - y.position.col;
                });
    			
    			this.deck.addCards(this.cards);
            }
        },
        changeDashboard: function(newDash) {
            if(this.deck) {
                var serializedDeckData = this.deck.serializeDeck();
                this.dashboards[this.currentDashboard].serialization = serializedDeckData.cards;
                this.deck.destroy();
            }
            $('.gridster').remove();
            this.dashboards[this.currentDashboard].removeTiles();

            this.currentDashboard = newDash;

            this.render({
                "parent": $('body')
            });
        },
        onResize: function() {
            this.dashboards[this.currentDashboard].onResize();
        },
        resizeDeck: function() {
            this.deck.$gridster.resize_responsive_layout();
        },
        setMarginClass: function(marginClass) {
            this.marginLeft = marginClass;
            if(marginClass === 'margin-left') {
                $('.middle-container').addClass('margin-left');
            } else {
                $('.middle-container').removeClass('margin-left');
            }
        }
    };
});
