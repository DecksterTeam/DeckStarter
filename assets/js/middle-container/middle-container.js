define([
    'jquery',
    'text!middle-container/middle-container.hbs',
    'handlebars',
    'bootstrap'
], function ($, MiddleContainerHBS, Handlebars) {

    'use strict';

    return {
        render: function(parent) {
            var middleContainerViewTemplate = Handlebars.compile(MiddleContainerHBS);
            var middleContainerViewHTML = middleContainerViewTemplate();
            this.$el = $(middleContainerViewHTML);
            parent.append(this.$el);
        }
    };
});