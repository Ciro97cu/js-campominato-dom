/* Consegna
Copiamo la griglia fatta ieri nella nuova repo e aggiungiamo la logica del gioco 
Viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi nel range 1-100.
Il computer deve generare 16 numeri casuali
nello stesso range della difficoltà prescelta: le bombe.
I numeri nella lista delle bombe non possono essere duplicati.
In seguito l'utente clicca su una cella: 
se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - 
la cella si colora di rosso e la partita termina,
altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.
La partita termina quando il giocatore clicca su una bomba 
o raggiunge il numero massimo possibile di numeri consentiti.
Al termine della partita il software deve comunicare il punteggio,
cioè il numero di volte che l’utente ha cliccato su una cella che non era una b.

BONUS:
1- quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle
2- quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste
3- L'utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata,
in cui ogni cella contiene un numero tra quelli compresi in un range:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49 */

// ~~~~~~~~~~ FUNCTIONS ~~~~~~~~~~

function generateGrid(totalCells, dimensionCells) {
    numberCells = totalCells;
    prova = dimensionCells;
    // resetto la griglia la restart
    grid.innerHTML = "";
    // rimuovo il blocco del click quando restarto il gioco
    grid.classList.remove("block-click");
    // nascondo la schermata di feedback al restart del gioco
    gameOver.classList.add("d-none");
    youWin.classList.add("d-none");
    // resetto i click quando vado a startare una nuova partita
    click = 0;
    /* ottengo e stampo la posizione delle bombe tramite
    la funzione che mi genera le bombe */
    let bombsPosition = generatorBombs(totalCells);
    bombsPosition.sort(function (a, b) {
        return a - b;
    })
    console.log(bombsPosition);

    // ciclo tante volte quante caselle devo generare
    for (let i = 0; i < numberCells; i++) {
        // creo l'elemento div che rappresenterà ogni singola cella della mia griglia
        let cell = document.createElement("div");
        /* aggiungo al mio elemento div la classe generica "cell"
        per dare una formattazione base */
        cell.classList.add("cell");
        /* aggiungo anche la classe che da formattazione specifica
        a seconda del grado di difficoltà selezionato */
        cell.classList.add(dimensionCells);
        // vado ad inserire l'elemento div con le apposite classi nell'html
        grid.appendChild(cell);
        // inserisco all'interno di ogni cella un numero in maniera sequenziale
        cell.innerText = i + 1;

        clickOnCells(cell, bombsPosition, i, totalCells);

    }

}

/* funzione per generare numeri casuali in base ad un valore minimo e uno massimo
utilizzando l'oggetto Math */
function generatorRandomNumber(min, max) {
    range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

// funzione per generare un array di bombe
function generatorBombs(totalCells) {
    // creo un array vuoto dove andrò poi ad inserire le posizioni delle bombe
    let arrayBombsNumbers = [];
    // ciclo fino a quando l'array non ha 16 elementi al suo interno
    while (arrayBombsNumbers.length < 16) {
        // genero un numero random
        let numberOfTheBombs = generatorRandomNumber(1, totalCells);
        /* creo una condizione affinchè se questo numero random non è
        presente nell'array lo vado a pushare, altrimenti no e il ciclo si ripete */
        if (!arrayBombsNumbers.includes(numberOfTheBombs)) {
            arrayBombsNumbers.push(numberOfTheBombs);
        }
    }
    // ritorno l'array con la posizione delle bombe
    return arrayBombsNumbers;
}

function clickOnCells(cell, bombsPosition, i, totalCells) {



    cell.addEventListener("click", () => {
        let bombOrNot = bombsPosition.includes(i + 1);
        if (bombOrNot) {
            click = 0;
            const bomb = document.querySelectorAll(".cell");
            for (let i = 0; i < bomb.length; i++) {
                if (bombsPosition.includes(i + 1)) {
                    const bombCell = bomb[i];
                    bombCell.classList.add('bgc-red');
                }
            }
            gameOver.classList.toggle("d-none");
            grid.classList.toggle("block-click");

        } else {
            cell.classList.add("bgc-sky");
            cell.classList.toggle("block-click");
            scoreUser(totalCells);
        }
    })

}

function scoreUser(totalCells) {
    click += 1;
    console.log(click);
    let score = 100 / (totalCells - 16);
    let yourScore = (score * click).toFixed(0);
    if (click === 33) {
        youWin.classList.toggle("d-none");
        grid.classList.toggle("block-click");
    }
    console.log(yourScore);
    let scoreScreen = document.querySelector(".score");
    let scoreScreenW = document.querySelector(".scorew");
    scoreScreen.innerHTML = `Hai cliccato: ${click} volte - Punteggio: ${yourScore} %`;
    scoreScreenW.innerHTML = `Hai cliccato: ${click} volte - Punteggio: ${yourScore} %`;
    return yourScore;

}
// ~~~~~~~~~~ END FUNCTIONS ~~~~~~~~~~

const buttonEasy = document.querySelector("#easy");
const buttonMedium = document.querySelector("#medium");
const buttonHard = document.querySelector("#hard");
const grid = document.querySelector("#grid");
const gameOver = document.querySelector(".game-over");
const youWin = document.querySelector(".you-win");
const restartButtonG = document.querySelector(".game-over .restart");
const restartButtonW = document.querySelector(".you-win .restart");
let numberCells = 0;
let prova;
let click = 0;

buttonEasy.addEventListener("click", () => {
    generateGrid(100, "cell-easy");
}
)

buttonMedium.addEventListener("click", () => {
    generateGrid(81, "cell-medium");
}
)

buttonHard.addEventListener("click", () => {
    generateGrid(49, "cell-hard");
}
)

restartButtonG.addEventListener("click", () => {
    generateGrid(numberCells, prova);
    gameOver.classList.add("d-none");
})

restartButtonW.addEventListener("click", () => {
    generateGrid(numberCells, prova);
    youWin.classList.add("d-none");
})