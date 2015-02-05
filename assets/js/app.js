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
            // var header = headerView.render();
            // $body.append(header.$el);

            var navbarView = NavbarView;
            var navbar = navbarView.render();
            $body.append(navbar.$el);

            var sidebarLeftView = SidebarLeftView;
            var sidebarLeft = sidebarLeftView.render();
            $body.append(sidebarLeft.$el);

            var middleContainerView = MiddleContainerView;
            var middleContainer = middleContainerView.render($body);
            middleContainer.initGrid();
			

            // var footerView = FooterView;
            // var footer = footerView.render();
            // $body.append(footer.$el);
        }
    };
});
