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

    var selectedNodes = [];

    var legend = {
        "icons": [
            {
                "type": "Contact",
                "path": "/images/icons/contact.png"
            },
            {
                "type": "Smartphone",
                "path": "/images/icons/smartphone.png",
                "marginLeft": "3px"
            },
            {
                "type": "Phone",
                "path": "/images/icons/phone.png"
            }
        ],
        "nodeTypes": [
            {
                "type": "Seed",
                "color": "#4884b8"
            },
            {
                "type": "Thing T",
                "color": "#24cc53"
            },
            {
                "type": "Other",
                "color": "gray"
            }
        ],
        "edgeTypes": [
            {
                "type": "Thing P",
                "color": "#4884b8"
            },
            {
                "type": "Thing I",
                "color": "#0aa699"
            },
            {
                "type": "Other",
                "color": "#bdbdbd"
            }
        ]
    };

    var data = {
    	nodes: [
    		{ data: { id: 'a', name: 'a', textAlign: 'bottom', color: '#4884b8', icon: '/images/icons/smartphone.png' } },
    		{ data: { id: 'b', name: 'b', textAlign: 'bottom', color: 'gray', icon: '/images/icons/contact.png' } },
			{ data: { id: 'c', name: 'c', textAlign: 'bottom', color: 'gray', icon: '/images/icons/contact.png' } },
			{ data: { id: 'd', name: 'd', textAlign: 'bottom', color: 'gray', icon: '/images/icons/contact.png' } },
			{ data: { id: 'e', name: 'e', textAlign: 'bottom', color: '#24cc53', icon: '/images/icons/phone.png' } },
			{ data: { id: 'f', name: 'f', textAlign: 'bottom', color: 'gray', icon: '/images/icons/contact.png' } },
			{ data: { id: 'g', name: 'g', textAlign: 'bottom', color: 'gray', icon: '/images/icons/contact.png' } },
			{ data: { id: 'h', name: 'h', textAlign: 'bottom', color: 'gray', icon: '/images/icons/contact.png' } }
		],
		edges: [
			{ data: { source: 'a', target: 'b', color: '#4884b8' } },
			{ data: { source: 'a', target: 'c', color: '#4884b8' } },
			{ data: { source: 'a', target: 'd', color: '#bdbdbd' } },
			{ data: { source: 'a', target: 'e', color: '#bdbdbd' } },
			{ data: { source: 'a', target: 'f', color: '#bdbdbd' } },
			{ data: { source: 'e', target: 'g', color: '#bdbdbd' } },
			{ data: { source: 'e', target: 'h', color: '#bdbdbd' } },
			{ data: { source: 'h', target: 'g', color: '#0aa699' } }
		]
    };

    var dataRemove = [
        { group: "nodes", data: { id: 'a', name: 'a', textAlign: 'bottom', color: '#4884b8', icon: '/images/icons/smartphone.png' } },
        { group: "edges", data: { source: 'a', target: 'b', color: '#4884b8' } }
    ];

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
                "id": this.id,
                "icons": legend.icons,
                "nodeTypes": legend.nodeTypes,
                "edgeTypes": legend.edgeTypes
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

            var autoHeight = $('#node-view .bottom-left-container').height();
            var autoWidth = $('#node-view .bottom-left-container').width();
            $('#node-view .bottom-left-container').css('width', autoWidth + 5);

            $('#node-view .legend-label').on('click', function() {
                if($('#node-view .bottom-left-container').hasClass('hide-legend')) {
                    $('#node-view .bottom-left-container').animate({
                        height: autoHeight
                    }, {
                        duration: 400,
                        complete: function() {
                            $('#node-view .bottom-left-container .caret').removeClass('caret-reversed');
                        }
                    });
                    $(this).css('border-radius', '4px 4px 0px 0px').css('border-bottom', '1px solid #ccc');
                    $('#node-view .bottom-left-container .legend-content').css('display', 'inline');
                    $('#node-view .bottom-left-container').removeClass('hide-legend');
                } else {
                    $('#node-view .bottom-left-container').animate({
                        height: '34px'
                    }, {
                        duration: 400,
                        complete: function() {
                            $('#node-view .bottom-left-container .legend-content').css('display', 'none');
                            $('#node-view .bottom-left-container .caret').addClass('caret-reversed');
                        }
                    });
                    $(this).css('border-radius', '4px').css('border-bottom', 'none');
                    $('#node-view .bottom-left-container').addClass('hide-legend');
                }
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

            // $('#searchModal').modal('show');
            searchSelector("a");

            $('#node-view .dropdown a').on('click', function() {
            	var layoutChoice = $(this).html();
            	$('#node-view .dropdown .layoutChoice').html(layoutChoice);
            	currentLayout = layoutChoice;
            	searchSelector(currentSelector);
            });

            $('.temp-remove-btn').on('click', function() {
                // cy.remove(cy.$("#a")); // remove by id
                cy.remove(cy.$(':selected'));
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
				'background-color': 'white',
                'background-opacity': 1,
                'background-image': 'data(icon)',
                'background-width': '60%',
                'background-height': '60%',
				'border-color': 'data(color)',
                'border-opacity': 1,
				'border-width': '4px',
				'font-size': '10px'
			})
			.selector('edge')
			.css({
				'content': 'data(name)',
				'text-valign': 'center',
				'color': '#333',
				'target-arrow-shape': 'triangle',
                'source-arrow-shape': 'triangle',
				'font-size': '8px',
                'line-color': 'data(color)',
                'target-arrow-color': 'data(color)',
                'source-arrow-color': 'data(color)'
			})
			.selector(':selected')
			.css({
				'line-color': '#333',
				'target-arrow-color': '#333',
				'source-arrow-color': '#333',
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
				cy.on('click', function(e) {
					var target = e.cyTarget;
					if(target != cy && target.isNode()) {
                        if(cy.$(':selected').length === 0) {
                            populateTable(target.data());
                        } else {
                            if(cy.$(':selected').length === 1 &&
                                cy.$(':selected')[0] === target) {
                                // do nothing
                            } else {
                                populateTable();
                            }
                        }
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