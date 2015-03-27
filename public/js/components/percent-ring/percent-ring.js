define([
    'jquery',
    'text!components/percent-ring/percent-ring.hbs',
    'handlebars',
    'bootstrap'
], function ($, PercentRingHBS, Handlebars) {

    'use strict';

    return {
        "smallCol": 1,
        "smallRow": 1,
    	"smallWidth": 1,
        "smallHeight": 1,
        "fullWidth": 2,
        "fullHeight": 2,
        render: function(options) {
            var params = options.params;
            this.id = "percent-ring-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            this.smallWidth = options.smallWidth;
            this.smallHeight = options.smallHeight;
			this.options = options;
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var percentRingViewTemplate = Handlebars.compile(PercentRingHBS);
            var barChartViewHTML = percentRingViewTemplate({
                "id": this.id,
                "description": params.description,
                "color": options.color || params.color,
                "percent": params.data                
            });
            this.$el = $(barChartViewHTML);

            return this.$el;
        },
        onSummaryDisplayed: function() {
            var that = this;

            setTimeout(function() {
                that.fillRing();
            }, 500);
        },
        fillRing: function() {
            var dark = $('#' + this.id + ' .dark')[0],
	            t = 5,
	            percentage = parseInt($('#' + this.id + ' .perc')[0].innerHTML.slice(0, -1), 10),
	            theta = 0,
	            maxTheta = (180 * percentage) / 50,
	            radius = $('#' + this.id + ' svg')[0].getBBox().width / 2;
            dark.setAttribute('transform', 'translate(' + radius + ',' + radius + ')');

            var animate = setInterval(function() {
	            theta += 2;
	            var d = 'M0,0 v' + -radius + 'A' + radius + ' ' + radius + ' 1 ' + ((theta > 180) ? 1 : 0) + ' 1 ' + Math.sin(theta * Math.PI / 180) * radius + ' ' + Math.cos(theta * Math.PI / 180) * -radius + 'z';
	            dark.setAttribute('d', d);
	            if (theta > maxTheta) {
	              clearInterval(animate);
	            }
            }, t);
        }
    };
});