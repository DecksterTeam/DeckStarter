define([],function(){
    'use strict';
  function config($routeProvider) {
	  $routeProvider.when('/', {templateUrl: 'js/tile-app/views/deckster-container.html', controller: 'mainController'});
  }
  config.$inject=['$routeProvider'];

  return config;
});
