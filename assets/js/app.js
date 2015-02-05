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

            // var headerView = HeaderView;
            // headerView.render($body);

            var navbarView = NavbarView;
            navbarView.render($body);

            var sidebarLeftView = SidebarLeftView;
            sidebarLeftView.render($body);

            var middleContainerView = MiddleContainerView;
            middleContainerView.render($body);

            // var footerView = FooterView;
            // footerView.render($body);
        }
    };
});