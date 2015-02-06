(function () {

    'use strict';

    require.config({
        paths: {
            'text': '../../lib/vendor/require-text/text',
            'jquery': '../../lib/vendor/jquery-1.11.2.min',
            'bootstrap': '../../lib/vendor/bootstrap-3.1.1-dist/js/bootstrap.min',
            'handlebars': '../../lib/vendor/handlebars/handlebars',
			'gridster': '../../lib/vendor/gridster/jquery.gridster.min',
			'radio': '../../lib/vendor/radio/radio.min'
        },
        shim: {
            'bootstrap' : {
                deps : ['jquery']
            }
        }
    });

    require( ['app', 'jquery', 'bootstrap', 'gridster'], 
        function(App, $) {
            App.initialize();
    });

}());