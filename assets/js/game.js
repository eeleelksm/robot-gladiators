var randomNumber = function(min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

var fightOrSkip = function() {
  //ask player if they'd like to fight or skip
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  
  if (promptFight === "" || promptFight === null) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  }

  promptFight = promptFight.toLowerCase();
  if (promptFight === "skip") {
    var confirmSkip = window.confirm("Are you sure you'd like to quit?");

    if(confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye.");
      //subtract money from playerInfo.money for skipping
      playerInfo.playerMoney = playerInfo.money - 10;
      return true;
    }
  }
};

//create function
var fight = function(enemy) {
  //keep track of who goes first
  var isPlayerTurn = true;

  //if randomly change turn order
  if (Math.random() > 0.5) {
    isPlayerTurn = false;
  }
  
  //repeat and execute as long as the enemy robot is alive
  while (playerInfo.health > 0 && enemy.health > 0) {
    if (isPlayerTurn) {
    //ask player if they'd like to fight or skip
      if (fightOrSkip()) {
        break;
      }
      
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
    
      //remove enemy's health by subtracting the amount set in the playerInfo.attack variable
      enemy.health = Math.max(0, enemy.health - damage);
      
      //log a resulting message to the console to confirm that it worked
      console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");
        
      //check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + " has died!");
        //award player money for winning
        playerInfo.money = playerInfo.money + 20;
        break;
      } else {
        window.alert(enemy.name + " still has " + enemy.health + " health remaining.");
      }
  // player attacked first
    } else {
      var damage = randomNumber(enemy.attack - 3, enemy.attack);

      // remove player's health by subtracting the amount set in the enemyAttack variable
      playerInfo.health = Math.max(0, playerInfo.health - damage);

      //log a resulting message to the console to confirm that it worked
      console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
    );
      
  //check player's health
    if (playerInfo.health <=0) {
      window.alert(playerInfo.name + " has died!");
      break;
    } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining");
      }
    }  
  //switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

// function to start a new game
var startGame = function() {
  //reset player stats
  playerInfo.reset();

  for (var i = 0; i <enemyInfo.length; i++) {
    //let player know what round they're in
    if (playerInfo.health > 0) {
      window.alert("Welcome to Robot Gladiators! Round " + (i+1));
      // debugger;
    //call fight function with enemy robot
      var pickedEnemyObj = enemyInfo[i];
      
      //see health for picked enemy
      pickedEnemyObj.health = randomNumber(40,60);
      fight(pickedEnemyObj);
     
      //if we're not at the last enemy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask if player wants to use store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        //if yes, take to store() function
        if (storeConfirm) {
          shop();
        }
      }
    }

    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  //after the loop ends, player is either out of heaalth or enemies are
  endGame();
};

var endGame = function() {
  //if player is still alive, player wins
  if (playerInfo.health > 0) {
    window.alert("The game has now ended. Let's see how you did!");
  } else {
    window.alert("You've lost your robot in battle.");
  }

  //ask player if they'd like to play again
  var playAgainConfirm = window.confirm("Would you like to play again?")
  if (playAgainConfirm) {
    //restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!")
  }
};

var shop = function() {
  //ask player what they'd like to do
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE' to make a choice.");
  shopOptionPrompt = parseInt(shopOptionPrompt);
  //use switch to carry out action
  // debugger;
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store");
      //do nothing so function will end
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      //call shop() again to force player to pick valid option
      shop();
      break;
  }
};

//function to set name 
var getPlayerName = function() {
  var name = "";
  while (name === "" || name === null) {
    name = prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};

// this creates a window prompt
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 50,
  reset: function() {
    this.health = 100;
    this.money = 10;
    this.attack = 10;
  },
  refillHealth: function() {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    }
    else {
      window.alert("You don't have any money!");
    }
  },
  upgradeAttack: function() {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      this.attack += 6;
      this.money -= 7;
    }
    else {
      window.alert("You don't have any money!");
    }
  }
};

var enemyInfo = [
  {
    name: "Roborto",
    attack: randomNumber(10,14)
  },
  {
    name: "Amy Android",
    attack: randomNumber(10,14)
  },
  {
    name: "Robo Trumble",
    attack: randomNumber(10,14)
  }
];

console.log(enemyInfo);
console.log(enemyInfo[0]);
console.log(enemyInfo[0].name);
console.log(enemyInfo[0]['attack']);

//start the game when the page loads
startGame();

//execute function
//fight();