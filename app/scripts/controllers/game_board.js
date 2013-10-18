'use strict';
// Multiplayer tic tac toe
// - wait for opponent to join
// - join a game if a open game board exist
// - start a game
// - player and opponent take turns to select cell
// - win, loss and draw checking
// - restart
// Game board js
// - link to firebase room/room number
// - link the $scope.cells to angularfire
// - decide if I am the first one to move
//   - if yes
//     - allow player to click and move
//     - check winning or draw
//     - wait for event for next move
//     - checking losing or draw
//     - ...
//   - if no
//     - wait for event for next move
//     - checking losing or draw
//     - allow player to click and move
//     - check wining or draw
//     - wait again
//     - ...
angular.module('ticketyApp')
.controller('GameBoardCtrl', function ($scope, $rootScope, $timeout,localStorageService, angularFire,$routeParams) {

    
    var gameBoardRef = new Firebase("https://jinwdi.firebaseio.com/game_board");
    
    $scope.gameBoard=[];
    $scope.promise = angularFire(gameBoardRef, $scope, "gameBoard");

    $scope.gameId = $routeParams.id;
    $scope.symbol = $routeParams.mySymbol;
    $scope.turnMsg="test";
    $scope.clickMove="";
    $scope.test = 0;
    $scope.turn=false;

    // $scope.promise.then (function(){
    //   console.log("In Game Board");
    //   console.log("$scope.gameBoard");
    //   console.log("$scope.symbol");
    // })

    $scope.promise.then (function(){
      $scope.gameBoard=[] ;
      console.log("game begin");
      if ($scope.gameBoard.length == 0 && $scope.symbol == 'x') {
        console.log("turnMsg First");
        $scope.turnMsg="I am first move: Symbol: "+ $scope.symbol;
        $scope.turn = true;   
      } else {
        $scope.turnMsg="I am Second Move: Symbol: " + $scope.symbol;
        $scope.turn = false;

      }
    });
    
   gameBoardRef.on('value', function(snapshot) {

      console.log("wait received");
      if (!$scope.myTurn) {
        if (snapshot.val() != null) {
          if (!arrays_equal(snapshot.val(), $scope.gameBoard)) {
            console.log("diff gameboard");
             console.log("checking isLosing");

            if ($scope.isLosing(snapshot.val())) {
              alert("You Lost");
              console.log("Lost");
              $scope.is_restart=false;
              // print losing
              // redirect to match player if play again
            } else if ($scope.isDraw()) {
              alert("Draw");
              // print draw
              // redirect to match player if play again
            } else {
              $scope.cells = snapshot.val();
              $scope.turn = true;
            }
          } else {
            console.log("same gameboard"); 
          }
        } else {
          console.log("snapshot is empty");
        }
      } else {
        console.log("it is my turn but I receive ");
      }
    });


   //  $scope.myMove = function(){
   //    console.log("I make my move");
   //    $scope.turn = true;
      
   //    if ($scope.isWinning()) {
   //      alert("Winning");
   //      $scope.is_restart=false;
   //    } else if ($scope.isDraw()){
   //      alert("Draw");
   //      $scope.is_restart=false;
   //    } else {


   //      //game_boardRef.on('value', function(snapshot){
   //      //TODO should double check if the I am paired
   //      //"http://localhost:9000/#/game_board/abcde1234/x"
   //       //console.log("made my move");
   //      //$location.path('game_board/' + $scope.waitingRoom.gameBoardNumber + '/x');

   //    //});
  
   //      //$scope.opponentMove(); infinite loop
        
   //    }

   //  }



    $scope.makeMove = function(location){
      $scope.gameBoard[location-1]=$scope.symbol;
      $scope.changeSquareContent(location,$scope.symbol);
  
   };

    $scope.myClick = function(eventObj) {
      var i = parseInt(eventObj.srcElement.attributes.index.value);
      var rock= eventObj.srcElement.attributes.data.value;
      console.log("symbol:"+$scope.symbol);
      console.log("Winner:"+$scope.winner);
      if ($scope.turn) {
        if ($scope.currentSquareClickedAlready(i+1)) {
          alert("The square is already occupied. Please select another one");
        } else {
          $scope.makeMove(i+1);
          if ($scope.isWinning()) {
            alert("You Won");
            $scope.is_restart=false;
          // print winning
          // redirect to match player if play again
        } else if ($scope.isDraw()) {
          alert("Draw");
          // print draw
          // redirect to match player if play again
          $scope.is_restart=false;
        } else {
          $scope.turn = false;
        }
        }
      }
    };

    $scope.isLosing = function(gameBoardData) {
      console.log("inLosing gameBoardData"+ gameBoardData);
      console.log("inLosing existWinner:"+$scope.existWinner(gameBoardData));
      if ( $scope.existWinner(gameBoardData) && ($scope.winner != $scope.symbol)) {
        return true;
      }
      return false; 
      
    };
    
    $scope.isWinning = function() {
      if ($scope.existWinner($scope.gameBoard)&&($scope.winner==$scope.symbol)){
        return true;
      }
      return false; 

    }
    
    $scope.isDraw = function() {
      return $scope.checkDraw(); 
    }    
 function arrays_equal(a,b) { return !(a<b || b<a); }
  
//     $scope.handleClick = function(eventObj) {
//     var i= parseInt(eventObj.srcElement.attributes.index.value);
//     $scope.gameRoom = {symbol:i};
//     var rock= eventObj.srcElement.attributes.data.value;
//   if ($scope.currentSquareClickedAlready(i+1)) 
//   {
//    alert("The square is already occupied. Please select another one");
//   }
//   else
//   {
  
//   $scope.makeNextMove(i+1);
//   }
// };

    /*test firebase/

    var ref = new Firebase("https://jinwdi.firebaseio.com/");
    var p = angularFire(ref, $scope, "leaderData");
    

    //$scope.leaderData = {'name': 'Matt'};
   // $scope.leaderData = {"emily": "emily"};
    //$scope.leaderBoard.name["matt"]=3;                  =


    // "name":[
    // "emily":1
    // "robyn"]
    //$scope.leaderData = {};
    $scope.leaderData = {name: 
      {
          SeededValue:1
      }
    };

    p.then(function(){
      console.log("Data Loaded!")
    });

    // p.then(function(){
    //     console.log("data: ") + $scope.leaderData.name);
    // })
    $scope.getName = function(){
      $scope.userName = prompt("What's your name?");
      console.log($scope.userName);
    }



    $scope.addWinToLeaderBoard = function(){
      if ($scope.userName){
        if ($scope.leaderData.name.hasOwnProperty($scope.userName)){
          $scope.leaderData.name[$scope.userName]++;
        } else {
          $scope.leaderData.name[$scope.userName]=1;
        }
      }
    };
*/
    var occupiedNumber_o=0;
    var occupiedNumber_x=0;

    $scope.numberOfWins = localStorageService.get("numberOfWins");

    $scope.cells=[];
    $scope.winner ="";
    $scope.name = "Tickety";
    $rootScope.is_play_now_page=true;
    $rootScope.is_how_to_page=false;
    $scope.is_restart = true;
    $scope.Diagonal=[[1,5,9],[3,5,7]];
    $scope.currentTurn="x";
    occupiedNumber_x;
    occupiedNumber_o;
    $scope.square;
    $scope.timeInMs = 0;
    $scope.stop;

    $scope.timeInMs = 0;
    $scope.seconds="00";
    $scope.minutes="00";
    $scope.currentSeconds=0;
    $scope.numberOfWins=function(){
      $scope.numberOfWins=parseInt($scope.numberOfWins)+1;
      localStorageService.add("numberOfWins",$scope.numberOfWins);
    };

    $scope.hover = function(e) {
    angular.element(e.srcElement).addClass('gray')
};
    

    $scope.countUp = function() {
        $scope.currentSeconds++;
        $scope.minutes=$scope.formatZeroPadding(Math.floor($scope.currentSeconds/60));
        $scope.seconds=$scope.formatZeroPadding($scope.currentSeconds%60);
        //$scope.minutes_format=$scope.format($scope.minutes);
        //$scope.seconds_format=$scope.format($scope.seconds);
        $scope.stop=$timeout($scope.countUp, 1000);
    };
    $scope.formatZeroPadding = function(integer) {
      if (integer < 10) {
        return "0" + integer;
      } else {
        return integer;
      }
    };


    $scope.starter = function() {
      console.log("start");
      $scope.seconds=0;
      $scope.minutes=0;
      $timeout($scope.countUp, 1000);   

    };

    $scope.stopper=function(){
      $timeout.cancel($scope.stop);
    };
//});

    $scope.changeSquareContent = function (location, className){

  //document.getElementById('cell' + location).innerHTML = className;
  $scope.cells[location-1]=className;

  //document.getElementById('cell' + location).classList.add(className);
 
};

  $scope.clearSquare= function(location) {
  //document.getElementById('cell' + location).innerHTML = "&nbsp;";
  //document.getElementById('cell' + location).classList.remove("o");
  //document.getElementById('cell' + location).classList.remove("x");
  $scope.cells[location-1]="";

};

$scope.delayOpponentMove = function() {
  $scope.changeSquareContent($scope.opponentSelectRandomSquare(), "o");
}

 $scope.makeNextMove = function(location){


if ($scope.currentTurn=="x") 
  { 
      
    $scope.changeSquareContent(location,"x");
    

    if (!$scope.existWinner($scope.gameBoard)){
     
     
    $scope.currentTurn="o";
     
    }
    else
    { 
      alert("Winner is "+$scope.winner);
      
      $scope.is_restart=false;
      $scope.addNumberOfWins();
    }
   
    $timeout($scope.delayOpponentMove, 1000);

    if (!$scope.existWinner($scope.gameBoard)) {
      $scope.currentTurn="x";
    } else { 
      alert("Winner is "+$scope.winner);
      
      $scope.is_restart=false;
      $scope.addNumberOfWins();
    }
  }
else
  {
    
    // $scope.changeSquareContent(location,"o");
    // if (!$scope.existWinner()){
    // $scope.currentTurn="x";
    // }
    // else
    // { 
    //   alert("Winner is "+$scope.winner);
      
    //   $scope.is_restart=false;
    //   $scope.addNumberOfWins();
    // }
  }
 

};


  $scope.handleClick = function(eventObj) {
    var i= parseInt(eventObj.srcElement.attributes.index.value);
    var rock= eventObj.srcElement.attributes.data.value;
  if ($scope.currentSquareClickedAlready(i+1)) 
  {
   alert("The square is already occupied. Please select another one");
  }
  else
  {
  
  $scope.makeNextMove(i+1);


  }
};

//Homework 1
//returns true or false
  $scope.currentSquareClickedAlready=function(location) {
//TODO
//check if the square at location has been occupied
//your code here

//var square = document.getElementById('cell' + location).innerHTML;
//console.log(square);
if (($scope.cells[location-1] === "o")||($scope.cells[location-1] ==="x")) {
  //console.log("The square you selected is already occupied. Please choose another.");

  return true;
  
}
else {
  return false;
}

};

//Homework 2
//return true or false
  $scope.isTopHorizontalThreeOccupiedByMe=function(){
  //TODO
  //check if the top three square is occupied by X
  //
  // ... your code here
  var occupiedNumber = 0;
  
  
  for (i=1; i<=3;i++){
    var square = document.getElementById('cell' + i).innerHTML;
    if (square !="x") {
      return false;
    }
    else {
      occupiedNumber++;

    }
  }
  return true;
};
$scope.checkDraw=function(){
  var draw=0;
  for (var i=1; i<=9;i++){
    if(($scope.cells[i-1]=="x")||($scope.cells[i-1]=="o")){
    draw++;
    }
  }
  if (draw===9){
    return true;
  }
  return false;
};


$scope.existWinner=function(BoardData){
  if (!BoardData){
    return false;
  }

  var winningCondition = [[0,1,2],[3,4,5],[6,7,8], //row condition
                          [0,3,6],[1,4,7],[2,5,8], //column condition
                          [0,4,8],[2,4,6]];
console.log("in existWinner BoardData:"+BoardData);
  for (i=0;i<winningCondition.length;i++){

    if (($scope.three_equal(BoardData[ winningCondition[i][0]],
                    BoardData[ winningCondition[i][1]],
                    BoardData[ winningCondition[i][2]]))
      &&BoardData[ winningCondition[i][0]]){
      console.log("winningCondition:"+winningCondition[i][0]
        +winningCondition[i][1]+winningCondition[i][2]);
    console.log(BoardData[ winningCondition[i][1]]);
      $scope.winner = BoardData[ winningCondition[i][0]];
      return true;
    }
  }
  return false;
};

$scope.three_equal = function (a,b,c){
 return ((a==b)&&(b==c));
};
  

// Lab 1
$scope.clearBoard=function(){
  for (i=1;i<=9;i++){
    $scope.cells[i-1]=""
    console.log( $scope.cells[i-1]);
  }
};

// Lab 2
$scope.restartGame=function(eventObj){
  //var answer = prompt("Do you want to play again? Yes or No");
  //if (answer.toUpperCase()==="YES"){
    $scope.is_restart=true;
    $scope.clearBoard();
    

  //}
  //else {
    //alert("Game Over. Goodbye!");
  //}
};

// Lab 3
$scope.opponentSelectRandomSquare=function(){
    var randomNumber=0; 
    do {
      randomNumber=Math.floor((Math.random()*9) + 1);

    }
    while ($scope.currentSquareClickedAlready(randomNumber))
    return randomNumber;
    //assign opponent symbol to random square
    //square that has not been occupied
};

for (var i=0;i<9;i++){
  $scope.cells[i]="";
}
  });




