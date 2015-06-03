(function () {

    'use strict';

    require.config({
        paths: {
            'text': '../lib/vendor/require-text/text',
            'jquery': '../lib/vendor/jquery-1.11.2.min',
            'bootstrap': '../lib/vendor/bootstrap-3.1.1-dist/js/bootstrap.min',
            'handlebars': '../lib/vendor/handlebars/handlebars',
            'gridster': '../lib/vendor/gridster/jquery.gridster',
            'chart': '../lib/vendor/chartjs/chart.min',
            'radio': '../lib/vendor/radio/radio',
			'deckster': '../lib/vendor/decksterjs/jquery.deckster',
            'leaflet': '../lib/vendor/leaflet/leaflet',
            'cytoscape': '../lib/vendor/cytoscape/build/cytoscape.min',
            'cytoscapeQtip': '../lib/vendor/qtip/cytoscape-qtip',
            'qtip': '../lib/vendor/qtip/qtip.min',
            'dagre': '../lib/vendor/cytoscape/lib/dagre',
            'voronoi': '../lib/vendor/cytoscape/lib/rhill-voronoi-core',
            'cola': '../lib/vendor/cytoscape/lib/cola.v3.min',
            'foograph': '../lib/vendor/cytoscape/lib/foograph',
            'arbor': '../lib/vendor/cytoscape/lib/arbor',
            'springy': '../lib/vendor/cytoscape/lib/springy'
        },
        shim: {
            'bootstrap': {
                deps: ['jquery']
            },
            'gridster': {
                deps: ['jquery']
            },
            'qtip': {
                deps: ['jquery']
            },
            'cytoscape': {
                deps: ['jquery']
            },
            'cytoscapeQtip': {
                deps: ['jquery', 'cytoscape']
            },
            'dagre': {
                deps: ['jquery', 'cytoscape']
            },
            'cola': {
                deps: ['jquery', 'cytoscape']
            },
            'arbor': {
                deps: ['jquery', 'cytoscape']
            },
            'springy': {
                deps: ['jquery', 'cytoscape']
            },
			'deckster' : ['jquery']
        }
    });

    require([
        'app',
        'jquery',
        'bootstrap',
        'gridster',
        'deckster',
        'leaflet',
        'cytoscape',
        'qtip',
        'cytoscapeQtip',
        'dagre',
        'cola',
        'arbor',
        'springy'
        ], 
        function(App, $) {
            App.initialize();
    });

}());