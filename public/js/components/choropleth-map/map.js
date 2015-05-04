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
        var features = [];

        $.each(Countries.json, function(key, obj){
            $.extend(true, obj.properties, {
                "code": key,
                "count": 1000
            });
            features.push(obj);
        });

        var geo = {
            "type":"FeatureCollection",
            "features":features
        };

        function getColor(d) {
            return d > 1000 ? '#800026' :
                   d > 500  ? '#BD0026' :
                   d > 200  ? '#E31A1C' :
                   d > 100  ? '#FC4E2A' :
                   d > 50   ? '#FD8D3C' :
                   d > 20   ? '#FEB24C' :
                   d > 10   ? '#FED976' :
                              '#FFEDA0';
        }

        function style(feature) {
            return {
                fillColor: getColor(feature.properties.count),
                weight: 1,
                opacity: 1,
                color: 'white',
                fillOpacity: 0.5
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
        highlightFeature(e);
    }

    function mouseout(e) {
        resetHighlight(e);
    }

    function click(e) {
        console.log(e);
        var popup = L.popup()
            .setLatLng(e.latlng)
            .setContent('<p>' + 
                        e.target.feature.properties.name +
                        ' (' + e.target.feature.properties.code + ')' +
                        ' - ' + 
                        e.target.feature.properties.count + 
                        '</p>')
            .openOn(map);
    }

    function zoomToFeature(e) {
        map.fitBounds(e.target.getBounds());
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 1,
            color: 'white',
            dashArray: '',
            fillOpacity: 0.8
        });

        if (!L.Browser.ie && !L.Browser.opera) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojson.resetStyle(e.target);
    }


});