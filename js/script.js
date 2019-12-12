var game = document.getElementById('game');
var pointP1 = document.getElementById('pointP1');
var pointP2 = document.getElementById('pointP2');
var res = document.getElementById('res');
var reset = document.getElementById('reset');
var cardZone;
var tblCard = [];
var tblCardClone = tblCard.slice(0);
var tbl = [];
var numCardPairs = 0;
var nbCard = prompt("Vous souhaitez jouer une partie avec combien de cartes?(Seul les nombres pair et supérieur à 0 sont autorisé) ");
while(nbCard < 4 || (nbCard % 2) !== 0){
    nbCard = prompt("Le nombre de cartes est inférieur à 4 ou est un nombre impair, veuillez rentrer un nombre de cartes pair et " +
        "supérieur ou égal à 2 ! ");
}
var nbPairs = nbCard / 2;
var card1;
var cardReveal = false;
var player = false;
var failed = false;
var p1Point = 0;
var p2Point = 0;

function random(id) {
    var indiceRandom = Math.floor(Math.random() * id.length);
    var table = id[indiceRandom];
    tblCardClone.splice(indiceRandom, 1);
    return table;
}

function createCard() {
    cardZone = document.createElement('div');
    cardZone.id = "cardZone";
    for(var i = 0; i < nbPairs; i++){
        for(var j = 0; j < 2; j++){

            var div = document.createElement('div');
            div.className = "cards";
            cardZone.appendChild(div);
            div.addEventListener('click', function () {
                revealCard(this);
            });
            tblCard.push(' card' + numCardPairs);
        }
        ++numCardPairs;
    }
    game.appendChild(cardZone);
    position();
}

//function placing cards randomly
function position() {
    tblCardClone = tblCard.slice(0);
    var cardPosition = document.getElementsByClassName('cards');
    for(var i = 0; i < nbCard; i++){
        var x = random(tblCardClone);
        tbl.push(x);
        cardPosition[i].className += tbl[i];
    }
}

//function displaying the number of points and calling the win function if the game is finish
function pointDisplay(nbPoint, txtPoint, player) {
    txtPoint.innerHTML = "Le joueur " + player + " à " + nbPoint + " points!";
    var totalPoint = p1Point + p2Point;
    if(totalPoint === nbPairs && p1Point > p2Point){
        win(1);
    } else if(totalPoint === nbPairs && p2Point > p1Point){
        win(2);
    } else if(totalPoint === nbPairs && p2Point === p1Point){
        win();
    }
}

//function that reveals/hides cards
function revealCard(id) {
    id.style.backgroundColor = "cornflowerblue";
    id.innerHTML = id.classList[1];
    //id.innerHTML = id.className;
    setTimeout(function () {
        if(cardReveal === true){
            if(card1.className === id.className){

                if(player === false){
                    p1Point++;
                    pointDisplay(p1Point, pointP1, 1);
                }else {
                    p2Point++;
                    pointDisplay(p2Point, pointP2, 2);
                }
            }else {
                card1.style.backgroundColor = "black";
                card1.innerHTML = "";
                card1 = "";
                id.style.backgroundColor = "black";
                id.innerHTML = "";

                playerTurn();
            }
            cardReveal = false;
        }else {
            card1 = id;
            cardReveal = true;
        }
    }, 1000);
}

//function to decide who should play
function playerTurn() {
    failed = true;

    if(player === false && failed === true){
        res.innerHTML = "Au tour du joueur 2 !";
        player = true;
        failed = false;
    }else if(player === true && failed === true){
        res.innerHTML = "Au tour du joueur 1 !";
        player = false;
        failed = false;
    }
}

function win(player) {
    game.removeChild(cardZone);
    res.className = "transitionRes";
    res.id = "";
    res.setAttribute("style", "transition: font-size 2s");

    if(player){
        res.innerHTML = "Le joueur " + player + " a gagné !";
        reset.style.display = "block";
    }else {
        res.innerHTML = " Match nul, continuez à vous battre !";
        reset.style.display = "block";
    }
}

function reload() {
    tblCard = [];
    tblCardClone = tblCard.slice(0);
    tbl = [];
    numCardPairs = 0;
    card1 = "";
    cardReveal = false;
    player = false;
    failed = false;
    p1Point = 0;
    p2Point = 0;
    res.innerHTML = "Au tour du joueur 1 !";
    pointP1.innerHTML = "Le joueur 1 à 0 points";
    pointP2.innerHTML = "Le joueur 2 à 0 points";
    res.className = "";
    res.id = "res";
    nbCard = prompt("Vous souhaitez jouer une partie avec combien de cartes?(Seul les nombres pair et supérieur à 0 sont autorisé) ");
    while(nbCard < 4 || (nbCard % 2) !== 0){
        nbCard = prompt("Le nombre de cartes est inférieur à 4 ou est un nombre impair, veuillez rentrer un nombre de cartes pair et " +
            "supérieur ou égal à 2 ! ");
    }
    nbPairs = nbCard / 2;
    reset.style.display = "none";
    createCard();
}

reset.addEventListener('click', reload);
createCard();