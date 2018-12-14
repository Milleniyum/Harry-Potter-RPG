var charChosen = false, oppChosen = false;
var character, opponent;
var charHealth, oppHealth, charAttack;

var characters = {
    "Harry Potter": { health: 180, attack: 10, counter: 25 },
    "Hermione Granger": { health: 170, attack: 12, counter: 20 },
    "Ron Weasley": { health: 160, attack: 8, counter: 15 },
    "Draco Malfoy": { health: 150, attack: 9, counter: 18 }
};

$(".column").on("click", function () {
    if (!charChosen) {
        $(this).appendTo("#your-character");
        $("h1").show();
        character = $(this).attr("value");
        charHealth = characters[character].health;
        charAttack = characters[character].attack;
        charChosen = true;
        $("#characters").children().each(function () {
            $(this).appendTo("#opponents");
        });
    } else if (!oppChosen && $(this).parent().attr("id") === "opponents") {
        $(this).appendTo("#defender");
        $("h2").show();
        $("#attack").show();
        opponent = $(this).attr("value");
        oppHealth = characters[opponent].health;
        oppChosen = true;
        $("#combat-text").html("");
    }
});

$("#attack").on("click", function () {

    oppHealth -= charAttack;
    charHealth -= characters[opponent].counter;
    charAttack += characters[character].attack;

    if (oppHealth <= 0) {
        charHealth += characters[opponent].counter; // Give health back
        $("#attack").hide();
        if ($("#opponents").children().length > 0) {
            $("#combat-text").html("You have won this duel with " + opponent + "!<br>You may choose another opponent.");
            oppChosen = false;
        } else {
            $("#combat-text").html("You have won this duel with " + opponent + " and the game!<br>Click Restart to play again!");
            $("#restart").show();
        }
        $("#defender").empty();
    } else if (charHealth <= 0) {
        $("#attack").hide();
        $("#combat-text").html("You have been defeated in this duel with " + opponent + "! GAME OVER!<br>Click Restart to play again!");
        charHealth = 0;
        $("#restart").show();
    } else {
        $("#combat-text").html("You attack " + opponent + " for " + charAttack + " damage.<br> " + opponent + " attacked you back for " + characters[opponent].counter + " damage.");

        switch (opponent) {
            case "Harry Potter":
                $("#harry-health").text(oppHealth);
                break;

            case "Hermione Granger":
                $("#hermione-health").text(oppHealth);
                break;

            case "Ron Weasley":
                $("#ron-health").text(oppHealth);
                break;

            case "Draco Malfoy":
                $("#draco-health").text(oppHealth);
                break;
        };
    }

    switch (character) {
        case "Harry Potter":
            $("#harry-health").text(charHealth);
            break;

        case "Hermione Granger":
            $("#hermione-health").text(charHealth);
            break;

        case "Ron Weasley":
            $("#ron-health").text(charHealth);
            break;

        case "Draco Malfoy":
            $("#draco-health").text(charHealth);
            break;
    };
});

$("#restart").on("click", function () {
    location.reload();
});

// Set the health text of each character
$("#harry-health").text(characters["Harry Potter"].health);
$("#hermione-health").text(characters["Hermione Granger"].health);
$("#ron-health").text(characters["Ron Weasley"].health);
$("#draco-health").text(characters["Draco Malfoy"].health);


