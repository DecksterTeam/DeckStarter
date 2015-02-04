define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, Handlebars) {

    'use strict';

    return {
        render: function() {
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            
            return this;
        }
    };
});