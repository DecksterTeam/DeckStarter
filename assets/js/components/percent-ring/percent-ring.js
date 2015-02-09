define([
    'jquery',
    'text!components/percent-ring/percent-ring.hbs',
    'handlebars',
    'bootstrap'
], function ($, PercentRingHBS, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var params = options.params;
            this.id = "percent-ring-" + params.id;
            var percentRingViewTemplate = Handlebars.compile(PercentRingHBS);
            var barChartViewHTML = percentRingViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": params.color,
                "percent": params.data
            });
            this.$el = $(barChartViewHTML);
            options.parent.append(this.$el);

            this.fillRing();            
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