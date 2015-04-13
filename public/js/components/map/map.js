define([
    'jquery',
    'text!components/map/map.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, MapHBS, Handlebars, Radio) {

    'use strict';

    var mapData = [];

    return {
        "id": "map",
        render: function(options) {
            $.extend(true, this, options);
            var mapViewTemplate = Handlebars.compile(MapHBS);

            var mapViewHTML = mapViewTemplate({
                "id": this.id,
                "iframeId": "embed-map",
                "mapURL": 'https://meridianjs.com:3000/modes/embedded/'
            });
            this.$el = $(mapViewHTML);

            var detailsMapViewHTML = mapViewTemplate({
                "id": this.id,
                "iframeId": "details-embed-map",
                "mapURL": 'https://meridianjs.com:3000/'
            });
            this.$detailsEl = $(detailsMapViewHTML);

            Radio('plotOnMap').subscribe(plotOnMap);

            window.addEventListener("message", receiveMessage, false);
        },
        getSummaryContentHtml: function() {
            return this.$el.html();
        },
        getDetailsContentHtml: function() {
            return this.$detailsEl.html();
        },
        remove: function() {
            window.removeEventListener("message", receiveMessage, false);
            Radio('plotOnMap').unsubscribe(plotOnMap);
            this.$el.remove();
        }
    };

    function sendMessage(channel, message) {
        var toSend = {
            channel: channel,
            message: message
        };
        if(document.getElementById('embed-map')) {
            document.getElementById('embed-map').contentWindow.postMessage(toSend, 
                'https://meridianjs.com:3000/modes/embedded/');
        }
        if(document.getElementById('details-embed-map')) {
            document.getElementById('details-embed-map').contentWindow.postMessage(toSend, 
                'https://meridianjs.com:3000/');
        }
    }

    function receiveMessage(event) {
        if(event.data.channel === 'map.status.ready') {
            $('#map .loading-label').css('display', 'none');

            if(mapData.data.length > 0) {
                plotOnMap(mapData);
            }
        }
    }

    function plotOnMap(data) {
        sendMessage("map.clear", {});

        var features = [];

        $.each(data.data, function(i, obj){
            $.each(obj.values, function(j, val){
                var feature = {
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [val.coords.lon, val.coords.lon]
                    },
                    "properties": {
                        "featureId": val.fid,
                        "lon": val.coords.lon,
                        "lat": val.coords.lat,
                        "month": obj.key
                    }
                };
                features.push(feature);
            });
        });

        sendMessage("map.feature.plot", {
            "overlayId":"testOverlayId" + generateRandomData(0,9999),
            "name":"Test Name",
            "format":"geojson",
            "feature": {
                "type":"FeatureCollection",
                "features":features
            },
            "zoom":false,
            "dataZoom": true,
            "readOnly":false
        });

        mapData = data;

        console.log(mapData);
    }


    function generateRandomData(x, y) {
        return Math.floor(Math.random() * ((y-x)+1) + x);
    }
});