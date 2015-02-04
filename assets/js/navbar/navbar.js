define([
    'jquery',
    'underscore',
    'backbone',
    'text!navbar/navbar.hbs',
    'handlebars',
    'bootstrap'
], function ($, _, Backbone, NavbarHBS, Handlebars) {

    'use strict';
    var HeaderView = Backbone.View.extend({
        render: function() {
            var navbarViewTemplate = Handlebars.compile(NavbarHBS);
            var navbarViewHTML = navbarViewTemplate();
            this.$el.html(navbarViewHTML);
            
            return this;
        }
    });

    return HeaderView;
});