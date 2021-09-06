//Game States
//"WIN" - Player robot has defeated all enemy-robots
//  * Fight all enemy-robots
//  * Defeat each enemy-robot
//"LOSE" - Player robot's health is zero or less
// if the enemy-robot health is zero or less, exit from the fight loop
// Wrap the game logic in a startGame() function
//When player is defeated or no more enemies, call an endGame() function
    // -alerts the player's total stats
    // -asks the player if they want to play again
    // -if yes, call startGame() to restart the game
//After player skips or defeats an enemy (and there are more to fight)
    // -ask player if they want to shop
    // -if no, continue as normal
    // -if yes the shop() function
    // -in shop() function, ask player if they want to refill health, 
    //   upgrade attack, or leave the shop
    // -if refill, subtract money points from player and increase attack power
    // -if leave, alert goodbye and exit the function
    // -if any other invalid option, call shop() again 

// this creates a window prompt
var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 50;

//you can also log multiple values at once like this
console.log(playerName, playerAttack, playerHealth);

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//create function
var fight = function(enemyName) {
     //repeat and execute as long as the enemy robot is alive
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
        //if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerName + " has decided to skip this fight. Goodbye.");
            //subtract money from playerMoney for skipping
            playerMoney = playerMoney - 10;
            console.log("playerMoney", playerMoney)
            break;
        }
    }
        //remove enemy's health by subtracting the amount set in the playerAttack variable
        enemyHealth = enemyHealth - playerAttack;
        
        //log a resulting message to the console to confirm that it worked
        console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");
        
        //check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
            //award player money for winning
            playerMoney = playerMoney + 20;
            break;
        }
        else {
            window.alert(enemyName + " still has " + enemyHealth + " health remaining.");
        }
        // remove player's health by subtracting the amount set in the enemyAttack variable
        playerHealth = playerHealth - enemyAttack;
        //log a resulting message to the console to confirm that it worked
        console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
        )
        
        //check player's health
        if (playerHealth <=0) {
            window.alert(playerName + " has died!");
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        }
        else {
            window.alert(playerName + " still has " + playerHealth + " health remaining");
        }
    }  
};
// function to start a new game
var startGame = function() {
    //reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    for (var i = 0; i <enemyNames.length; i++) {
        //let player know what round they're in
        if (playerHealth > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i+1));

        //call fight function with enemy robot
        var pickedEnemyName = enemyNames[i];
        enemyHealth = 50;

        //use debugger to pause script from running and check what' going on
        //debugger;

        //pass the pickedEnemyNAme variable's value into the fight function,
        //where it will assume the value of the enemyName parameter
        fight(pickedEnemyName);
        }
        
        else {
            window.alert("You have lost your robot in battle! Game Over!")
        }

        //after the loop ends, player is either out of heaalth or enemies are
        endGame();
    }
};

var endGame = function() {
    //if player is still alive, player wins
    if (playerHealth > 0) {
        window.alert("The game has now ended. Let's see how you did!");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    //ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?")
    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!")
    }
};

//start the game when the page loads
startGame();

//execute function
//fight();