define([
    'jquery',
    'text!components/map/map.hbs',
    'handlebars',
    'bootstrap'
], function ($, MapHBS, Handlebars) {

    'use strict';

    return {
        "smallCol": 1,
        "smallRow": 1,
    	"smallWidth": 2,
        "smallHeight": 2,
        "fullWidth": 2,
        "fullHeight": 2,
        render: function(options) {
            var params = options.params;
            this.id = "map-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
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
                "sizey": this.smallHeight
            });
            this.$el = $(mapViewHTML);
            options.parent.append(this.$el);

            window.addEventListener("message", receiveMessage, false);

            $('.navbar-brand').on('click', function() {

                // sendMessage("map.overlay.create",

                //     {
                //     "name": "Test Name 1",
                //     "overlayId": "testOverlayId1",
                //     "coords": {
                //         "minLat": "7.602108",
                //         "minLon": "-13.908691",
                //         "maxLat": "11.587669",
                //         "maxLon": "-8.283691"
                //     },
                //     "symbolizers": {
                //         "lowSymbolizer": {
                //             "externalGraphic": "/cmapi/payloads/images/customCluster.png",
                //             "fontColor": "rgb(130, 37, 251)",
                //             "fontOpacity": 1,
                //             "fontSize": "12",
                //             "fontWeight": "bold",
                //             "graphicHeight": 36,
                //             "graphicOpacity": 1,
                //             "graphicWidth": 36,
                //             "label": "${count}",
                //             "labelOutlineWidth": 3,
                //             "labelYOffset": 5,
                //             "pointRadius": 10
                //         },
                //         "midSymbolizer": {
                //             "externalGraphic": "/cmapi/payloads/images/customCluster.png",
                //             "fontColor": "rgb(130, 37, 251)",
                //             "fontOpacity": 1,
                //             "fontSize": "13",
                //             "fontWeight": "bold",
                //             "graphicHeight": 48,
                //             "graphicOpacity": 1,
                //             "graphicWidth": 48,
                //             "label": "${count}",
                //             "labelOutlineWidth": 3,
                //             "labelYOffset": 0,
                //             "pointRadius": 15
                //         },
                //         "highSymbolizer": {
                //             "externalGraphic": "/cmapi/payloads/images/customCluster.png",
                //             "fontColor": "rgb(130, 37, 251)",
                //             "fontOpacity": 1,
                //             "fontSize": "14",
                //             "fontWeight": "bold",
                //             "graphicHeight": 60,
                //             "graphicOpacity": 1,
                //             "graphicWidth": 60,
                //             "label": "${count}",
                //             "labelOutlineWidth": 3,
                //             "labelYOffset": -7,
                //             "pointRadius": 20
                //         },
                //         "noClusterSymbolizer": {
                //             "externalGraphic": "${icon}",
                //             "graphicOpacity": 1,
                //             "pointRadius": 15,
                //             "graphicHeight": "${height}",
                //             "graphicWidth": "${width}"
                //         }
                //     }
                // }

                // );


                sendMessage("map.feature.plot", 
                
                    {
                        "overlayId":"testOverlayId1",
                        "name":"Test Name 1",
                        "format":"geojson",
                        "feature": {
                            "type":"FeatureCollection",
                            "features":[
                                {
                                    "type": "Feature",
                                    "geometry": {
                                        "type": "Point",
                                        "coordinates": [0.0, 10.0]
                                    },
                                    "properties": {
                                        "featureId": "f1"
                                    }
                                }
                            ]
                        },
                        "zoom":false,
                        "dataZoom": false,
                        "readOnly":false
                    }

                );
            });
        }
    };

    function sendMessage(channel, message) {
        var toSend = {
            channel: channel,
            message: message
        };
        document.getElementById('embed-map').contentWindow.postMessage(toSend, 
            "https://meridianjs.com:3000/modes/basic/");
    }

    function receiveMessage(event) {
        console.debug(event);
    }

});