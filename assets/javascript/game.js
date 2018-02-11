$(function() {
    var characterSelected = false;
    var enemySelected = false;
    var enemiesDefeated = 0;
    var instructions = $('#instructions');
    var characterCombatStatus = $("#characterCombat");
    var enemyCombatStatus = $("#enemyCombat");

    $(instructions).html("<h2>Please choose a character</h2>");

    var characters = [
        {
            name: "Obi-Wan Kenobi",
            health: 120,
            baseAttack: 10,
            counterAttack: 15
        },
        {
            name: "Luke SKywalker",
            health: 100,
            baseAttack: 8,
            counterAttack: 12
        },
        {
            name: "Darth Sidius",
            health: 170,
            baseAttack: 10,
            counterAttack: 20
        },
        {
            name: "Darth Maul",
            health: 180,
            baseAttack: 12,
            counterAttack: 25
        }
    ];

    // When the game starts, the player will choose a character by clicking on the fighter's picture. The player will fight as that character for the rest of the game.
    $(".characterBox").on("click", function() {
        if (!characterSelected) {
            $(".characterRow").append($(this));
            $(this).removeClass("characterBox")
            characterSelected = characters[$(this).attr("id")];
            characterSelected.element = $(this);
            characterSelected.currentAttack = characterSelected.baseAttack;
            // The player must then defeat all of the remaining fighters. Enemies should be moved to a different area of the screen.
            $(".characterBox").each(function() {
                $(".attackRow").append($(this));
                $(this).addClass("enemiesToAttack");
                $(this).css({"background-color": "red", "border": "1px solid black"});
            });
            $(instructions).html("<h2>Please choose an enemy</h2>");
        };
    });

    // The player chooses an opponent by clicking on an enemy's picture.
    $(document).on('click', ".enemiesToAttack", function() {
        // Once the player selects an opponent, that enemy is moved to a defender area.
        if (!enemySelected) {
            $(".defenderRow").append($(this));
            $(this).css({"background-color": "black", "border": "1px solid green", "color": "white"});
            enemySelected = characters[$(this).attr("id")];
            enemySelected.element = $(this);
            $(instructions).html("<h2>Click attack to begin combat.</h2>");
        };
    });

    // The player will now be able to click the attack button.
    $(".attackButton").on("click", function() {
        if (characterSelected && enemySelected) {
            // Whenever the player clicks attack, their character damages the defender. The opponent will lose HP (health points). These points are displayed at the bottom of the defender's picture.
            
            // The player will keep hitting the attack button in an effort to defeat their opponent.
            characterSelected.health -= enemySelected.counterAttack;
            enemySelected.health -= characterSelected.currentAttack;
            characterSelected.currentAttack += characterSelected.baseAttack;
                        
            // Display health changes
            var characterHealthBox = $(characterSelected.element).find(".imageTextBottom")[0];
            var enemyHealthBox = $(enemySelected.element).find(".imageTextBottom")[0];

            $(characterHealthBox).html(characterSelected.health);
            $(enemyHealthBox).html(enemySelected.health);

            $(characterCombatStatus).html("<p>You attacked " + enemySelected.name + " for " + characterSelected.currentAttack + " damage.</p>");
            $(enemyCombatStatus).html("<p>" + enemySelected.name + " attacked you back for  " + enemySelected.counterAttack + " damage.</p>");

            // When the defender's HP is reduced to zero or below, remove the enemy from the defender area. The player character can now choose a new opponent.
            if (enemySelected.health <= 0) {
                $(enemySelected.element).remove();
                enemiesDefeated += 1;
                // When all defender's HP is reduced to zero or below, win the game
                if (enemiesDefeated >= (characters.length - 1)) {
                    $(instructions).html("<h2>" + enemySelected.name + " was defeated! You have defeated all of the enemies!</h2>");
                } else {
                    $(instructions).html("<h2>" + enemySelected.name + " was defeated! Choose a new enemy.</h2>");
                }
                enemySelected = false;
                // When your HP is reduced to zero or below, lose the game
            } else if (characterSelected.health <= 0) {
                $(instructions).html("<h2>" + characterSelected.name + " was defeated.</h2>");
                characterSelected = false;
            }
        };
    });
    
});
