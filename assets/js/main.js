(function () {

    'use strict';

    require.config({
        paths: {
            'text': '../../lib/vendor/require-text/text',
            'jquery': '../../lib/vendor/jquery-1.11.2.min',
            'bootstrap': '../../lib/vendor/bootstrap-3.1.1-dist/js/bootstrap.min',
            'handlebars': '../../lib/vendor/handlebars/handlebars',
            'd3': '../../lib/vendor/d3/d3.min',
            'nv': '../../lib/vendor/nvd3/build/nv.d3.min'
        },
        shim: {
            'bootstrap': {
                deps: ['jquery']
            },
            'nv': {
                deps: ['d3']
            }
        }
    });

    require(['app', 'jquery', 'bootstrap'], 
        function(App, $) {
            App.initialize();
    });

}());