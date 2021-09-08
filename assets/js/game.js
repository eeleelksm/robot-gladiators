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


var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);
    return value;
};

//create function
var fight = function(enemy) {
     //repeat and execute as long as the enemy robot is alive
    while (enemy.health > 0 && playerInfo.health > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        
        if (promptFight === "skip" || promptFight === "SKIP") {
            //confirm skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");
    
        //if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye.");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
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
        // remove player's health by subtracting the amount set in the enemyAttack variable
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        
        //log a resulting message to the console to confirm that it worked
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        )
        
        //check player's health
        if (playerInfo.health <=0) {
            window.alert(playerInfo.name + " has died!");
            window.alert("You have lost your robot in battle! Game Over!");
            break;
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health remaining");
        }
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

        //call fight function with enemy robot
            var pickedEnemyObj = enemyInfo[i];

            //set health for picked enemy
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
    var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    //use switchto carry out action
    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;
        case "LEAVE":
        case "leave":
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

// this creates a window prompt
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
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
        name: "Roberto",
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

//start the game when the page loads
startGame();

//execute function
//fight();