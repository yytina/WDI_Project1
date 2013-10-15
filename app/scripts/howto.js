

function changeSquareContent(location, className){

  document.getElementById('cell' + location).innerHTML = className;
  document.getElementById('cell' + location).classList.add(className);
  
}

function clearSquare(location) {
  document.getElementById('cell' + location).innerHTML = "&nbsp;";
  document.getElementById('cell' + location).classList.remove("o");
  document.getElementById('cell' + location).classList.remove("x");
}

function makeNextMove(location){

if (currentTurn=="x") 
  {
    changeSquareContent(location,"x");
    currentTurn="o";
  }
else
  {
    changeSquareContent(location,"o");
    currentTurn="x";
  }


}


function handleClick(location) {
  if (currentSquareClickedAlready(location)) 
  {
   console.log("The square is already occupied. Please select another one");
  }
  else
  {
  makeNextMove(location);
  }
}

//Homework 1
//returns true or false
function currentSquareClickedAlready(location) {
//TODO
//check if the square at location has been occupied
//your code here
var square = document.getElementById('cell' + location).innerHTML;
//console.log(square);
if ((square === "o")||(square ==="x")) {
  //console.log("The square you selected is already occupied. Please choose another.");
  return true;
  
 
}
else {
  return false;
}

}

//Homework 2
//return true or false
function isTopHorizontalThreeOccupiedByMe(){
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
}

function existWinner(){

  var occupiedNumber_x;
  var occupiedNumber_o;
  var square;

  
  //check rows
  for (j=1; j<=7;j+=3){
    var result = checkRowExistWinner(j);

    if (result== "x") {
      alert("X Wins");
    } else if (result == "o") {
      alert("O Wins");
    } else {
      // having some empty cells
    };
  }
  //check colums
  for (j=1; j<=3;j+=1){
    var result = checkColumnExistWinner(j);

    if (result== "x") {
      alert("X Wins");
    } else if (result == "o") {
      alert("O Wins");
    } else {
      // having some empty cells
    };
  }
  //check diagonals
  
  for (j=0;j<2;j++){
    var result = checkDiagonalExistWinner(Diagonal[j]);

    if (result== "x") {
      alert("X Wins");
    } else if (result == "o") {
      alert("O Wins");
    } else {
      // having some empty cells
    };
  }

}

function checkRowExistWinner(j) {
  occupiedNumber_o=0;
  occupiedNumber_x=0;

  for (var i=j; i<= j+3; i++){
    square = document.getElementById('cell' + i).innerHTML;
    if (!currentSquareClickedAlready(i)){
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
}

function checkColumnExistWinner(j){
  occupiedNumber_o=0;
  occupiedNumber_x=0;

  for (var i=j; i<= j+6; i+=3){
    square = document.getElementById('cell' + i).innerHTML;
    if (!currentSquareClickedAlready(i)){
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
}

function checkDiagonalExistWinner(j) {
  occupiedNumber_o=0;
  occupiedNumber_x=0;

  for (var i=0; i<3 ; i++){
    var location=j[i];
    square = document.getElementById('cell' + location).innerHTML;
    if (!currentSquareClickedAlready(location)){
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
}

// Lab 1
function clearBoard(){
  for (i=1;i<=9;i++){
  clearSquare(i);
  }
}

// Lab 2
function restartGame(){
  // setTimeout(function() { clearBoard(); },1000);
  currentTurn = "x";
  var answer = prompt("Do you want to play again? Yes or No");
  if (answer.toUpperCase()==="YES"){
    clearBoard();
  }
  else {
    alert("Game Over. Goodbye!");
  }
}

// Lab 3
function SelectRandomSquare(currentPlayer){
    var randomNumber=0; 
    do {
      randomNumber=Math.floor((Math.random()*9) + 1);

    }
    while (currentSquareClickedAlready(randomNumber))
    return randomNumber;
    //assign opponent symbol to random square
    //square that has not been occupied
    makeNextMove(randomNumber, currentPlayer);
}

// [].forEach(cells, function(cell) {
  // cell.innerHTML = ""
//}
//setTimeout()
})

var Diagonal=[[1,5,9],[3,5,7]];

var currentTurn="x";
handleClick(4);
handleClick(1);
handleClick(5);
handleClick(3);
handleClick(6);









