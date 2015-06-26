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

    var data = {
    	nodes: [
    		{ data: { id: 'a', name: 'a', textAlign: 'top', color:'purple' } },
    		// { data: { id: 'a1', name: 'a1', parent: 'a', textAlign: 'bottom', color: '#0aa699' } },
    		// { data: { id: 'a2', name: 'a2', parent: 'a', textAlign: 'bottom', color: '#0aa699' } },
    		// { data: { id: 'a3', name: 'a3', parent: 'a', textAlign: 'bottom', color: '#0aa699' } },
    		// { data: { id: 'a4', name: 'a4', parent: 'a', textAlign: 'bottom', color: '#0aa699' } },
    		// { data: { id: 'a5', name: 'a5', parent: 'a', textAlign: 'bottom', color: '#0aa699' } },
    		{ data: { id: 'b', name: 'b', textAlign: 'bottom', color: '#0aa699' } },
			{ data: { id: 'c', name: 'c', textAlign: 'bottom', color: '#0aa699' } },
			{ data: { id: 'd', name: 'd', textAlign: 'bottom', color: '#0aa699' } },
			{ data: { id: 'e', name: 'e', textAlign: 'bottom', color: '#0aa699' } },
			{ data: { id: 'f', name: 'f', textAlign: 'bottom', color: '#0aa699' } },
			{ data: { id: 'g', name: 'g', textAlign: 'bottom', color: '#0aa699' } },
			{ data: { id: 'h', name: 'h', textAlign: 'bottom', color: '#0aa699' } }
		],
		edges: [
			{ data: { source: 'a', target: 'b' } },
			{ data: { source: 'a', target: 'c' } },
			{ data: { source: 'a', target: 'd' } },
			{ data: { source: 'a', target: 'e' } },
			{ data: { source: 'a', target: 'f' } },
			{ data: { source: 'e', target: 'g' } },
			{ data: { source: 'e', target: 'h' } },
			{ data: { source: 'h', target: 'g' } }
		]
    };

    var id,
    	currentSelector,
    	currentLayout = 'breadthfirst';

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

            // $('.addElems').on('click', function() {
            // 	cy.add(elements[1]);
            // 	cy.load(cy.elements('*').jsons());
            // });

            // $('#searchModal').modal('show');
            searchSelector("a");

            $('#node-view .dropdown a').on('click', function() {
            	var layoutChoice = $(this).html();
            	$('#node-view .dropdown .layoutChoice').html(layoutChoice);
            	currentLayout = layoutChoice;
            	searchSelector(currentSelector);
            });
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
    	populateTable();
    	currentSelector = selector;
    	if(selector === "a") {
    		addChart(selector);
    	} else {
    		$('#cy').empty();
    		$(id + ' .no-data-label').css('display', 'block');
    	}
    }

    function addChart() {
    	$(id + ' .no-data-label').css('display', 'none');
    	$('#cy').cytoscape({
			style: cytoscape.stylesheet()
			.selector('node')
			.css({
				'content': 'data(name)',
				'text-valign': 'data(textAlign)',
				'color': 'black',
				'text-outline-width': 0,
				'text-outline-color': '#333',
				'background-color': 'data(color)',
                'background-opacity': 0.2,
                'background-image': '/images/icons/smartphone.png',
                'background-width': '70%',
                'background-height': '70%',
				'border-color': 'data(color)',
                'border-opacity': 1,
				// 'shape': 'roundrectangle',
				'border-width': '3px',
				'font-size': '10px'
			})
			.selector('edge')
			.css({
				'content': 'data(name)',
				'text-valign': 'center',
				'color': '#333',
				'target-arrow-shape': 'triangle',
				'font-size': '8px'
			})
			.selector(':selected')
			.css({
				'line-color': '#bdbdbd',
				'target-arrow-color': '#bdbdbd',
				'source-arrow-color': '#bdbdbd',
                'border-opacity': 0.6
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
			elements: data,
			layout: {
				name: currentLayout,
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