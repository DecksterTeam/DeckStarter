define([
    'jquery',
    'text!sidebar-left/sidebar-left.hbs',
    'handlebars',
    'bootstrap'
], function ($, SidebarLeftHBS, Handlebars) {

    'use strict';

    return {
        "filters": {
            "category1": {
                "alias": "Filter Category 1",
                "filters": {
                    "filter1": true,
                    "filter2": true,
                    "filter3": true,
                    "filter4": true
                }
            },
            "category2": {
                "alias": "Filter Category 1",
                "filters": {
                    "filter1": true,
                    "filter2": true,
                    "filter3": true,
                    "filter4": true
                }
            }
        },
        render: function(options) {
            var sidebarLeftViewTemplate = Handlebars.compile(SidebarLeftHBS);
            var sidebarLeftViewHTML = sidebarLeftViewTemplate();
            this.$el = $(sidebarLeftViewHTML);
            options.parent.append(this.$el);

            $('.filter-menu li a.filter-category').on('click', function() {
                if($(this).find('.caret').hasClass('right-caret')) {
                    $(this).find('.caret').removeClass('right-caret');
                    var category = $(this).data('category');
                    $('.filter-menu')
                        .find("[data-category='" + category + "']").addClass('active');
                } else {
                    $(this).find('.caret').addClass('right-caret');
                    var category = $(this).data('category');
                    $('.filter-menu')
                        .find("[data-category='" + category + "']").removeClass('active');
                }
            });

            $('.sub-filter li input').on('click', function() {
                if($(this).is(':checked')) {
                    $(this).prop("checked", false);
                } else {
                    $(this).prop("checked", true);
                }
            });

            var that = this;

            $('.sub-filter li').on('click', function() {
                var filter = $(this).data('filter');
                var input = $(this).find('input');
                var category = $(this).parent().data('category');

                if(input.is(':checked')) {
                    input.prop("checked", false);
                    that.filters[category].filters[filter] = false;
                } else {
                    input.prop("checked", true);
                    that.filters[category].filters[filter] = true;
                }

                // publish filter updates here
            });

            $('.sub-views li').on('click', function() {
                var view = $(this).data('view');

                if(!$(this).hasClass('active')) {

                    $('.sub-views li').removeClass('active');
                    $(this).addClass('active');

                    // publish new view here
                }
            });

            $('.filter-reset').on('click', function() {
                $.each(that.filters, function(i, category) {
                    $.each(category.filters, function(j, filter) {
                        that.filters[i].filters[j] = true;
                    });
                });

                $.each($('input'), function(index, input){
                    $(input).prop("checked", true);
                });

                // publish filter updates here
            });
        }
    };
});