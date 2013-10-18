'use strict';

angular.module('ticketyApp')
	.controller('HowToCtrl', function($scope, $rootScope){
		$rootScope.currentPage="main";
// Multiplayer tic tac toe
// - wait for opponent to join
// - join a game if a open game board exist
// - start a game
// - player and opponent take turns to select cell
// - win, loss and draw checking
// - restart
        $scope.wait = "You wait for an opponent if there isn't already a waiting person.";
        $scope.join = "If there is another person waiting, you join him or her to play the game.";
    	$scope.win = "Make three of a kind in a row, a column or a diagonal.";
        $scope.lose = "If your opponent satisfies the winning condition first, you lose.";
        $scope.draw = "If all the positions are occupied and there is no winner";
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

	
