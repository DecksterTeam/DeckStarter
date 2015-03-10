define([
    'jquery',
    'text!navbar/navbar.hbs',
    'handlebars',
    'bootstrap'
], function ($, NavbarHBS, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var navbarViewTemplate = Handlebars.compile(NavbarHBS);
            var navbarViewHTML = navbarViewTemplate();
            this.$el = $(navbarViewHTML);
            options.parent.append(this.$el);

            $('.navbar-brand').on('click', function() {
                console.log('brand');
            });

            $('#profile').on('click', function() {
                console.log('profile');
            });
        }
    };
});