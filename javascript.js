const sketchpad = document.querySelector(".sketchpad");
const inputGridSize = document.querySelector("#grid-size");
const generateGridButton = document.querySelector("#generate-grid");
let inputFavColor = document.querySelector("#favcolor");
let toggleGridLines = document.querySelector("#toggle-grid-lines");
let toggleRainbowColors = document.querySelector("#toggle-rainbow-colors");
let toggleDarkeningColors = document.querySelector("#toggle-darkening-colors");
let toggleEraser = document.querySelector("#toggle-eraser");

let gridSize = parseInt(inputGridSize.value, 10);
let isMouseDown = false;
let favColor = inputFavColor.value;
let isRainbowMode = false;
let isDarkeningEffect = false;
let isErasing = false;

// function to create grid: takes in gridsize, and computes a row with 'gridSize' cells, 'gridSize' times.
function createGrid(gridSizeInput) {
	// clear grid
	sketchpad.innerHTML = "";

	// Check if grid lines are currently toggled off
	const isGridLinesOff = toggleGridLines.classList.contains("active");

	// first for loop: x-axis
	for (let rowIndex = 0; rowIndex < gridSizeInput; rowIndex++) {
		const row = document.createElement("div");
		row.classList.add("row");
		sketchpad.appendChild(row);

		// second for loop: y-axis
		for (let cellIndex = 0; cellIndex < gridSizeInput; cellIndex++) {
			const cell = document.createElement("div");
			cell.classList.add("cell");

			// If grid lines are off, add the class to remove borders
			if (isGridLinesOff) {
				cell.classList.add("no-grid-lines");
			}

			row.appendChild(cell);
		}
	}
}

// // delegate listener to sketchpad
// sketchpad.addEventListener("mouseover", (event) => {
// 	if (!isMouseDown) {
// 		return; // Only draw when mouse is held
// 	}

// 	if (event.target.classList.contains("cell")) {
// 		// If eraser mode is active, erase and return early
// 		if (isErasing) {
// 			event.target.style.backgroundColor = "white";
// 			event.target.style.opacity = 1; // Reset opacity when erasing
// 			return;
// 		}

// 		if (isRainbowMode == true) {
// 			event.target.style.backgroundColor = getRainbowColors();
// 		} else {
// 			event.target.style.backgroundColor = favColor;
// 		}

// 		let isDarkeningEffectOn = toggleDarkeningColors.classList.contains("active");
// 		if (isDarkeningEffectOn) {
// 			// If it doesn’t have opacity set yet, default to 0 (fully transparent).
// 			let currentOpacity = parseFloat(event.target.style.opacity) || 0;
// 			if (currentOpacity < 1) {
// 				event.target.style.opacity = currentOpacity + 0.1;
// 			}
// 		}
// 	}
// });

// mouse pressed
document.body.addEventListener("mousedown", () => {
	isMouseDown = true;
});

// mouse released
document.body.addEventListener("mouseup", () => {
	isMouseDown = false;
});

// listen for when mouse moving and make sure mouse is down (pressed)
sketchpad.addEventListener("mouseover", (event) => {
	if (isMouseDown) {
		drawOnCell(event.target);
	}
});

// listen for click
sketchpad.addEventListener("click", (event) => {
	drawOnCell(event.target);
});

// function to draw on cell
function drawOnCell(cell) {
	// just return if we are not on a cell
	if (cell.classList.contains("cell") == false) {
		return;
	}

	// If eraser mode is active, erase and return early
	if (isErasing) {
		cell.style.backgroundColor = "white";
		cell.style.opacity = 1; // Reset opacity when erasing
		return;
	}

	if (isRainbowMode == true) {
		cell.style.backgroundColor = getRainbowColors();
	} else {
		cell.style.backgroundColor = favColor;
	}

	let isDarkeningEffectOn = toggleDarkeningColors.classList.contains("active");
	if (isDarkeningEffectOn) {
		// If it doesn’t have opacity set yet, default to 0 (fully transparent).
		let currentOpacity = parseFloat(cell.style.opacity) || 0;
		if (currentOpacity < 1) {
			cell.style.opacity = currentOpacity + 0.1;
		}
	}
}

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

inputFavColor.addEventListener("input", (event) => {
	favColor = event.target.value;
});

toggleGridLines.addEventListener("click", () => {
	document.querySelectorAll(".cell").forEach((cell) => {
		cell.classList.toggle("no-grid-lines");
	});
	toggleGridLines.classList.toggle("active");
});

toggleRainbowColors.addEventListener("click", () => {
	isRainbowMode = !isRainbowMode; // toggle between on and off
	toggleRainbowColors.classList.toggle("active");
});

toggleDarkeningColors.addEventListener("click", () => {
	isDarkeningEffect = !isDarkeningEffect;
	toggleDarkeningColors.classList.toggle("active");
});

toggleEraser.addEventListener("click", () => {
	isErasing = !isErasing;
	toggleEraser.classList.toggle("active");
});

function getRainbowColors() {
	return `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
}

// create grid with default size of 16
createGrid(gridSize);
