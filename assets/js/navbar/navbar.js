define([
    'jquery',
    'text!navbar/navbar.hbs',
    'handlebars',
    'bootstrap'
], function ($, NavbarHBS, Handlebars) {

    'use strict';

    return {
        render: function() {
            var navbarViewTemplate = Handlebars.compile(NavbarHBS);
            var navbarViewHTML = navbarViewTemplate();
            // this.$el.html(navbarViewHTML);
            
            // return this;
        }
    };
});