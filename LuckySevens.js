/*
  This is the logic behind lucky sevens. I overengineered the program relative to the course.

*/

function playButtonClicked() {
  //Capture input text
  var startingBet = document.getElementById("startingBet").value;

  //check if this is a number
  if (checkIfNumber(startingBet)) {
    //start game
    playGame(startingBet);
  } else {
    //inform user that their entry is invalid
    alert("Please enter a number x or x.xx");
  }
}

//Main Game Function
//Takes input from starting bet after its been validated
function playGame(bettingPool) {
  //initialize game variables
  var minimumBet = 1.0;
  var prize = 4.0;
  var diceAmount = 2;
  var diceSides = 6;
  var winningValue = 7;
  var startingAmount = bettingPool;
  var highestAmountWon = 0;
  var rollCountForHighestAmount = 0;
  var rollCount = 0;

  //check if minimum betting threshold is exceeded
  if (bettingPool >= minimumBet) {
    //begin game loop
    while (bettingPool >= minimumBet) {
      if (highestAmountWon < bettingPool) {
        highestAmountWon = bettingPool;
        rollCountForHighestAmount = rollCount;
      }
      rollCount++;
      if (rollDice(diceSides, diceAmount) == winningValue) {
        bettingPool += prize;
      } else {
        bettingPool -= minimumBet;
      }
    }

    //Once game is concluded update hmtl elements to reflect results
    updateUI(
      startingAmount,
      highestAmountWon,
      rollCount,
      rollCountForHighestAmount
    );
  } else {
    //user did not start with minimum bet amount
    alert("Minimum bet is $1.00");
  }
}

//Returns an int of two random ints between 1 and 6 added together
function rollDice(numberOfSides, quantity) {
  var amountRolled = 0;
  for (let index = 0; index < quantity; index++) {
    amountRolled += randomInt(1, numberOfSides);
  }
  return amountRolled;
}

//HelperFunction generates a random int from min to max including min and max
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Updates DOM elements responsible for displaying the results of the game
//normally I would have brought these strings out to a constants section
function updateUI(
  startingAmount,
  highestAmountWon,
  rollCount,
  rollCountForHighestAmount
) {
  document.getElementById("beginningAmount").innerText = `$${parseFloat(
    startingAmount
  ).toFixed(2)}`;
  document.getElementById("highestAmount").innerText = `$${parseFloat(
    highestAmountWon
  ).toFixed(2)}`;
  document.getElementById("totalRolls").innerText = `${rollCount}`;
  document.getElementById(
    "rollCountHighest"
  ).innerText = `${rollCountForHighestAmount}`;

  //reveal results section
  document.querySelectorAll(".hidable").forEach(element => {
    console.log(element.className);
    element.style.visibility = "visible";
  });
}

function checkIfNumber(input) {
  return isIntNumber(input) || isFloatNumber(input);
}

//At this point definitely going overboard
//returns Bool using Regular expression to determine if the value is a int
function isIntNumber(value) {
  var regex = /^\d+$/;

  return regex.test(value);
}

//returns Bool using Regular expression to determine if the value is a float
function isFloatNumber(value) {
  var regex = /^[-+]?[0-9]+\.[0-9]+$/;

  return regex.test(value);
}
