'use strict';

angular.module('ticketyApp')
  .controller('MatchPlayerCtrl', function ($scope, angularFire, $location) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.waitingRoom = {};
    var waitingRoomRef = new Firebase("https://jinwdi.firebaseio.com/waiting_room");
    $scope.promise = angularFire(waitingRoomRef, $scope, "waitingRoom");

    // //step1

    // $scope.promise.then (function(){
    // 	$scope.waitingRoom = {xJoined: true, gameBoardNumber: "abcd1234"};
    // });

    function generateGameBoardNumber(){
    	return Math.floor(Math.random()*16777215).toString(16);
    }

    // //step2

    // $scope.promise.then (function(){
    // 	$scope.createWaitingRoom();
    // });

    // $scope.createWaitingRoom = function(){
    // 	$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
    // 	$scope.noticeMessage = "You are x, waiting for opponent.";
    // };

    //step4

    $scope.promise.then (function(){
        console.log("promise received");
    	if ($scope.waitingRoom.xJoined == true) {
            console.log("about to join the room");
    		$scope.joinWaitingRoom();
            console.log("Joined the waitingRoom"+$scope.waitingRoom);
    	} else {
            console.log("about to create the room");
    		$scope.createWaitingRoom();
            console.log("created the waitingRoom"+$scope.waitingRoom);
    	}
    });

    $scope.createWaitingRoom = function(){
    	$scope.waitingRoom = {xJoined: true, gameBoardNumber: generateGameBoardNumber()};
    	$scope.noticeMessage = "You are x, waiting for opponent.";

    	waitingRoomRef.on('child_removed', function(snapshot){
    		//TODO should double check if the I am paired
    		//"http://localhost:9000/#/game_board/abcde1234/x"
            console.log("createWaitingRoom:"+$scope.waitingRoom.gameBoardNumber);
    		$location.path('game_board/' + $scope.waitingRoom.gameBoardNumber + '/x');

    	});
    }
    $scope.joinWaitingRoom = function(){
        var gameBoardNumber = $scope.waitingRoom.gameBoardNumber;
        console.log("joinWaitingRoom:"+$scope.waitingRoom.gameBoardNumber);

        $scope.waitingRoom = {};

        $location.path('game_board/' + gameBoardNumber + '/o');
    }

  });
