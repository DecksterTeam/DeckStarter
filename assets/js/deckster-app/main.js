define(['deckster-app/deckster-app', ],
  function () { 
        'use strict'; 
		
	  return {
		  render: function(parent){
		  	angular.bootstrap(document, ['decksterApp']);
		  }
	  };
  });