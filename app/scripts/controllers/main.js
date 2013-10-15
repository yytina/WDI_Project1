'use strict';

angular.module('ticketyApp')
  .controller('MainCtrl', function ($scope, $rootScope, localStorageService) {
    console.log("localStorageService");
    
    localStorageService.add("names",["Matt","peter","Someone Else"]);
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.name = "Tickety";
    $rootScope.is_how_to_page=false; 
    $rootScope.is_play_now_page = false;
    $scope.click = function(){
    	alert("I've been clicked!");

    };
  });
