define([
    'jquery',
    'text!sidebar-right/sidebar-right.hbs',
    'handlebars',
    'bootstrap'
], function ($, SidebarRightHBS, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var viewTemplate = Handlebars.compile(SidebarRightHBS);
            var html = viewTemplate();
            this.$el = $(html);
            options.parent.append(this.$el);
        }
    };
});