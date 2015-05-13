define([
    'jquery',
    'text!components/link-chart-table/table.hbs',
    'handlebars',
    'radio',
    'bootstrap'
], function ($, HBS, Handlebars, Radio) {

    'use strict';

    var tableData, 
        tableHeaders;

    return {
        "id": "link-chart-table",
        render: function(options) {
            $.extend(true, this, options);
            var tableViewTemplate = Handlebars.compile(HBS);
            var tableViewHTML = tableViewTemplate({
                "id": this.id,
                "color": this.color
            });
            this.$el = $(tableViewHTML);

            Radio('nodeSelected').subscribe(nodeSelected);
            Radio('searchSelector').subscribe(noData);

            return this.$el;
        },
        getSummaryContentHtml: function() {
            return this.$el.html();
        },
        onSummaryLoad: function() {
            $('#link-chart-table .deckster-card-title h2').html('No Selector');
        },
        remove: function() {
            Radio('nodeSelected').unsubscribe(nodeSelected);
            Radio('searchSelector').unsubscribe(noData);
            $('#link-chart-table .table-body tr').remove();
            this.$el.remove();
        }
    };

    function nodeSelected(data) {
        if(data) {
            $('#link-chart-table .table-body').html('');
            $('#link-chart-table .deckster-card-title h2').html(data.id);
            $('#link-chart-table .no-data-label').css('display', 'none');
            $.each(data, function(key, val){
                $('#link-chart-table .table-body').append(
                    '<tr>' +
                        '<td>' + key + '</td>' +
                        '<td>' + val + '</td>' +
                    '</tr>'
                );
            });
        } else {
            noData();
        }
    }

    function noData() {
        $('#link-chart-table .table-body').html('');
        $('#link-chart-table .deckster-card-title h2').html('No Selector');
        $('#link-chart-table .no-data-label').css('display', 'block');
    }
});