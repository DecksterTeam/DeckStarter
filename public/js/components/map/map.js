define([
    'jquery',
    'text!components/map/map.hbs',
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
            var mapURL = 'https://meridianjs.com:3000/modes/embedded/';
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
			
			if(options.parent)
            	options.parent.append(this.$el);

            window.addEventListener("message", receiveMessage, false);
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
            window.removeEventListener("message", receiveMessage, false);
            Radio('plotOnMap').unsubscribe(plotOnMap);
            this.$el.remove();
        },
        fullView: function() {
        
        },
        smallView: function() {

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
            $('#map-1 .loading-label').css('display', 'none');

            Radio('plotOnMap').subscribe(plotOnMap);
        }
    }

    function plotOnMap(data) {
        console.log(data);
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
            "dataZoom": false,
            "readOnly":false
        });
    }

    function generateRandomData(x, y) {
        return Math.floor(Math.random() * ((y-x)+1) + x);
    }
});