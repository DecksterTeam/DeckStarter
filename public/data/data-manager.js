define([
    'jquery',
    'text!../data/mock.json',
    'text!../data/countries.geo.json'
], function ($, Mock, Geo) {

    'use strict';

    return {
        initialize: function() {
            // Set DataManager to be global
            window.DataManager = {
                tiles: JSON.parse(Mock).tiles,
                rawData: JSON.parse(Mock).rawData
            };

            window.Countries = {
                json: JSON.parse(Geo).json
            };

            // Generate tiles
            // $.each(JSON.parse(Mock).tiles, function(index, tile) {
            //     DataManager.tiles.push(tile);
            // });
        }
    }

});