define([
    'jquery',
    'text!sidebar-left/sidebar-left.hbs',
    'handlebars',
    'bootstrap'
], function ($, SidebarLeftHBS, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var sidebarLeftViewTemplate = Handlebars.compile(SidebarLeftHBS);
            var sidebarLeftViewHTML = sidebarLeftViewTemplate();
            this.$el = $(sidebarLeftViewHTML);
            options.parent.append(this.$el);

            var selector = '.nav-menu li';
            $(selector).on('click', function(){
                $(selector).removeClass('active');
                $(this).addClass('active');
            });

            var filterSelector = '.filter-menu li';
            $(filterSelector).on('click', function() {
                if($(this).find('.caret').hasClass('right-caret')) {
                    $(this).find('.caret').removeClass('right-caret');
                } else {
                    $(this).find('.caret').addClass('right-caret');
                }
            });
        }
    };
});