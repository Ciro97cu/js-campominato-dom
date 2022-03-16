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
    const numberCells = totalCells;
    grid.innerHTML = "";
    let bombsposition = generatorBombs(totalCells);
    console.log(bombsposition);
    for (let i = 0; i < numberCells; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(dimensionCells);
        grid.appendChild(cell);
        cell.innerText = i + 1;
        cell.addEventListener("click", () => {

            let bombOrNot = bombsposition.includes(i);

            if (bombOrNot) {
                cell.classList.add("bgc-sky");
            } else {
                cell.classList.add("bgc-red");
            }

        })
    }

}

function generatorRandomNumber(min, max) {
    range = max - min + 1;
    return Math.floor(Math.random() * range) + min;
}

function generatorBombs(totalCells) {
    let arrayBombsNumbers = [];
    for (let i = 1; i <= 16; i++) {
        let numberOfTheBombs = generatorRandomNumber(1, totalCells);
        while (arrayBombsNumbers.includes(numberOfTheBombs)) {
            numberOfTheBombs = generatorRandomNumber(1, totalCells);
        }
        arrayBombsNumbers.push(numberOfTheBombs);
    }
    return arrayBombsNumbers;
}

// ~~~~~~~~~~ END FUNCTIONS ~~~~~~~~~~

const buttonEasy = document.querySelector("#easy");
const buttonMedium = document.querySelector("#medium");
const buttonHard = document.querySelector("#hard");
const grid = document.querySelector("#grid");

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