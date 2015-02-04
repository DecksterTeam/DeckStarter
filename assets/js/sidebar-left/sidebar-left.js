define([
    'jquery',
    'text!sidebar-left/sidebar-left.hbs',
    'handlebars',
    'bootstrap'
], function ($, SidebarLeftHBS, Handlebars) {

    'use strict';

    return {
        render: function() {
            var sidebarLeftViewTemplate = Handlebars.compile(SidebarLeftHBS);
            var sidebarLeftViewHTML = sidebarLeftViewTemplate();
            this.$el = $(sidebarLeftViewHTML);
            
            return this;
        }
    };
});