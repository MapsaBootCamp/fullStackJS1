const palayers = ["X", "O"];
let turn = palayers[0];
let stat = 1;

const winSituation = [
  [1, 2, 3],
  [1, 4, 7],
  [1, 5, 9],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

const board = new Map([
  [1, null],
  [2, null],
  [3, null],
  [4, null],
  [5, null],
  [6, null],
  [7, null],
  [8, null],
  [9, null],
]);

function winCheck(selectedItem) {
  console.log(selectedItem);
  let winFlag;
  for (const itemList of winSituation) {
    if (itemList.includes(selectedItem)) {
      winFlag = true;
      for (const item of itemList) {
        if (item !== selectedItem) {
          if (board.get(item) !== turn) {
            winFlag = false;
            break;
          }
        }
      }
      if (winFlag) return winFlag;
    }
  }
  return winFlag;
}

function onSelectElement(item) {
  console.log(item);
  const numSelectedElement = parseInt(item.id.at(-1));
  if (board.get(numSelectedElement) || !stat) {
    return;
  } else {
    board.set(numSelectedElement, turn);
    item.innerHTML = turn;
    if (winCheck(numSelectedElement)) {
      document.getElementById("state-game").innerHTML = `winner: ${turn}`;
      stat = 0;
    }
    turn = turn === "O" ? "X" : "O";
  }
}

function clickBoardElementHandler(e) {}

function init() {
  const items = document.querySelectorAll(".board-element");
  items.forEach((item) =>
    item.addEventListener("click", (e) => {
      e.preventDefault();
      onSelectElement(item);
    })
  );
  document.getElementById("reset-game").addEventListener("click", (e) => {
    window.location.reload();
  });
}

init();
