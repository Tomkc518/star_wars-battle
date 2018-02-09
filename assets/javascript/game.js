$(function() {
    var characterSelected = true;
    var enemySelected = true;
    var characterSet = true;
    var enemySet = true;
    var character = "";
    var enemy = "";
    
    var obiWan = {
        id: "1",
        health: 120,
        attack: 10,
        counterAttack: 15,
    };
    var luke = {
        id: "2",
        health: 100,
        attack: 8,
        counterAttack: 12,
    };
    var darthSid = {
        id: "3",
        health: 150,
        attack: 10,
        counterAttack: 20,
    };
    var darthMaul = {
        id: "4",
        health: 180,
        attack: 12,
        counterAttack: 25,
    };
    var possibleCharacters = [obiWan, luke, darthSid, darthMaul];
    // When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.
    $(".characterBox").on("click", function() {
        if (characterSelected) {
            $(".characterRow").append($(this));
            $(this).removeClass("characterBox")
            characterSelected = false;
            character = $(this).attr("id");
            $(this).addClass("characterAttacking");
            // The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.
            $(".characterBox").each(function() {
                $(".attackRow").append($(this));
                $(this).addClass("enemiesToAttack");
                $(this).css({"background-color": "red", "border": "1px solid black"});
            });
        };
    });
    // The player chooses an opponent by clicking on an enemy's picture.
    $(document).on('click', ".enemiesToAttack", function() {
        // Once the player selects an opponent, that enemy is moved to a defender area.
        if (enemySelected) {
            $(".defenderRow").append($(this));
            $(this).css({"background-color": "black", "border": "1px solid green", "color": "white"});
            enemySelected = false;
            enemy = $(this).attr("id");
        };
    });
    // The player will now be able to click the attack button.
    $(".attackButton").on("click", function() {
        if (characterSelected === false && enemySelected === false) {
            // Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture.
            if (characterSet){
                for (var i = 0; i < possibleCharacters.length; i++) {
                    if (character === possibleCharacters[i].id) {
                        characterAttack = possibleCharacters[i].attack;
                        characterAttackIncrease = possibleCharacters[i].attack;
                        characterHealth = possibleCharacters[i].health;
                        //console.log("Character attack: " + characterAttack);
                        //console.log("Character health: " + characterHealth);
                        characterSet = false;
                    };
                };
            };
             // The opponent character will instantly counter the attack. When that happens, the player's character will lose some of their HP. These points are shown at the bottom of the player character's picture.
            if (enemySet){
                for (var j = 0; j < possibleCharacters.length; j++) {
                    if (enemy === possibleCharacters[j].id) {
                        enemyAttack = possibleCharacters[j].attack;
                        enemyHealth = possibleCharacters[j].health;
                        //console.log("enemy attack: " + enemyAttack);
                        //console.log("enemy health: " + enemyHealth);
                        enemySet = false;
                    };
                };
            };
            console.log("Enemy Attack: " + enemyAttack);
            characterHealth -= enemyAttack;
            console.log("Character health: " + characterHealth);
            console.log("Character attack before :" + characterAttack);
            enemyHealth -= characterAttack;
            console.log("Enemy Health: " + enemyHealth);
            
            characterAttack += characterAttackIncrease;
            console.log("Character attack after :" + characterAttack);

            console.log("Character text: " + $(".characterAttacking.imagetextbottom"));
            
            $(".characterAttacking.imageTextBottom").text(characterHealth);
        
            
        };
    });
    
});


// The player will keep hitting the attack button in an effort to defeat their opponent.

// When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.

// The player wins the game by defeating all enemy characters. The player loses the game the game if their character's HP falls to zero or below.











