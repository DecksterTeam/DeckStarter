define([
    'jquery',
    'text!components/search-bar/search-bar.hbs',
    'handlebars',
    'radio',
    'cytoscape'
], function ($, HBS, Handlebars, Radio) {

    'use strict';

    return {
        "id": "search-bar",
        "expandable": false,
        render: function(options) {
            $.extend(true, this, options);
            var template = Handlebars.compile(HBS);
            var html = template({
                "id": this.id
            });
            this.$el = $(html);
        },
        getSummaryContentHtml: function() {
            return this.$el.html();
        },
        onSummaryLoad: function() {
            $('#search-bar input').keypress(function(e) {
                if (e.which == '13') {
                    var text = $('#search-bar input').val();
                    Radio('searchSelector').broadcast(text);
                }
            });
        	$('#search-bar button').on('click', function(){
                var text = $('#search-bar input').val();
                Radio('searchSelector').broadcast(text);
            });
        },
        remove: function() {
            this.$el.remove();
        }
    };

});