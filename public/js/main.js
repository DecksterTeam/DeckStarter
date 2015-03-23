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
			'deckster': '../lib/vendor/decksterjs/jquery.deckster'
        },
        shim: {
            'bootstrap': {
                deps: ['jquery']
            },
            'gridster': {
                deps: ['jquery']
            },
			'deckster' : ['jquery']
        }
    });

    require(['app', 'jquery', 'bootstrap', 'gridster', 'deckster'], 
        function(App, $) {
            App.initialize();
    });

}());