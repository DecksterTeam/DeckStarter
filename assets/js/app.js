define([
    'jquery',
    'header/header',
    'navbar/navbar',
    'sidebar-left/sidebar-left',
    'middle-container/middle-container',
    'footer/footer'
], function ($, HeaderView, NavbarView, SidebarLeftView, MiddleContainerView, FooterView) {

    'use strict';

    return {
        initialize: function () {
            var $body = $('body');

            // var headerView = new HeaderView();
            // var header = headerView.render();
            // $body.append(header.$el);

            var navbarView = new NavbarView();
            // var navbar = navbarView.render();
            // $body.append(navbar.$el);

            // var sidebarLeftView = new SidebarLeftView();
            // var sidebarLeft = sidebarLeftView.render();
            // $body.append(sidebarLeft.$el);

            // var middleContainerView = new MiddleContainerView();
            // var middleContainer = middleContainerView.render();
            // $body.append(middleContainer.$el);

            // var footerView = new FooterView();
            // var footer = footerView.render();
            // $body.append(footer.$el);
        }
    };
});