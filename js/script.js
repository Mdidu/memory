/*
Fonctionnement du jeu memory

choix nombre de cartes pour la partie par l'utilisateur ( nombre pair obligatoire VIA x % 2 !== 0 redemande une valeur ! )
une fonction qui créera autant d'élément cartes que l'utilisateur veut en créer et les ajoutera dans la zoneCarte,
leurs donnera une classe carte + compteur, les pushera dans un tableau et incrémentera le compteur de 1
Le tableau une fois tous les éléments créer sera cloné.

chaque élément carte aura un élément identique
function random qui tirera des valeurs aléatoires pour placer les cartes
faire en sorte que si la valeur aléatoire tiré représente un élément déjà existant qu'elle retire pour viser un autre endroit ( un tableau et
un clone du tableau peuvent-être utile dans ce cas, en éliminant la valeur du tableau)

fonction qui teste si les 2 cartes retourné lors du click sont les même si oui +1 point au joueur et il peut rejouer sinon on les retourne de nouveau et
au tour du joueur suivant !
Si toutes les cartes sont retournée ont regarde qui a le plus de points et on affiche un message comme quoi le joueur à gagné, on fait ensuite
apparaître le bouton rejouer qui appellera la fonction reload !
 */

var game = document.getElementById('game');
//var zoneCarte = document.getElementById('zoneCarte');
var pointP1 = document.getElementById('pointP1');
var pointP2 = document.getElementById('pointP2');
var res = document.getElementById('res');
var reset = document.getElementById('reset');
var zoneCarte;
var tblCarte = [];
var tblCarteClone = tblCarte.slice(0);
var tbl = [];
var pairCarte = 0;
var nbCartes = prompt("Vous souhaitez jouer une partie avec combien de cartes?(Seul les nombres pair et supérieur à 0 sont autorisé) ");
while(nbCartes < 4 || (nbCartes % 2) !== 0){
    nbCartes = prompt("Le nombre de cartes est inférieur à 4 ou est un nombre impair, veuillez rentrer un nombre de cartes pair et " +
        "supérieur ou égal à 2 ! ");
}
var nbPair = nbCartes / 2;
var carte1;
var carteReveal = false;
var player = false;
var failed = false;
var p1Point = 0;
var p2Point = 0;

function random(id) {
    var indiceRandom = Math.floor(Math.random() * id.length);
    var table = id[indiceRandom];
    tblCarteClone.splice(indiceRandom, 1);
    return table;
}
function createCarte() {
    zoneCarte = document.createElement('div');
    zoneCarte.id = "zoneCarte";
    for(var i = 0; i < nbPair; i++){
        for(var j = 0; j < 2; j++){

            var div = document.createElement('div');
            div.className = "cartes";
            //div.className += "carte"+ pairCarte; ajouter la classe pair de carte au moment du placement de la carte via la valeur de la function random
            zoneCarte.appendChild(div);
            div.addEventListener('click', function () {
                revealCarte(this);
            });
            //tblCarte.push("");
            tblCarte.push(' carte' + pairCarte);
        }
        ++pairCarte;
    }
    game.appendChild(zoneCarte);
    position();
}
function position() {
    tblCarteClone = tblCarte.slice(0);
    var positionCarte = document.getElementsByClassName('cartes');
    for(var i = 0; i < nbCartes; i++){
        var x = random(tblCarteClone);
        console.log(x);
        tbl.push(x);
        positionCarte[i].className += tbl[i];
    }
}
function affichePoint(nbPoint, textPoint, player) {
    textPoint.innerHTML = "Le joueur " + player + " à " + nbPoint + " points!";
    var pointTotal = p1Point + p2Point;
    if(pointTotal === nbPair && p1Point > p2Point){
        win(1);
    } else if(pointTotal === nbPair && p2Point > p1Point){
        win(2);
    } else if(pointTotal === nbPair && p2Point === p1Point){
        win();
    }
}
function revealCarte(id) {
    id.style.backgroundColor = "cornflowerblue";
    id.innerHTML = id.classList[1];
    //id.innerHTML = id.className;
    setTimeout(function () {
        if(carteReveal === true){
            if(carte1.className === id.className){

                if(player === false){
                    p1Point++;
                    affichePoint(p1Point, pointP1, 1);
                }else {
                    p2Point++;
                    affichePoint(p2Point, pointP2, 2);
                }

            }else {

                carte1.style.backgroundColor = "black";
                carte1.innerHTML = "";
                carte1 = "";
                id.style.backgroundColor = "black";
                id.innerHTML = "";
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
            carteReveal = false;
        }else {
            carte1 = id;
            carteReveal = true;
        }
    }, 1000);
}
function win(player) {
    game.removeChild(zoneCarte);
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
    tblCarte = [];
    tblCarteClone = tblCarte.slice(0);
    tbl = [];
    pairCarte = 0;
    carte1 = "";
    carteReveal = false;
    player = false;
    failed = false;
    p1Point = 0;
    p2Point = 0;
    res.innerHTML = "Au tour du joueur 1 !";
    pointP1.innerHTML = "Le joueur 1 à 0 points";
    pointP2.innerHTML = "Le joueur 2 à 0 points";
    res.className = "";
    res.id = "res";
    nbCartes = prompt("Vous souhaitez jouer une partie avec combien de cartes?(Seul les nombres pair et supérieur à 0 sont autorisé) ");
    while(nbCartes < 4 || (nbCartes % 2) !== 0){
        nbCartes = prompt("Le nombre de cartes est inférieur à 4 ou est un nombre impair, veuillez rentrer un nombre de cartes pair et " +
            "supérieur ou égal à 2 ! ");
    }
    nbPair = nbCartes / 2;
    reset.style.display = "none";
    createCarte();
}

reset.addEventListener('click', reload);
createCarte();
