var jin = {
    id: "jin",
    healthPoints: 100,
    attackPower: 20,
    counterPower: 20,
};

var mugen = {
    id: "mugen",
    healthPoints: 120,
    attackPower: 15,
    counterPower: 40,
};

var shoryu = {
    id: "shoryu",
    healthPoints: 140,
    attackPower: 30,
    counterPower: 10,
};

var kk = {
    id: "kk",
    healthPoints: 200,
    attackPower: 20,
    counterPower: 40,
};

var gameFinished = false;
var playerCharacter;
var defender;
var result;

var playerCharacterObject;
var defenderObject;

function pickCharacter() {
    if (!playerCharacter) {
        if (this.id === "mugen") {
            playerCharacter = this;
            playerCharacterObject = mugen;
            $("#character").html(playerCharacter);

            $("#enemies").append($("#jin"));
            $("#enemies").append($("#shoryu"));
            $("#enemies").append($("#kk"));

            $("#jin").on("click", pickDefender);
            $("#shoryu").on("click", pickDefender);
            $("#kk").on("click", pickDefender);
        }
        if (this.id === "jin") {
            playerCharacter = this;
            playerCharacterObject = jin;
            $("#character").html(playerCharacter);

            $("#enemies").append($("#mugen"));
            $("#enemies").append($("#shoryu"));
            $("#enemies").append($("#kk"));

            $("#mugen").on("click", pickDefender);
            $("#shoryu").on("click", pickDefender);
            $("#kk").on("click", pickDefender);
        }
        if (this.id === "shoryu") {
            playerCharacter = this;
            playerCharacterObject = shoryu;
            $("#character").html(playerCharacter);

            $("#enemies").append($("#jin"));
            $("#enemies").append($("#mugen"));
            $("#enemies").append($("#kk"));

            $("#mugen").on("click", pickDefender);
            $("#jin").on("click", pickDefender);
            $("#kk").on("click", pickDefender);
        }
        if (this.id === "kk") {
            playerCharacter = this;
            playerCharacterObject = kk;
            $("#character").html(playerCharacter);

            $("#enemies").append($("#jin"));
            $("#enemies").append($("#shoryu"));
            $("#enemies").append($("#mugen"));

            $("#mugen").on("click", pickDefender);
            $("#jin").on("click", pickDefender);
            $("#shoryu").on("click", pickDefender);
        }
    }
}

function pickDefender() {
    if (!defender) {
        if (this.id === "mugen") {
            defender = this;
            defenderObject = mugen;
            $("#defender").html(defender);
        }
        else if (this.id === "jin") {
            defender = this;
            defenderObject = jin;
            $("#defender").html(defender);
        }
        else if (this.id === "shoryu") {
            defender = this;
            defenderObject = shoryu;
            $("#defender").html(defender);
        }
        else {
            defender = this;
            defenderObject = kk;
            $("#defender").html(defender);
        }
    }
}

function fight() {
    if (defender && playerCharacter && gameFinished === false) {

        //character attacks
        defenderObject.healthPoints = defenderObject.healthPoints - playerCharacterObject.attackPower;
        playerCharacterObject.attackPower += playerCharacterObject.attackPower;

        //transfering the hp dmg to the cards
        if (defender.id === "mugen") {
            mugen.healthPoints = defenderObject.healthPoints;
        }
        else if (defender.id === "jin") {
            jin.healthPoints = defenderObject.healthPoints;
        }
        else if (defender.id === "shoryu") {
            shoryu.healthPoints = defenderObject.healthPoints;
        }
        else {
            kk.healthPoints = defenderObject.healthPoints;
        }

        //defender counterattacks
        playerCharacterObject.healthPoints = playerCharacterObject.healthPoints - defenderObject.counterPower;

        //transfering the hp dmg to the cards
        if (playerCharacter.id === "mugen") {
            mugen.healthPoints = playerCharacterObject.healthPoints;
        }
        else if (playerCharacter.id === "jin") {
            jin.healthPoints = playerCharacterObject.healthPoints;
        }
        else if (playerCharacter.id === "shoryu") {
            shoryu.healthPoints = playerCharacterObject.healthPoints;
        }
        else {
            kk.healthPoints = playerCharacterObject.healthPoints;
        }

        //check if anyone dies
        //first check if the player dies
        if (playerCharacterObject.healthPoints <= 0) {
            gameFinished = true;
        }

        //then check if the defender dies
        if (defenderObject.healthPoints <= 0) {
            defender = null;
            defenerObject = null;
            $("#defender").empty();
        }

        //check result if character is dead, can be draw or loss.
        if (gameFinished === true && defenderObject.healthPoints <= 0 && playerCharacterObject.healthPoints <= 0) {
            result = "Like a Classic Samurai Duel, This One Has Ended in a Draw";
        }
        else if (gameFinished === true && defenderObject.healthPoints > 0) {
            result = "You Lost, Some Live Some Die Thats The Way of the Samurai"
        }
        else if (gameFinished === false && defenderObject.healthPoints <= 0 && ($('#enemies').is(':empty'))) {
            result = "You Win,  You are the Quickest Blade in the Land!"
            gameFinished = true;
        }

        //update display
        updateHpDisplay();
    }
    else {
        alert("Please select a fighter");
    }
}

function updateHpDisplay() {
    if (gameFinished === false) {
        $("#mugen-hp").html("Hitpoints: " + mugen.healthPoints);
        $("#jin-hp").html("Hitpoints: " + jin.healthPoints);
        $("#shoryu-hp").html("Hitpoints: " + shoryu.healthPoints);
        $("#kk-hp").html("Hitpoints: " + kk.healthPoints);

        console.log("Hitpoints: " + mugen.healthPoints);
        console.log("Hitpoints: " + jin.healthPoints);
        console.log("Hitpoints: " + shoryu.healthPoints);
        console.log("Hitpoints: " + kk.healthPoints);

        console.log(playerCharacter);
        console.log(defender);
    }
    else {

        $(".row").empty();

        $("#pickable-characters").html("Please Refresh the Page to Restart");

        $("#title").html(result);
    }
}

window.onload = function () {
    $("#fight-button").on("click", fight);
    $("#mugen").on("click", pickCharacter);
    $("#jin").on("click", pickCharacter);
    $("#shoryu").on("click", pickCharacter);
    $("#kk").on("click", pickCharacter);
    updateHpDisplay();
};