define([
    'jquery',
    'text!components/google-map/google-map.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, MapHBS, Handlebars, Radio) {

    'use strict';

    var googleMap,
        markers;

    return {
        "id": "google-map",
        render: function(options) {
            $.extend(true, this, options);
            var mapURL = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyC_oaxmPFs7aQIWVPEDeMErEfh_daoD0qU';
            var mapViewTemplate = Handlebars.compile(MapHBS);
            var mapViewHTML = mapViewTemplate();
            this.$el = $(mapViewHTML);

            Radio('plotOnMap').subscribe([this.plot, this]);
			
            return this.$el;
        },
        onSummaryLoad: function() {
            var mapOptions = {
                zoom: 4,
                center: new google.maps.LatLng(0,0)
            };

            googleMap = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            markers = [];
        },
        onExpand: function() {
            setTimeout(function() {
                google.maps.event.trigger(googleMap, "resize");
            }, 500);
        },
        onCollapse: function() {
            setTimeout(function() {
                google.maps.event.trigger(googleMap, "resize");
            }, 500);
        },
        remove: function() {
            Radio('plotOnMap').unsubscribe(this.plot);
            this.$el.remove();
        },
        onResize: function() {
            setTimeout(function() {
                google.maps.event.trigger(googleMap, "resize");
            }, 500);
        },
        plot: function(data) {
            for (var i = 0; i < markers.length; i++) {
                markers[i].setMap(null);
            }

            $.each(data.data, function(i, obj){
                $.each(obj.values, function(j, val){

                    var myLatlng = new google.maps.LatLng(
                        val.coords.lat,
                        val.coords.lon
                    );

                    var contentString = 
                        '<div id="content">'+
                        '<h3>' + val.fid + '</h3>'+
                        '<div>'+
                        '<p>lon: ' + val.coords.lon + '</p>'+
                        '<p>lat: ' + val.coords.lat + '</p>'+
                        '<p>month: ' + obj.key + '</p>'+
                        '</div>'+
                        '</div>';

                    var infowindow = new google.maps.InfoWindow({
                        content: contentString
                    });

                    var marker = new google.maps.Marker({
                        position: myLatlng,
                        map: googleMap,
                        title: val.fid
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(googleMap, marker);
                    });

                    markers.push(marker);

                });
            });
        },
        clear: function() {
            var that = this;
            for (var i = 0; i < this.markers.length; i++) {
                that.markers[i].setMap(null);
            }
        }
    };
});