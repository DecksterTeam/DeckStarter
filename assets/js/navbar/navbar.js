define([
    'jquery',
    'text!navbar/navbar.hbs',
    'handlebars',
	'radio'
], function ($, NavbarHBS, Handlebars, Radio) {

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