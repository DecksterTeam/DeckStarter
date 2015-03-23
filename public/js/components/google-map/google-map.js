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
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var mapViewTemplate = Handlebars.compile(MapHBS);
            var mapViewHTML = mapViewTemplate({
                "id": this.id,
                "title": params.title,
                "info": params.data,
                "description": params.description,
                "color": options.color || params.color,
                "percent": params.data,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight,
                "mapURL": mapURL
            });
            this.$el = $(mapViewHTML);
            options.parent.append(this.$el);

            this.addMap();
            Radio('plotOnMap').subscribe([this.plot, this]);
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');

                    that.storedCol = that.$el.attr("data-col");

                    grid.resize_widget_mod($resizeBtn.parent(), that.fullWidth, that.fullHeight, 1);

                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');

                    // if(parseInt(that.storedCol) > Math.floor($('.gridster').width()/300)) {
                    //     grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, 1);
                    // } else {
                        grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, parseInt(that.storedCol));
                    // }
                }
            });
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