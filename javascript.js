function getGridSize() {
    input = prompt("Enter grid size");
    var parseInput = parseInt(input);

    if (parseInput < 2) {
        parseInput = 2
    }

    if (parseInput > 16) {
        parseInput = 12;
    }
    return parseInput;
}


const container = document.querySelector("#container");

// creating grid:

function createGrid(gridSize) {
  // first for loop: x-axis
  for (let index = 0; index < gridSize; index++) {
    let row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);
    //console.log(index);
    // second for loop: y-axis
    for (let i = 0; i < gridSize; i++) {
      let cell = document.createElement("div");
      cell.classList.add("cell");
      cell.style.border = "thick solid white";
      cell.style.width = "60px";
      cell.style.height = "60px";
      cell.style.margin = "0px";
      cell.style.backgroundColor = "grey";
      cell.addEventListener("mouseover", function (e) {
        if (e.target.matches(".cell")) {
          e.target.style.backgroundColor = "red";
        }
      });
      row.appendChild(cell);
    }
  }
}

createGrid(getGridSize());