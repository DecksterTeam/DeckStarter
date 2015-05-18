define([
    'jquery',
    'text!components/node-view/node-view.hbs',
    'text!components/node-view/search-modal.hbs',
    'handlebars',
    'radio',
    'cytoscape',
    'qtip',
    'cytoscapeQtip'
], function ($, HBS, searchModalHBS, Handlebars, Radio) {

    'use strict';

    var elements = [
	    {
	    	nodes: [
				{ 
					data: {
						id: 'a',
						name: 'apple',
						metadata: {
							'name': 'apple',
							'name1': 'apple',
							'name2': 'apple',
							'name3': 'apple',
							'name4': 'apple',
							'name5': 'apple',
							'name6': 'apple',
							'name7': 'apple',
							'name8': 'apple',
							'name9': 'apple',
							'name10': 'apple',
							'name11': 'apple',
							'name12': 'apple',
							'name13': 'apple',
							'name14': 'apple',
							'name15': 'apple',
							'name16': 'apple',
							'name17': 'apple',
							'name18': 'apple',
							'name19': 'apple'
						}
					} 
				},
				{ 
					data: { 
						id: 'e', 
						name: 'egg',
						metadata: {
							'count': 100
						}
					}
				},
				{ data: { id: 'k', name: 'kabob' } },
				{ data: { id: 'g', name: 'grape' } }
			],
			edges: [
				{ data: { source: 'e', target: 'a', name: 'e to a' } },
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

    var id;

    return {
        "id": "node-view",
        render: function(options) {
        	id = '#' + this.id;
            $.extend(true, this, options);
            var template = Handlebars.compile(HBS);
            var html = template({
                "id": this.id
            });
            var searchModalTemplate = Handlebars.compile(searchModalHBS);
            var searchModalHTML = searchModalTemplate();

            this.$el = $(html);
            this.$el.append(searchModalHTML);

            $('.middle-container').height($(window).height()-50);
            $('.middle-container').html(this.$el);
            // searchSelector('a');

            $('#searchModal').on('hidden.bs.modal', function () {
            	$('#searchModal .param').each(function(index) {
            		$(this).removeClass('has-error');
            	});
				clearModal();
			});

            $('#searchModal .go-btn').on('click', function() {
            	var param = $('#searchModal .paramInput').val();
            	var comment = $('#searchModal .commentInput').val();
            	var hasError = checkForErrors();
            	if(hasError === false) {
            		searchSelector(param);
            		clearModal();
            		$('#searchModal').modal('hide');
            	}
            });

            $('#searchModal').modal('show');
        },
        onResize: function() {
        	if(cy && cy.resize) {
            	cy.resize();
            	cy.fit(30);
            	$('#node-view .top-right-container').css('height', 'auto');
            	var height = $('.middle-container').parent().height() - 20;
	    		if($('#node-view .top-right-container').height() > height) {
	    			$('#node-view .top-right-container').height(height);
	    		}
        	}
        },
        remove: function() {
            this.$el.remove();
        }
    };

    function searchSelector(selector) {
    	if(selector === "a") {
    		addChart(0);
    	} else if (selector === "b") { 
    		addChart(1);
    	} else if (selector === "c") { 
    		addChart(2);
    	} else {
    		$('#cy').empty();
    		$(id + ' .no-data-label').css('display', 'block');
    	}
    }

    function addChart(index) {
    	$(id + ' .no-data-label').css('display', 'none');
    	$('#cy').cytoscape({
			style: cytoscape.stylesheet()
			.selector('node')
			.css({
				'content': 'data(id)',
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
				padding: 30
			},
			ready: function(){
				window.cy = this;
				cy.on('click', function(e){
					var target = e.cyTarget;
					if(target != cy && target.isNode()) {
						populateTable(target.data());
					} else {
						populateTable();
					}
				});

				cy.nodes().qtip({
                    content: function() { 
                    	return this.data('name') 
                    },
                    position: {
                        my: 'top center',
                        at: 'bottom center'
                    },
                    style: {
                        classes: 'qtip-bootstrap',
                        tip: {
                        	width: 16,
      						height: 8
                        }
                    },
                    show: {
                    	event: 'mouseover'
                    },
                    hide: {
                    	event: 'mouseout'
                    }
                });
			}
        });
    }

    function clearModal() {
    	$('#searchModal input').val('');
    	$('#searchModal textarea').val('');
    }

    function checkForErrors() {
    	var hasError = false;
    	$('#searchModal .param').each(function(index) {
    		if($(this).find('.form-control').val() === '') {
    			$(this).addClass('has-error');
    			hasError = true;
    		} else {
    			$(this).removeClass('has-error');
    		}
    	});
    	return hasError;
    }

    function populateTable(data) {
    	if(data) {
    		$('#node-view .top-right-container').css('display', 'block');
    		$('#node-view .top-right-container').css('height', 'auto');
    		$('#node-view .top-right-container .table-body').html('');
    		$('#node-view .top-right-container .table-body').append(
                '<tr>' +
                    '<td>Name</td>' +
                    '<td>' + data.name + '</td>' +
                '</tr>'
            );
    		if(data.metadata) {
		    	$.each(data.metadata, function(key, val){
		            $('#node-view .top-right-container .table-body').append(
		                '<tr>' +
		                    '<td>' + key + '</td>' +
		                    '<td>' + val + '</td>' +
		                '</tr>'
		            );
		        });
	    	}
	    	$('#node-view .top-right-container').animate({right:'10'},400);
	    	var height = $('.middle-container').parent().height() - 20;
    		if($('#node-view .top-right-container').height() > height) {
    			$('#node-view .top-right-container').height(height);
    		}
    	} else {
    		$('#node-view .top-right-container').animate(
	    		{
	    			right:'-200'
	    		},
	    		400,
	    		function() {
	    			$('#node-view .top-right-container').css('display', 'none');
	    		}
    		);
    	}
    }

});