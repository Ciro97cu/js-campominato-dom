/* Consegna
creare una griglia di gioco quadrata, 
in cui ogni cella contiene un numero tra quelli compresi 
in un range compreso tra 1 e 100
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro.

BONUS:
L'utente indica un livello di difficoltà,
in base al livello scelto la griglia conterrà un range diverso:
con difficoltà 1 => tra 1 e 100
con difficoltà 2 => tra 1 e 81
con difficoltà 3 => tra 1 e 49 */

// FUNZIONI
function generateGrid(rowCell, columnCell, dimensionCells) {
    let rows = rowCell;
    let columns = columnCell;
    const numberCells = rows * columns;
    grid.innerHTML = "";
    for (let i = 0; i < numberCells; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.classList.add(dimensionCells);
        grid.appendChild(cell);
        cell.innerText = i + 1;
        cell.addEventListener("click", () => cell.classList.add("bgc-sky"));
    }

}
// creao l'elemento div da andare in seguito ad inserire nel tag div con id grid

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const buttonEasy = document.querySelector("#easy");
const buttonMedium = document.querySelector("#medium");
const buttonHard = document.querySelector("#hard");
const grid = document.querySelector("#grid");

buttonEasy.addEventListener("click", () => generateGrid(10, 10, "cell-easy"));
buttonMedium.addEventListener("click", () => generateGrid(9, 9, "cell-medium"));
buttonHard.addEventListener("click", () => generateGrid(7, 7, "cell-hard"));





