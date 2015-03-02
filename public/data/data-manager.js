define([
    'jquery',
    'text!../data/mock.json'
], function ($, Mock) {

    'use strict';

    return {
        initialize: function() {
            // Set DataManager to be global
            window.DataManager = {
                tiles: JSON.parse(Mock).tiles
            };

            // Generate tiles
            // $.each(JSON.parse(Mock).tiles, function(index, tile) {
            //     DataManager.tiles.push(tile);
            // });
        }
    }

});