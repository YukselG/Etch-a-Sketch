const sketchpad = document.querySelector(".sketchpad");
const inputGridSize = document.querySelector("#grid-size");
const generateGridButton = document.querySelector("button");
let inputFavColor = document.querySelector("#favcolor");

// the total width sizes of the "sketch pad" in pixels
let totalSketchPadSize = 800;
let gridSize = parseInt(inputGridSize.value, 10);

// function to create grid: takes in gridsize, and computes a row with 'gridSize' cells, 'gridSize' times.
function createGrid(gridSizeInput) {
	let gridSize = gridSizeInput;
	let totalCellSize = totalSketchPadSize / gridSize;

	// clear grid
	sketchpad.innerHTML = "";

	// subtracting the thin border (2px in total);
	let paddingSize = totalCellSize - 2;

	// first for loop: x-axis
	for (let rowIndex = 0; rowIndex < gridSize; rowIndex++) {
		const row = document.createElement("div");
		row.classList.add("row");
		sketchpad.appendChild(row);

		// second for loop: y-axis
		for (let cellIndex = 0; cellIndex < gridSize; cellIndex++) {
			const cell = document.createElement("div");
			cell.classList.add("cell");
			row.appendChild(cell);

			cell.addEventListener("mouseover", function () {
				cell.style.backgroundColor = "red";
				// for random colors
				//cell.style.backgroundColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
			});
		}
	}
}

// create grid with default size of 16
createGrid(gridSize);

// make user choose grid size - listening for blur so the field is updated when losing focus
inputGridSize.addEventListener("blur", (event) => {
	// parse the string value to int
	gridSize = parseInt(event.target.value, 10);

	// check input field value
	// if the input field is empty string, we cant parse, in that case we set the gridSize to 2
	if (isNaN(gridSize) || gridSize < 3) {
		gridSize = 3;
	} else if (gridSize > 100) {
		gridSize = 100;
	}

	event.target.value = gridSize;
});

generateGridButton.addEventListener("click", () => {
	gridSize = Math.min(100, Math.max(3, parseInt(inputGridSize.value, 10)));
	inputGridSize.value = gridSize;
	createGrid(gridSize);
});

//favColor.addEventListener();

// TODO: Get favorite color of user and use that when painting the grid
