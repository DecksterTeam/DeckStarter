(function () {

    'use strict';

    require.config({
        paths: {
            'text': '../../lib/vendor/require-text/text',
            'jquery': '../../lib/vendor/jquery-1.11.2.min',
            'bootstrap': '../../lib/vendor/bootstrap-3.1.1-dist/js/bootstrap.min',
            'handlebars': '../../lib/vendor/handlebars/handlebars',
			'gridster': '../../lib/vendor/gridster/jquery.gridster',
			'radio': '../../lib/vendor/radio/radio.min',
			'deckster': '../../lib/vendor/decksterjs/jquery.deckster'
        },
        shim: {
            'bootstrap' : {
                deps : ['jquery']
            },
			'gridster' : {
				deps: ['jquery'],
			    exports: 'gridster'	
			},
			'deckster' : ['jquery']
        }, 
        urlArgs: "bust=2"// + (new Date()).getTime()
    });

    require( ['app', 'jquery', 'gridster', 'deckster'], 
        function(App, $) {
            App.initialize();
    });

}());