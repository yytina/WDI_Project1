'use strict';

angular.module('ticketyApp')
.controller('GameBoardCtrl', function ($scope, $rootScope, $timeout,localStorageService) {
    
    var occupiedNumber_o=0;
    var occupiedNumber_x=0;

    $scope.numberOfWins = localStorageService.get("numberOfWins");

    $scope.cells=[];
    $scope.winner = ""
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

 $scope.makeNextMove = function(location){


if ($scope.currentTurn=="x") 
  { 
      
    $scope.changeSquareContent(location,"x");
    

    if (!$scope.existWinner()){
     
     
    $scope.currentTurn="o";
     
    }
    else
    { 
      alert("Winner is "+$scope.winner);
      
      $scope.is_restart=false;
      $scope.addNumberOfWins();
    }
   
    $timeout($scope.changeSquareContent($scope.opponentSelectRandomSquare(),"o"),3000);
    if (!$scope.existWinner()){
    $scope.currentTurn="x";
    }
    else
    { 
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
    if($scope.cells[i-1]!=""){
    draw++;
    }
  }
  if (draw===9){
    alert("Game Draw!");
  }

};


$scope.existWinner=function(){

	
  //checkDraw
  var exist = false;
  $scope.checkDraw();

  //check rows
  
  for (var j=1; j<=7;j+=3){
  	
    var result = $scope.checkRowExistWinner(j);
    
    if (result== "x") {
      $scope.winner = "x";
      exist = true;
    } else if (result == "o") {
      $scope.winner = "o";
      exist = true;
    } else {
      // having some empty cells
    };
  }
  //check colums
  for (var j=1; j<=3;j+=1){
    var result = $scope.checkColumnExistWinner(j);

    if (result== "x") {
      $scope.winner = "x";
      exist = true;
    } else if (result == "o") {
      $scope.winner = "o";
      exist = true;
    } else {
      // having some empty cells
    };
  }
  //check diagonals
  
  for (j=0;j<2;j++){
    var result = $scope.checkDiagonalExistWinner($scope.Diagonal[j]);

    if (result== "x") {
      $scope.winner = "x";
      exist = true;
     
    } else if (result == "o") {
      $scope.winner = "o";
      exist = true;
      
    } else {
      // having some empty cells
    };
  }
  return exist;
};

$scope.checkRowExistWinner=function(j) {


  occupiedNumber_o=0;
  occupiedNumber_x=0;
  
  for (var i=j; i<= j+3; i++){
    
    var square = $scope.cells[i-1];
    
    if (!$scope.currentSquareClickedAlready(i)){

      return "";
    }
    else if (square === "x") {
      occupiedNumber_x++;
    }
    else {
      occupiedNumber_o++;

    }

   if (occupiedNumber_x===3){
      return "x";
    } 
    else if (occupiedNumber_o===3){

      return "o";
    }     
  }
};

$scope.checkColumnExistWinner=function(j){
  occupiedNumber_o=0;
  occupiedNumber_x=0;

  for (var i=j; i<= j+6; i+=3){
    var square = $scope.cells[i-1];

    	
    if (!$scope.currentSquareClickedAlready(i)){
      return "";
    }
    else if (square === "x") {
      occupiedNumber_x++;
    }
    else {
      occupiedNumber_o++;

    }

   if (occupiedNumber_x===3){
      return "x";
    } 
    else if (occupiedNumber_o===3){
      return "o";
    }     
  }
};

$scope.checkDiagonalExistWinner=function(j) {
  //console.log($scope.cells[j[0]-1]+"/"+$scope.cells[j[1]-1]+"/"+$scope.cells[j[2]-1]);
   var x=$scope.cells[j[0]-1];
   var y=$scope.cells[j[1]-1];
   var z=$scope.cells[j[2]-1];

    if ((x=="")||(y=="")||(z=="")){
     return false;
    }
    else{ 
      if ((x===y)&&(y===z)){
             return x;
  }
    }


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




