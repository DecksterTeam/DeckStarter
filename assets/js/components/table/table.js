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
        "smallHeight": 1,
        "fullWidth": 4,
        "fullHeight": 2,
        render: function(options) {
            var params = options.params;
            this.id = "table-" + options.id;
            this.smallCol = options.startCol;
            this.smallRow = options.startRow;
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

            $.each(params.data.values, function(index, value) {
                $('#' + that.id + ' .table-body').append(
                    '<tr>' +
                        '<td>' + value.id + '</td>' +
                        '<td>' + value.name + '</td>' +
                        '<td>' + value.info + '</td>' +
                    '</tr>'
                );
            });
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
        },
        updateWidth: function() {
            var that = this;
            var gridWidth = Math.floor($('.gridster').width()/300);
            var $widget = $(this.$el);
            $widget.attr("data-col",1).attr("data-row",1);

            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            if($resizeBtn.hasClass('glyphicon-resize-full')) {
                if($widget.attr("data-sizex") > gridWidth) {
                    $widget.attr("data-sizex", gridWidth);
                } else {
                    $widget.attr("data-sizex", that.smallWidth);
                }
            } else {
                $widget.attr("data-sizex", gridWidth);
            }
        }
    };
});