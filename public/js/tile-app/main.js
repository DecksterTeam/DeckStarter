define([
    'jquery',
    'text!tile-app/views/deckster-parent-container.hbs',
	'tile-app/deckster-app', 
	'handlebars'],
  function ($, ParentContainerHBS, app, Handlebars) { 
        'use strict'; 
		
	  return {
		  render: function(options){
              var serializedComponents = options.serializedComponents;
              this.options = options;
              var template = Handlebars.compile(ParentContainerHBS);
              var middleContainerViewHTML = template();
              this.$el = $(middleContainerViewHTML);
              options.parent.append(this.$el);  
			  
		  	angular.bootstrap(document, ['decksterApp']);
		  }
	  };
  });