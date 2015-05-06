define([
    'jquery',
    'text!components/choropleth-map/map.hbs',
    'handlebars',
    'radio',
    'leaflet',
    'bootstrap'
], function ($, MapHBS, Handlebars, Radio, L) {

    'use strict';

    var map,
        geojson;

    var colors = [
        '163,221,216',
        '101,199,191',
        '10,166,153',
        '7,124,114'
    ];

    return {
        "id": "map",
        render: function(options) {
            $.extend(true, this, options);
            var mapViewTemplate = Handlebars.compile(MapHBS);

            var mapViewHTML = mapViewTemplate({
                "id": this.id
            });
            this.$el = $(mapViewHTML);

            Radio('plotOnMap').subscribe(plotOnMap);

            window.addEventListener("message", receiveMessage, false);
        },
        getSummaryContentHtml: function() {
            return this.$el.html();
        },
        onSummaryLoad: function() {
            $('#map .loading-label').css('display', 'none');

            map = new L.Map('embed-map');

            var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
            var osm = new L.TileLayer(osmUrl, {minZoom: 2, maxZoom: 12, attribution: osmAttrib});       

            map.setView(new L.LatLng(30, 0),2);
            map.addLayer(osm);

            plotOnMap();

            $('#map .map-legend .color-box').each(function(index){
                $(this).css('background-color', 'rgba('+colors[index]+',0.8)');
            });
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
        document.getElementById('embed-map').contentWindow.postMessage(toSend, 
            'https://meridianjs.com:3000/modes/embedded/');
    }

    function receiveMessage(event) {
        if(event.data.channel === 'map.status.ready') {
            $('#map .loading-label').css('display', 'none');
            plotOnMap();
        }
    }

    function plotOnMap() {
        var count = 0;
        map.eachLayer(function (layer) {
            if(count != 0) {
                map.removeLayer(layer);
            }
            count++;
        });

        var features = [];

        $.each(Countries.json, function(key, obj){
            $.extend(true, obj.properties, {
                "code": key,
                "count": Math.pow(10,generateRandomData(1, 6))
            });
            features.push(obj);
        });

        features.splice(0,50);

        var geo = {
            "type":"FeatureCollection",
            "features":features
        };

        function getColor(d) {
            return d > 100000 ? colors[3] :
                    d > 1000  ? colors[2] :
                    d > 10  ? colors[1] :
                            colors[0];
        }

        function style(feature) {
            return {
                fillColor: 'rgb('+getColor(feature.properties.count)+')',
                weight: 0.8,
                opacity: 0.6,
                color: 'rgb('+getColor(feature.properties.count)+')',
                fillOpacity: 0.6
            };
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: mouseover,
                mouseout: mouseout,
                click: click
            });
        }

        geojson = L.geoJson(geo, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    }

    function mouseover(e) {
        update(e.target.feature.properties);
        highlightFeature(e);
    }

    function mouseout(e) {
        $('.featureInfo .properties').html('Hover over a country');
        resetHighlight(e);
    }

    function click(e) {
        zoomToFeature(e);
    }

    function update(props) {
        console.log($('.featureInfo'));
        $('.featureInfo .properties').html(
            '<b>'+props.name+' ('+props.code+')</b><br>'+props.count
        );
    };

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            fillOpacity: 0.8
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }

    function generateRandomData(x, y) {
        return Math.floor(Math.random() * ((y-x)+1) + x);
    }
});