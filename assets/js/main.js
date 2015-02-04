(function () {

    'use strict';

    require.config({
        paths: {
            'text': '../../lib/vendor/require-text/text',
            'jquery': '../../lib/vendor/jquery-1.11.2.min',
            'bootstrap': '../../lib/vendor/bootstrap-3.1.1-dist/js/bootstrap.min',
            'handlebars': '../../lib/vendor/handlebars/handlebars',
            'backbone': '../../lib/vendor/backbone/backbone',
            'underscore': '../../lib/vendor/underscore/underscore'
        },
        shim: {
            'bootstrap' : {
                deps : ['jquery']
            },
            'backbone' : {
                deps : ['jquery', 'underscore']
            }
        }
    });

    require( ['app', 'jquery', 'underscore', 'bootstrap', 'backbone'], 
        function(App, $) {
            App.initialize();
    });

}());