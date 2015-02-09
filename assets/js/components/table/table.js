define([
    'jquery',
    'text!components/table/table.hbs',
    'handlebars',
    'bootstrap'
], function ($, TableHBS, Handlebars) {

    'use strict';

    return {
        render: function(options) {
            var params = options.params;
            this.id = "table-" + params.id;
            var tableViewTemplate = Handlebars.compile(TableHBS);
            var tableViewHTML = tableViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": params.color
            });
            this.$el = $(tableViewHTML);
            options.parent.append(this.$el);          
        }
    };
});