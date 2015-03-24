define([], function(){
	function mainController($scope, $http, $compile){
	  $scope.mainDeckOptions = {
	    rootUrl: '#/',
	    gridsterOpts: {
	      max_cols: 4,
	      widget_margins: [10, 10],
	      widget_base_dimensions: ['auto', 250],
	      responsive_breakpoint: 850
	    }
	  };

	  var getSummaryTemplate = function(cardConfig, cb) {
	    $http.get('js/tile-app/partials/' + cardConfig.options.id + 'Summary.html').success(function(html) {
	      cb && cb($compile(html)($scope));
	    });
	  };

	  var getDetailsTemplate = function(cardConfig, cb) {
	    $http.get('js/tile-app/partials/' + cardConfig.options.id + 'Details.html').success(function(html) {
	      cb && cb($compile(html)($scope));
	    });

	  };

	  // Define a static array of card configurations or load them from a server (ex: user defined cards)
	  $scope.cards = [
	    {
	      title: 'Bar Chart',
	      id: 'bar-chart',
	      class: 'blue',
	      summaryContentHtml: getSummaryTemplate,
	      detailsContentHtml: getDetailsTemplate,
	      position: {
	        size_x: 1,
	        size_y: 1,
	        col: 1,
	        row: 1
	      }
	    },
	    {
	      title: 'Pie Chart',
	      id: 'pie-chart',
	      class: 'red',
	      summaryContentHtml: getSummaryTemplate,
	      detailsContentHtml: getDetailsTemplate,
	      position: {
	        size_x: 1,
	        size_y: 2,
	        col: 4,
	        row: 1
	      }
	    },
	    {
	      title: 'Geospatial',
	      id: 'mapCard',
	      class: 'purple',
	      summaryContentHtml: getSummaryTemplate,
	      detailsContentHtml: getDetailsTemplate,
	      position: {
	        size_x: 2,
	        size_y: 2,
	        col: 2,
	        row: 1
	      }
	    },
	    {
	      title: 'Table Data',
	      id: 'table',
	      class: 'orange',
	      summaryContentHtml: getSummaryTemplate,
	      detailsContentHtml: getDetailsTemplate,
	      position: {
	        size_x: 1,
	        size_y: 2,
	        col: 1,
	        row: 2
	      }
	    },
	    {
	      title: 'Timeline',
	      id: 'timelineCard',
	      summaryContentHtml: getSummaryTemplate,
	      detailsContentHtml: getDetailsTemplate,
	      position: {
	        size_x: 3,
	        size_y: 1,
	        col: 2,
	        row: 3
	      }
	    }
	  ];
	}
	
	mainController.$inject=['$scope', '$http', '$compile'];
	return mainController;
});