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
            this.fullWidth = options.fullWidth;
            this.fullHeight = options.fullHeight;
            var tableViewTemplate = Handlebars.compile(TableHBS);
            var tableViewHTML = tableViewTemplate({
                "id": this.id,
                "title": options.title,
                "color": options.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(tableViewHTML);
            options.parent.append(this.$el);

            this.data = DataManager.rawData.tableData;
            this.headers = DataManager.rawData.tableHeaders;

            var that = this;

            $.each(this.headers, function(index, header) {
                $('#' + that.id + ' .table-header tr').append(
                    '<th>' + header + '</th>'
                );
            });

            $.each(this.data, function(index, val){
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
        },
        postRender: function(grid) {
            this.grid = grid;
            var that = this;
            var $resizeBtn = $('#' + this.id + ' .resize-btn');
            $resizeBtn.on('click', function() {
                if($resizeBtn.hasClass('glyphicon-resize-full')) {
                    $resizeBtn.removeClass('glyphicon-resize-full');
                    $resizeBtn.addClass('glyphicon-resize-small');

                    that.storedCol = that.$el.attr("data-col");

                    grid.resize_widget_mod($resizeBtn.parent(), that.fullWidth, that.fullHeight, 1);

                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');

                    // if(parseInt(that.storedCol) > Math.floor($('.gridster').width()/300)) {
                    //     grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, 1);
                    // } else {
                        grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, parseInt(that.storedCol));
                    // }
                }
            });
        },
        remove: function() {
            $('#' + this.id + ' .table-body tr').remove();
            this.$el.remove();
        }
    };
});