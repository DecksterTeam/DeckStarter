define([
    'jquery',
    'text!components/info-block/info-block.hbs',
    'handlebars',
    'bootstrap'
], function ($, InfoBlockHBS, Handlebars) {

    'use strict';

    return {
        "id": "info-block",
        render: function(options) {
            $.extend(true, this, options);
            var infoBlockViewTemplate = Handlebars.compile(InfoBlockHBS);
            var infoBlockViewHTML = infoBlockViewTemplate({
                "info": 700,
                "description": "Data about Something"
            });
            this.$el = $(infoBlockViewHTML);
			
			return this.$el;
        }
    };
});