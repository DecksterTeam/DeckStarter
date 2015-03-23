define(['deckster-app/deckster-config',
  		'deckster-app/controllers/mainController',
		'jquery',
		'gridster',
		'deckster'],
  function(config, mainController){
    var app = angular.module('decksterApp', ['ngRoute']);
    app.config(config);
    app.controller('mainController', mainController)
	.directive('decksterDeck', function($parse) {
	  var defaults = { 
	    gridsterOpts: {
	      max_cols: 5,
	      widget_margins: [10, 10],
	      widget_base_dimensions: ['auto', 250],
	      responsive_breakpoint: 850
	    }
	  };

	  return {
	    restrict: 'E',
	    replace: true,
	    template: '<div class="deck gridster"></div>', 
	    link: function(scope, element, attrs) {

	      var deckOptions = $.extend(true, {}, defaults, $parse(attrs.deckOptions || {})(scope));
	       scope.deckster = $(element).deckster(deckOptions).data('deckster');

	      attrs.$observe('deckCards', function(value) {
	        var cards = $parse(value || [])(scope);
	        scope.deckster.addCards(cards);
	      });
	    }
	  };
	});
});