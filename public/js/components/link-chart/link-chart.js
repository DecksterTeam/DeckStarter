define([
    'jquery',
    'text!components/link-chart/link-chart.hbs',
    'handlebars',
    'radio',
    'cytoscape'
], function ($, HBS, Handlebars, Radio) {

    'use strict';

    var elements = [
	    {
	    	nodes: [
				{ data: { id: 'a', name: 'a' } },
				{ data: { id: 'e', name: 'e' } },
				{ data: { id: 'k', name: 'k' } },
				{ data: { id: 'g', name: 'g' } }
			],
			edges: [
				{ data: { source: 'a', target: 'e', name: 'a to e' } },
				{ data: { source: 'a', target: 'k', name: 'a to k' } },
				{ data: { source: 'a', target: 'g', name: 'a to g' } }
			]
	    },
	    {
	    	nodes: [
				{ data: { id: 'b', name: 'b' } },
				{ data: { id: 'e', name: 'e' } },
				{ data: { id: 'k', name: 'k' } },
				{ data: { id: 'g', name: 'g' } }
			],
			edges: [
				{ data: { source: 'b', target: 'e', name: 'b to e' } },
				{ data: { source: 'b', target: 'k', name: 'b to k' } },
				{ data: { source: 'b', target: 'g', name: 'b to g' } }
			]
	    },
	    {
	    	nodes: [
				{ data: { id: 'c', name: 'c' } },
				{ data: { id: 'e', name: 'e' } },
				{ data: { id: 'k', name: 'k' } },
				{ data: { id: 'g', name: 'g' } }
			],
			edges: [
				{ data: { source: 'c', target: 'e', name: 'c to e' } },
				{ data: { source: 'c', target: 'k', name: 'c to k' } },
				{ data: { source: 'c', target: 'g', name: 'c to g' } }
			]
	    }
    ];

    return {
        "id": "link-chart",
        "expandable": false,
        render: function(options) {
            $.extend(true, this, options);
            var template = Handlebars.compile(HBS);

            var html = template({
                "id": this.id
            });
            this.$el = $(html);
            Radio('searchSelector').subscribe(searchSelector);
        },
        getSummaryContentHtml: function() {
            return this.$el.html();
        },
        onSummaryLoad: function() {
            // addChart();
        },
        onResize: function() {
        	if(cy && cy.resize) {
            	cy.resize();
        	}
        },
        remove: function() {
        	Radio('searchSelector').unsubscribe(searchSelector);
            this.$el.remove();
        }
    };

    function searchSelector(selector) {
    	// Do a search for nodes and edges based on selector

    	if(selector === "a") {
    		addChart(0);
    	} else if (selector === "b") { 
    		addChart(1);
    	} else if (selector === "c") { 
    		addChart(2);
    	} else {
    		$('#cy').empty();
    		$('#link-chart .no-data-label').css('display', 'block');
    	}
    }

    function addChart(index) {
    	$('#link-chart .no-data-label').css('display', 'none');
    	$('#cy').cytoscape({
			style: cytoscape.stylesheet()
			.selector('node')
			.css({
				'content': 'data(name)',
				'text-valign': 'center',
				'color': 'black',
				'text-outline-width': 0,
				'text-outline-color': '#333',
				'background-color': '#0aa699',
				'font-size': '10px'
			})
			.selector('edge')
			.css({
				'content': 'data(name)',
				'text-valign': 'center',
				'color': 'black',
				'target-arrow-shape': 'triangle',
				'font-size': '8px'
			})
			.selector(':selected')
			.css({
				'background-color': '#6cd8cf',
				'line-color': '#6cd8cf',
				'target-arrow-color': '#6cd8cf',
				'source-arrow-color': '#6cd8cf'
			})
			.selector(':active')
			.css({
				'overlay-opacity': 0
			})
			.selector('core')
			.css({
				'selection-box-opacity': 0,
				'active-bg-opacity': 0,
				'outside-texture-bg-opacity': 0
			}),
			elements: elements[index],
			layout: {
				name: 'breadthfirst',
				padding: 10
			},
			ready: function(){
				window.cy = this;
				cy.on('click', function(e){
					var target = e.cyTarget;
					if(target != cy && target.isNode()) {
						Radio('nodeSelected').broadcast(target.data());
					} else {
						Radio('nodeSelected').broadcast();
					}
				});
			}
        });
    }

});