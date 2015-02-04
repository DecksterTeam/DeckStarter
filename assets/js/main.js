(function () {

    'use strict';

    require.config({
        paths: {
            'text': '../../lib/vendor/require-text/text',
            'jquery': '../../lib/vendor/jquery-1.11.2.min',
            'bootstrap': '../../lib/vendor/bootstrap-3.1.1-dist/js/bootstrap.min',
            'handlebars': '../../lib/vendor/handlebars/handlebars'
        },
        shim: {
            'bootstrap' : {
                deps : ['jquery']
            }
        }
    });

    require( ['app', 'jquery', 'bootstrap'], 
        function(App, $) {
            App.initialize();
    });

}());