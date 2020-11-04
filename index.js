const squaresDivs = document.querySelectorAll(".square");
const displayColor = document.querySelector("#incognitColor");
const header = document.querySelector(".header");
const newGameBtn = document.querySelector("#newGame");
const actions = document.querySelector(".actions");
const opportunities = document.querySelector(".opportunities");
const easyBtn = document.querySelector(".easy");
const hardBtn = document.querySelector(".hard");
const title = document.querySelector("#title");

let attempts = 0;
let dificulty = 4;
let firstEntry = true;
const countOpportunities = { 4: 2, 6: 3, 9: 6 };

const otherModals = [
  { name: "winModal", btn: "winBtn" },
  { name: "loserModal", btn: "loserModal" },
];

const HEADER_BACKGROUND = "#196d9a";
const NEW_COLORS_BTN = "#3ac23b";
const RESTART_GAME_BTN = "#D7DD39";

const WIN_TEXT = "GANASTE!";
const LOSE_TEXT = "PERDISTE!";
const DEFAULT_TEXT = "DIVIERTETE";
const RESTART_GAME = "REINICIAR JUEGO";
const NEW_COLORS = "NUEVOS COLORES";

const getRandomNumber = (number) => Math.floor(Math.random() * number);

const getRandomColor = () => {
  const r = getRandomNumber(256);
  const g = getRandomNumber(256);
  const b = getRandomNumber(256);

  return `rgb(${r},${g},${b})`;
};

const getIncognitColor = () => {
  const randomPosition = getRandomNumber(dificulty);

  return squaresDivs[randomPosition].style.background;
};

const rangeSquares = (fn) => {
  for (let i = 0; i < dificulty; i++) {
    fn(squaresDivs[i]);
  }
};

const findModal = (modalName) =>
  otherModals.find(({ name }) => name === modalName);

const win = (incognitColor) => {
  rangeSquares((square) => {
    square.style.background = incognitColor;
    square.style.opacity = 1;
  });

  header.style.background = incognitColor;
  actions.style.background = incognitColor;

  const winModal = findModal("winModal");

  $(`.${winModal.name}`).modal("show");
  $(`.${winModal.btn}`).on("click", () => {
    startGame();

    $(`.${winModal.name}`).modal("hide");
  });
};

const loseOut = (btn) => {
  btn.style.opacity = 0.05;

  attempts += 1;

  opportunities.textContent = `${attempts}/${countOpportunities[dificulty]}`;

  if (attempts === countOpportunities[dificulty]) {
    const loserModal = findModal("loserModal");
    $(`.${loserModal.name}`).modal("show");
    $(`.${loserModal.btn}`).on("click", () => {
      startGame();

      $(`.${loserModal.name}`).modal("hide");
    });
  }
};

function validateOption() {
  const incognitColor = displayColor.textContent;

  newGameBtn.textContent = RESTART_GAME;
  newGameBtn.style.background = RESTART_GAME_BTN;

  if (this.style.background !== incognitColor) loseOut(this);
  else win(incognitColor);
}

const hideSquare = () => {
  for (let i = 0; i < squaresDivs.length; i++) {
    if (i + 1 > dificulty) squaresDivs[i].style.display = "none";
  }
};

function changeDificulty() {
  if (this.className.includes("easy")) dificulty = 4;
  else if (this.className.includes("hard")) dificulty = 6;

  hideSquare();
  startGame();
}

// const validateOption = () => {
//   const incognitColor = displayColor.textContent;

//   if (this.style.background !== incognitColor) {
//     this.style.background = "#000";
//   } else {
//     rangeSquares((square) => {
//       square.style.background = incognitColor;
//     });

//     header.style.background = incognitColor;
//   }
// };

const addEvents = () => {
  rangeSquares((square) => square.addEventListener("click", validateOption));

  newGameBtn.addEventListener("click", startGame);

  easyBtn.addEventListener("click", changeDificulty);
  hardBtn.addEventListener("click", changeDificulty);
};

const colorizeTitle = () => {
  const value = title.textContent.split("");

  for (let i = 0; i < value.length - 1; i++) {

  }
};

const startGame = () => {
  addEvents();

  attempts = 0;
  newGameBtn.textContent = NEW_COLORS;
  newGameBtn.style.background = NEW_COLORS_BTN;

  opportunities.textContent = `${attempts}/${countOpportunities[dificulty]}`;

  rangeSquares((square) => {
    const color = getRandomColor();

    square.style.display = "block";
    square.style.background = `${color}`;
    square.style.opacity = 1;
  });

  const incognitColor = getIncognitColor();

  displayColor.textContent = incognitColor;

  header.style.background = HEADER_BACKGROUND;
  actions.style.background = HEADER_BACKGROUND;
};

startGame();
