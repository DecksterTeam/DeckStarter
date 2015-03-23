define([],function(){
    'use strict';
  function config($routeProvider) {
	  $routeProvider.when('/', {templateUrl: '/assets/js/deckster-app/deckster-container.hbs', controller: 'mainController'});
  }
  config.$inject=['$routeProvider'];

  return config;
});
