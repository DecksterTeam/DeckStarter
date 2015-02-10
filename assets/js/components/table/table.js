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

            var that = this;

            $.each(params.data.headers, function(index, header) {
                $('#' + that.id + ' .table-header tr').append(
                    '<th>' + header.alias + '</th>'
                );
            });

            $.each(params.data.values, function(index, value) {
                $('#' + that.id + ' .table-body').append(
                    '<tr>' +
                        '<td>' + value.id + '</td>' +
                        '<td>' + value.name + '</td>' +
                        '<td>' + value.info + '</td>' +
                    '</tr>'
                );
            });
        }
    };
});