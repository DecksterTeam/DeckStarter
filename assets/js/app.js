define([
    'jquery',
    'header/header',
    'navbar/navbar',
    'sidebar-left/sidebar-left',
    'middle-container/middle-container',
	'deckster-app/main',
    'footer/footer'
], function ($, HeaderView, NavbarView, SidebarLeftView, MiddleContainerView, DecksterMain, FooterView) {

    'use strict';

    return {
        initialize: function () {
            var $body = $('body');

            // var headerView = HeaderView;
            // var header = headerView.render();
            // $body.append(header.$el);

            // var navbarView = NavbarView;
 //            var navbar = navbarView.render($body);
 //
 //            var sidebarLeftView = SidebarLeftView;
 //            var sidebarLeft = sidebarLeftView.render($body);

           //  var middleContainerView = MiddleContainerView;
//             var middleContainer = middleContainerView.render($body);
// 			   middleContainer.initGrid();
	 		 DecksterMain.render($body);
			

            // var footerView = FooterView;
            // var footer = footerView.render();
            // $body.append(footer.$el);
        }
    };
});
