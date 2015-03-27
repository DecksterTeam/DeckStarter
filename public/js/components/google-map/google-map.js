define([
    'jquery',
    'text!components/google-map/google-map.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, MapHBS, Handlebars, Radio) {

    'use strict';

    return {
        "smallCol": 1,
        "smallRow": 1,
    	"smallWidth": 2,
        "smallHeight": 2,
        "fullWidth": 8,
        "fullHeight": 2,
        render: function(options) {
            var mapURL = 'https://www.google.com/maps/embed/v1/search?key=AIzaSyC_oaxmPFs7aQIWVPEDeMErEfh_daoD0qU';
            var params = options.params;
            this.id = "map-1";
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            this.smallWidth = options.smallWidth;
            this.smallHeight = options.smallHeight;
			this.options = options;
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var mapViewTemplate = Handlebars.compile(MapHBS);
            var mapViewHTML = mapViewTemplate();
            this.$el = $(mapViewHTML);

            Radio('plotOnMap').subscribe([this.plot, this]);
			
            return this.$el;
        },
        onSummaryDisplayed: function() {
            var that = this;

            setTimeout(function() {
                that.addMap();
            }, 500);
        },
        remove: function() {
            Radio('plotOnMap').unsubscribe(this.plot);
            this.$el.remove();
        },
        addMap: function() {
            var mapOptions = {
                zoom: 4,
                center: new google.maps.LatLng(0,0)
            };

            this.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
            this.markers = [];
        },
        plot: function(data) {
            var that = this;
            that.clear();

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
                        map: that.map,
                        title: val.fid
                    });
                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.open(that.map, marker);
                    });

                    that.markers.push(marker);

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