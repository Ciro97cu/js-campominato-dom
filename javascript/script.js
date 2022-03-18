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
    // variabile utilizzata per settare e resettare il gioco al numero giusto di celle
    numberCells = totalCells;
    /* variabile utilizzata per resettare correttamente le dimensioni delle celle
    alla difficoltà dell'ultima partita giocata */
    restartDimensionCells = dimensionCells;
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

    /* bombsPosition.sort(function (a, b) {
        return a - b;
    }) */ // METODO PER ORDINARE I NUMERI ALL'INTERNO DELL'ARRAY

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
        /* richiamo la funzione che mi consente di andare ad aggiungere
        funzionalità al click su ogni cella */
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

/* funzione che mi consente di andare ad aggiungere
funzionalità al click su ogni cella */
function clickOnCells(cell, bombsPosition, i, totalCells) {

    cell.addEventListener("click", () => {
        /* inizializzo una variabile e vado a verificare se l'array contiene al suo interno
        una corrispondenza in base alla mia i + 1 */
        let bombOrNot = bombsPosition.includes(i + 1);
        /* imposto una condizione in cui se la mia variabile è === true
        allora siamo in presenza di una bomba */
        if (bombOrNot) {
            /* vado a inizializzare una variabile che corrisponderà ad un array 
            con tutti i miei elementi html che hanno come classe cell */
            const bomb = document.querySelectorAll(".cell");
            for (let i = 0; i < bomb.length; i++) {
                /* vado a ciclare e imposto la condizione che se la posizione delle bombe
                corrisponde al mio i + 1 vado a creare una variabile dove metto 
                la posizione bomb[i] */
                if (bombsPosition.includes(i + 1)) {
                    const bombCell = bomb[i];
                    /* una volta ottenuta la posizione e messa nella mia variabile vado ad assegnare 
                    la classe che da il background colore rosso per far scattare non solo la 
                    cella su cui si clicca, ma tutte */
                    bombCell.classList.add('bgc-red');
                }
            }
            // se si clicca su una bomba vado a mostrare la finestra di game-over
            gameOver.classList.toggle("d-none");
            // rimuovo la possibilità di poter ricliccare su qualsiasi altra cella
            grid.classList.toggle("block-click");
            // al fine del calcolo del punteggio un click su una bomba non produrra nessun incremento di punti
            click += 0;
        } else {
            // se invece clicchiamo su una casella buona vado ad aggiungere alla cella il colore azzurro
            cell.classList.add("bgc-sky");
            /* al fine del calcolo del punteggio rimuovo la possibilità di poter ricliccare sulla
            casella appena cliccata */
            cell.classList.toggle("block-click");
            // un click su una casella buona produrra un incremento del punteggio di 1 punto
            click += 1;
        }
        // lancio la funzione per calcolare il punteggio dell'utente
        scoreUser(totalCells);
    })

}

// funzione per calcolare il punteggio dell'utente
function scoreUser(totalCells) {
    // stampo i click effettuati in console
    console.log(click);
    // calcolo il punteggio in base al numero totale di celle per ogni livello
    let score = 100 / (totalCells - 16);
    /* moltiplico lo score appena calcolato in modo che sia in funzione dei click che andiamo ad effettuare
    e per comodità arrotondo il numero in modo che non abbia cifre decimali */
    let yourScore = (score * click).toFixed(0);
    /* imposto la condizione che affinchè i click corrispondano a quelli massimi effettuabili
    a seconda delle celle di ogni livello comparirà la schermata di vittoria */
    if (click === (totalCells - 16)) {
        youWin.classList.toggle("d-none");
        // come nel game-over blocco ulteriori click sulle celle della griglia una volta vinto
        grid.classList.toggle("block-click");
    }
    // per comodità stampo in console anche il punteggio in percentuale
    console.log(yourScore);
    // inizializzo due variabili per poi mandare a schermo lo score e i click effettuati
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
let restartDimensionCells;
let click = 0;

// evento al click sul bottone modalità facile
buttonEasy.addEventListener("click", () => {
    generateGrid(100, "cell-easy");
}
)

// evento al click sul bottone modalità media
buttonMedium.addEventListener("click", () => {
    generateGrid(81, "cell-medium");
}
)

// evento al click sul bottone modalità difficile
buttonHard.addEventListener("click", () => {
    generateGrid(49, "cell-hard");
}
)

// evento al click sul bottone restart al game-over
restartButtonG.addEventListener("click", () => {
    generateGrid(numberCells, restartDimensionCells);
    gameOver.classList.add("d-none");
})

// evento al click sul bottone restart alla vittoria
restartButtonW.addEventListener("click", () => {
    generateGrid(numberCells, restartDimensionCells);
    youWin.classList.add("d-none");
})