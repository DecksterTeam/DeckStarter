define([
    'jquery',
    'components/node-view/node-view',
    'handlebars',
    'bootstrap'
], function ($, NodeView, Handlebars) {

    'use strict';

    return {
        tiles: [],
        serialization: [],
        populateTiles: function() {
            $('.deckster-deck').remove();
            this.nodeView = NodeView;
            this.nodeView.render();
        },
        removeTiles: function() {
            $.each(this.tiles, function(index, tile) {
                if(tile.remove) {
                    tile.remove();
                } else {
                    tile.$el.remove(); 
                }
            });
            this.tiles = [];
        },
        onResize: function() {
            this.nodeView.onResize();
        }
    };
});