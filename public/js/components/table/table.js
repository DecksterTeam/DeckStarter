define([
    'jquery',
    'text!components/table/table.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, TableHBS, Handlebars, Radio) {

    'use strict';

    var tableData, 
        tableHeaders;

    return {
        "id": "table-tile",
        render: function(options) {
            $.extend(true, this, options);
            var tableViewTemplate = Handlebars.compile(TableHBS);
            var tableViewHTML = tableViewTemplate({
                "id": this.id,
                "color": this.color
            });
            this.$el = $(tableViewHTML);

            return this.$el;
        },
        onSummaryLoad: function() {
            tableData = DataManager.rawData.tableData;
            tableHeaders = DataManager.rawData.tableHeaders;

            $.each(tableHeaders, function(index, header) {
                $('#table-tile .table-header tr').append(
                    '<th>' + header + '</th>'
                );
            });

            $.each(tableData, function(index, val){
                $('#table-tile .table-body').append(
                    '<tr data-index="' + index + '">' +
                        '<td>' + val.id + '</td>' +
                        '<td>' + val.count + '</td>' +
                    '</tr>'
                );
            });

            $('#table-tile .table-body tr').on('click', function(event) {
                $('#table-tile tr.active').removeClass('active');
                $(this).addClass('active');
                Radio('plotOnMap').broadcast(tableData[$(this).data('index')]);
            });
        },
        remove: function() {
            $('#table-tile .table-body tr').remove();
            this.$el.remove();
        }
    };
});