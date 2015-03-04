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
			'angular': '../../lib/vendor/angular/angular.min.js',
			'angular-route': '../../lib/vendor/angular-route/angular-route.min.js',
			'deckster': '../../lib/vendor/decksterjs/dist/jquery.deckster.min'
        },
        shim: {
            'bootstrap' : {
                deps : ['jquery']
            }
        }, 
        urlArgs: "bust=" + (new Date()).getTime()
    });

    require( ['app', 'jquery', 'bootstrap', 'gridster'], 
        function(App, $) {
            App.initialize();
    });

}());