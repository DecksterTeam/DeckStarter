define(['deckster-app/deckster-config',
  		'deckster-app/controllers/mainController',
		'jquery',
		'gridster',
		'deckster'],
  function(config, mainController, $, gridster, deckster){
    var app = angular.module('decksterApp', ['ngRoute']);
    app.config(config);
    app.controller('mainController', mainController).factory('Deckster', function () {
	  return window.Deckster;
	}).directive('decksterDeck', function ($rootScope) {
	  var defaults = {
	    gridsterOpts: {
	      widget_margins: [10, 10],
	      widget_base_dimensions: ['auto', 250]
	    }
	  };

	  return {
	    restrict: 'A',
	    scope: {
	      deckOptions: '=',
	      deckCards: '='
	    },
	    controller: function($scope) {
	      this.initialized = false;

	      this.addCard = function (card, callback) {
	        $scope.deckster.addCard(card, callback);
	      };

	      this.init = function (element, opts) {
	        $scope.deckster = $(element).deckster(opts).data('deckster');
	        this.initialized = true;
	      };
	    },
	    link: function (scope, element, attrs, ctrl) {
	      var deckOptions = $.extend(true, {}, defaults, (scope.deckOptions || {}));
	      ctrl.init(element, deckOptions);
	    }
	  };
	})
	.directive('decksterCard', function ($parse) {
	  return {
	    restrict: 'E',
	    require: '^decksterDeck',
	    link: function (scope, element, attrs, deckCtrl) {

	      scope.deckInitialized = deckCtrl.initialized;

	      var cardOpts = $parse(attrs.cardOptions || {})(scope);

	      scope.$watch('deckInitialized', function(initialized) {
	        if(initialized) {
	          deckCtrl.addCard(cardOpts, function(card) {
	            scope.card = card;
	          });
	        }
	      });
	    }
	  }
	});
});