define([
    'jquery',
    'text!components/table/table.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, TableHBS, Handlebars, Radio) {

    'use strict';

    return {
        "smallCol": 1,
        "smallRow": 1,
        "smallWidth": 4,
        "smallHeight": 2,
        "fullWidth": 4,
        "fullHeight": 3,
        render: function(options) {
            var params = options.params;
            this.id = "table-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
            this.smallWidth = options.smallWidth;
            this.smallHeight = options.smallHeight;
			this.options = options;
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var tableViewTemplate = Handlebars.compile(TableHBS);
            var tableViewHTML = tableViewTemplate({
                "id": this.id,
                "color": options.color
            });
            this.$el = $(tableViewHTML);

            return this.$el;
        },
        onSummaryDisplayed: function() {
            var that = this;

            setTimeout(function() {

                that.data = DataManager.rawData.tableData;
                that.headers = DataManager.rawData.tableHeaders;

                $.each(that.headers, function(index, header) {
                    $('#' + that.id + ' .table-header tr').append(
                        '<th>' + header + '</th>'
                    );
                });

                $.each(that.data, function(index, val){
                    $('#' + that.id + ' .table-body').append(
                        '<tr data-index="' + index + '">' +
                            '<td>' + val.id + '</td>' +
                            '<td>' + val.count + '</td>' +
                        '</tr>'
                    );
                });

                $('#' + that.id + ' .table-body tr').on('click', function(event) {
                    $('#' + that.id + ' tr.active').removeClass('active');
                    $(this).addClass('active');
                    Radio('plotOnMap').broadcast(that.data[$(this).data('index')]);
                });

            }, 500);
        },
        remove: function() {
            $('#' + this.id + ' .table-body tr').remove();
            this.$el.remove();
        }
    };
});