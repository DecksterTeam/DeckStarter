define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'dashboards/tab1',
    'dashboards/tab2',
    'dashboards/tab3',
    'handlebars'
], function ($, MiddleContainerHBS, Tab1View, Tab2View, Tab3View, Handlebars) {

    'use strict';

    return {
        dashboards: {
            "tab1": Tab1View,
            "tab2": Tab2View,
            "tab3": Tab3View
        },
        currentDashboard: "tab1",
        render: function(options) {
            var serializedComponents = options.serializedComponents;
            this.options = options;
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            options.parent.append(this.$el);
            this.dashboards[this.currentDashboard].populateTiles();

            var that = this;

            var phDimensions = ($('.gridster').width()/12) - 5;
            var marginWidth = phDimensions * .03;
            var baseDimensions = phDimensions - (2*marginWidth);

            this.gridster = $('.gridster ul').gridster({
                widget_base_dimensions: [baseDimensions, baseDimensions],
                widget_margins: [marginWidth, marginWidth],
                draggable: {
                    handle: '.tile h4'
                }
            }).data('gridster');

            this.dashboards[this.currentDashboard].postRenderTiles(this.gridster);
        },
        resize: function() {
            var bodyWidth = $('body').width();
            var fullTileWidth = 12;

            var phDimensions = ($('.gridster').width()/fullTileWidth) - 5;
            var marginWidth = phDimensions * .03;
            var baseDimensions = phDimensions - (2*marginWidth);

            this.gridster.resize_widget_dimensions({
                widget_base_dimensions: [baseDimensions, baseDimensions],
                widget_margins: [marginWidth, marginWidth]
            });

            this.dashboards[this.currentDashboard].resize(fullTileWidth);

            this.gridster.generate_grid_and_stylesheet();
            this.gridster.get_widgets_from_DOM();
            this.gridster.set_dom_grid_height();
            this.gridster.set_dom_grid_width();
        },
        changeDashboard: function(newDash) {
            $('.gridster').remove();
            this.dashboards[this.currentDashboard].removeTiles();

            this.currentDashboard = newDash;

            this.render({
                "parent": $('body')
            });
        }
    };
});