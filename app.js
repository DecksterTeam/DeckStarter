require.config({
    paths: {
        'jQuery': 'lib/vendor/jquery-1.11.2.min.js',
        'bootstrap': 'lib/vendor/bootstrap-3.1.1-dist/js/bootstrap.min.js'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});


