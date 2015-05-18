define([
    'jquery',
    '../data/data-manager',
    'header/header',
    'navbar/navbar',
    'sidebar-left/sidebar-left',
    'middle-container/middle-container',
    'footer/footer'
], function ($, DataManager, HeaderView, NavbarView, SidebarLeftView, MiddleContainerView, FooterView) {

    'use strict';

    return {
        initialize: function () {
            DataManager.initialize();

            var $body = $('body');

            // var headerView = HeaderView;
            // headerView.render({
            //     "parent": $body
            // });

            var navbarView = NavbarView;
            navbarView.render({
                "parent": $body
            });

            var sidebarLeftView = SidebarLeftView;
            sidebarLeftView.render({
                "parent": $body
            });

            var middleContainerView = MiddleContainerView;
            middleContainerView.render({
                "parent": $body
            });

            $('#tabs a').on('click', function() {
                var that = this;
                $.each($('#tabs').children(), function(index, child) {
                    if($(child).attr('id') !== $(that).attr('id')) {
                        $(child).removeClass('active');
                    }
                });
                $(this).parent().addClass('active');
                
				middleContainerView.changeDashboard($(this).attr('id'));
            });

            $('.sidebar-control').on('click', function() {
                if($('.middle-container').hasClass('margin-left')) {
                    middleContainerView.setMarginClass('');
                    $('.sidebar').removeClass('active');   
                } else {
                    middleContainerView.setMarginClass('margin-left');
                    $('.sidebar').addClass('active');
                }
                middleContainerView.resizeDeck();
                middleContainerView.onResize();
            });

            // var footerView = FooterView;
            // footerView.render({
            //     "parent": $body
            // });

            var resizeTimeout;
            $(window).resize(function(){
                if(!!resizeTimeout){ clearTimeout(resizeTimeout); }
                resizeTimeout = setTimeout(function() {
                    $('.middle-container').height($(window).height()-50);
                    middleContainerView.onResize();
                },500);
            });
        }
    };
});