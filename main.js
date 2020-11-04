const squares = $(".square");
const incongnitColor = $("#incognitColor");
const newGameBtn = $("#newGame");

let dificulty = 3;

function getRandomNumber(number) {
  return Math.floor(Math.random() * number);
}

function getRandomColors() {
  const r = getRandomNumber(256);
  const g = getRandomNumber(256);
  const b = getRandomNumber(256);

  return `rgb(${r}, ${g}, ${b})`;
}

function rangeSquares(fn) {
  for (let i = 0; i < squares.length; i++) {
    fn(squares[i], i);
  }
}

function validateSquare() {
  if (this.style.background === incongnitColor.text()) {
    $(".header").css("background", incongnitColor.text());
    $(".actions").css("background", incongnitColor.text());
    $(".winModal").modal("show");
  } else {
    $(this).css({ background: "#000", opacity: "0.08" });
    newGameBtn.text("REINICIAR JUEGO").css("background", "#D7DD39");
  }
}
$(".actions").css("background", "#196d9a");

function chagenDificulty() {
  if (this.textContent === "FACIL") {
    dificulty = 3;
    startGame();
  } else {
    dificulty = 6;
    startGame();
  }
}

function addEvents() {
  rangeSquares((square) => {
    square.addEventListener("click", validateSquare);
  });

  $(".winBtn").on("click", startGame);
  newGameBtn.on("click", startGame);
  $(".easy").on("click", chagenDificulty);
  $(".hard").on("click", chagenDificulty);
}

function setColors() {
  rangeSquares((square, index) => {
    square.style.display = dificulty > index ? "block" : "none";
    square.style.background = getRandomColors();
    square.style.opacity = 1;
  });

  incongnitColor.text(squares[getRandomNumber(dificulty)].style.background);
}

function startGame() {
  setColors();

  $(".winModal").modal("hide");
  newGameBtn.text("NUEVOS COLORES").css("background", "#3ac23b");
  $(".header").css("background", "#196d9a");
  $(".actions").css("background", "#196d9a");
}

addEvents();
startGame();
