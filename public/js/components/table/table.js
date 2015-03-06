define([
    'jquery',
    'text!components/table/table.hbs',
    'handlebars',
    'bootstrap'
], function ($, TableHBS, Handlebars) {

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
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var tableViewTemplate = Handlebars.compile(TableHBS);
            var tableViewHTML = tableViewTemplate({
                "id": this.id,
                "title": params.title,
                "description": params.description,
                "color": options.color || params.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(tableViewHTML);
            options.parent.append(this.$el);

            var that = this;

            $.each(params.data.headers, function(index, header) {
                $('#' + that.id + ' .table-header tr').append(
                    '<th>' + header.alias + '</th>'
                );
            });

            for(var index = 1; index <= 25; index++) {
                $('#' + that.id + ' .table-body').append(
                    '<tr>' +
                        '<td>' + index + '</td>' +
                        '<td>Item ' + index + '</td>' +
                        '<td>This is Item ' + index + '</td>' +
                    '</tr>'
                );
            };
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + that.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.fullWidth, that.fullHeight);
                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');
                    grid.resize_widget($resizeBtn.parent(), that.smallWidth, that.smallHeight);
                }
            });
        }
    };
});