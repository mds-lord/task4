window.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell'),
        cols = ["A", "B", "C", "D", "E", "F", "G", "H"],
        rows = ["1", "2", "3", "4", "5", "6", "7", "8"];
    var lastCell = null,
        lastMoves = [],
        coords = initCoords();
    initCells();

    function initCoords() {
        let coords = [];
        for (let row = 7; row > -1; row--) {
            for (let col = 0; col < 8; col++) {
                coords.push(cols[col] + rows[row]);
            }
        }
        return coords;
    }
    
    function initCells () {
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => { cellClick(cell); });
            cell.setAttribute("data-coords", coords[index]);
        });
    }

    function calculate(cell) {
        const xInit = cols.indexOf(cell.getAttribute("data-coords").substr(0, 1)),
            yInit = rows.indexOf(cell.getAttribute("data-coords").substr(1, 1));
        let results = [];
        for (let x = 0; x < 8; x++) {
            for (let y = 0; y < 8; y++) {
                if (Math.abs(xInit - x) * Math.abs(yInit - y) == 2) {
                    results.push(cols[x] + rows[y]);
                }
            }
        }
        return results;
    }

    function cellClick(cell) {
        if (lastCell !== null) {
            lastCell.style = null;
        }
        if (lastMoves.length > 0) {
            lastMoves.forEach((move) => {
                let str = 'div.cell[data-coords=' + String(move) + ']';
                document.querySelector(str).style = null;
            });
        }
        cell.style.backgroundColor = "blue";
        lastCell = cell;
        lastMoves = calculate(cell);
        lastMoves.forEach((move) => {
            let str = 'div.cell[data-coords=' + String(move) + ']';
            document.querySelector(str).style.backgroundColor = "green";
        });
    }
});