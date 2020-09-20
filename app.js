function createGrid(sideLength) {
  container.style.gridTemplate = `repeat(${sideLength}, 1fr) / repeat(${sideLength}, 1fr)`;
  for (let i = 0; i < sideLength * sideLength; i++) {
    let div = document.createElement("div");
    div.classList.add("grid-item");
    container.appendChild(div);
  }
}

function addPixelListeners() {
  const pixels = document.querySelectorAll(".grid-item");
  pixels.forEach((pixel) => {
    addEventListener("mouseover", changeToSlowBlack);
  });
}

function changeToBlack(event) {
  if (event.target.classList.contains("grid-item")) {
    event.target.style.background = "black";
  }
}

function changeToRandom(event) {
  if (event.target.classList.contains("grid-item")) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    event.target.style.background = `rgb(${red}, ${green}, ${blue})`;
  }
}

function changeToSlowBlack(event) {
  if (event.target.classList.contains("grid-item")) {
    if (!event.target.style.background) {
      event.target.style.background = "rgba(0,0,0,0.1)";
    } else {
      let opacity = event.target.style.background.slice(14, 17);
      if (+opacity != 0) {
        opacity = +opacity + 0.1;
        event.target.style.background = `rgba(0,0,0,${opacity})`;
      }
    }
  }
}

function showPopup() {
  popup.classList.toggle("hidden");
}

function hidePopup(event) {
  const targetsParent = event.target.parentElement;
  if (
    !targetsParent.classList.contains("popup") &&
    !targetsParent.classList.contains("popup-box")
  ) {
    popup.classList.add("hidden");
  }
}

function clearGrid() {
  container.innerHTML = "";
}

function createNewGrid() {
  const sideLength = pixelInput.value;
  if (isNaN(sideLength)) {
    //TODO
  } else {
    clearGrid();
    createGrid(sideLength);
    addPixelListeners();
    popup.classList.add("hidden");
  }
}

// UI
const container = document.querySelector(".container");
const popup = document.querySelector(".popup");
const pixelInput = document.querySelector(".pixels-number");
const confirmButton = document.querySelector(".confirm-pixels");

// App init
createGrid(4);

// Event Listeners
addPixelListeners();
document.querySelector(".clear").addEventListener("click", showPopup);
popup.addEventListener("click", hidePopup);
confirmButton.addEventListener("click", createNewGrid);
