define([
    'jquery',
    'text!navbar/navbar.hbs',
    'handlebars',
    'bootstrap'
], function ($, NavbarHBS, Handlebars) {

    'use strict';

    return {
        render: function(parent) {
            var navbarViewTemplate = Handlebars.compile(NavbarHBS);
            var navbarViewHTML = navbarViewTemplate();
            this.$el = $(navbarViewHTML);
            parent.append(this.$el);
        }
    };
});