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
                "title": options.title,
                "color": options.color,
                "col": this.smallCol,
                "row": this.smallRow,
                "sizex": this.smallWidth,
                "sizey": this.smallHeight
            });
            this.$el = $(tableViewHTML);
			
			if(options.parent)
            	options.parent.append(this.$el);

            this.smallView();
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
                    that.fullView();

                } else {
                    $resizeBtn.addClass('glyphicon-resize-full');
                    $resizeBtn.removeClass('glyphicon-resize-small');

                    grid.resize_widget_mod($resizeBtn.parent(), that.smallWidth, that.smallHeight, parseInt(that.storedCol));
                    that.smallView();
                }
            });
        },
        fullView: function() {
            this.data = DataManager.rawData.tableData;
            this.headers = DataManager.rawData.tableHeaders;

            var that = this;

            $('#' + that.id + ' .table-header tr').empty();
            $('#' + that.id + ' .table-body').empty();


            $.each(this.headers, function(index, header) {
                $('#' + that.id + ' .table-header tr').append(
                    '<th>' + header + '</th>'
                );
            });

            $('#' + that.id + ' .table-header tr').append(
                '<th>Name</th>'
            );

            $.each(this.data, function(index, val){
                $('#' + that.id + ' .table-body').append(
                    '<tr data-index="' + index + '">' +
                        '<td>' + val.id + '</td>' +
                        '<td>' + val.count + '</td>' +
                        '<td>Item ' + val.id + '</td>' +
                    '</tr>'
                );
            });

            $('#' + that.id + ' .table-body tr').on('click', function(event) {
                $('#' + that.id + ' tr.active').removeClass('active');
                $(this).addClass('active');
                Radio('plotOnMap').broadcast(that.data[$(this).data('index')]);
            });
        },
        smallView: function() {
            this.data = DataManager.rawData.tableData;
            this.headers = DataManager.rawData.tableHeaders;

            var that = this;

            $('#' + that.id + ' .table-header tr').empty();
            $('#' + that.id + ' .table-body').empty();

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
        remove: function() {
            $('#' + this.id + ' .table-body tr').remove();
            this.$el.remove();
        }
    };
});