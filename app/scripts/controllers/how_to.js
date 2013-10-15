'use strict';

angular.module('ticketyApp')
	.controller('HowToCtrl', function($scope, $rootScope){
		$rootScope.currentPage="main";

		$scope.how = "Make three of a kind in a row, a column or a diagonal to win!";
		$rootScope.is_how_to_page = true;
		$rootScope.is_play_now_page = false;
        
   // $scope.hover = function(e) {
    //	e.srcElement.attributes.class.value="testClass";
    	//alert(e.srcElement.attributes.class.value);
    //angular.element(e.srcElement).addClass('gray');
    //alert( angular.element(e.srcElement).class);
    //};

    //$scope.leave = function(e) {
    	//e.srcElement.attributes.class.value-=" testClass";
    //	alert("dropping black background"+e.srcElement.attributes.class.value);
    //angular.element(e.srcElement).addClass('gray');
    //alert( angular.element(e.srcElement).class);
    //};

	});

	
