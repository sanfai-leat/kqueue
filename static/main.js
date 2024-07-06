const inTable = document.getElementById("table-container-in");
let inCurrentRow;
function inAdd(string) {
  if (!inCurrentRow || inCurrentRow.children.length >= 2) {
    let found = false;
    for (const row of inTable.querySelectorAll(".row")) {
      if (row.children.length < 2) {
        inCurrentRow = row;
        found = true;
        break;
      }
    }
    console.log("inRow available:", found);
    if (!found) {
      inCurrentRow = document.createElement("div");
      inCurrentRow.className = "row";
      inTable.appendChild(inCurrentRow);
    }
  }

  const numberBox = document.createElement("div");
  numberBox.className = "number-box";
  numberBox.textContent = string;
  numberBox.style.color = "white";
  numberBox.style.border = "0.3vw solid white";
  inCurrentRow.appendChild(numberBox);
}

const ouTable = document.getElementById("table-container-out");
let ouCurrentRow;
function ouAdd(string) {
  if (!ouCurrentRow || ouCurrentRow.children.length >= 2) {
    let found = false;
    for (const row of ouTable.querySelectorAll(".row")) {
      if (row.children.length < 2) {
        ouCurrentRow = row;
        found = true;
        break;
      }
    }
    console.log("ouRow available:", found);
    if (!found) {
      ouCurrentRow = document.createElement("div");
      ouCurrentRow.className = "row";
      ouTable.appendChild(ouCurrentRow);
    }
  }

  const numberBox = document.createElement("div");
  numberBox.className = "number-box";
  numberBox.textContent = string;
  numberBox.style.color = "#00ff00";
  numberBox.style.border = "0.3vw solid #00ff00";
  ouCurrentRow.appendChild(numberBox);

  const numberBoxes = ouTable.querySelectorAll(".number-box");
  numberBoxes.forEach((box) => {
    box.addEventListener("dblclick", function () {
      const value = box.textContent;
      console.log("ou2Clicked value:", value);
      ouRm(value);
    });
  });
}

function inMv(number) {
  const container = document.getElementById("table-container-in");

  const numbers = Array.from(container.querySelectorAll(".number-box"));
  numbers.forEach((element) => {
    if (element.textContent == number) {
      element.remove();
      ouAdd(number);
    }
  });
  const rows = Array.from(container.querySelectorAll(".row"));
  inCurrentRow = rows[0];
}

function ouRm(number) {
  const container = document.getElementById("table-container-out");

  const numbers = Array.from(container.querySelectorAll(".number-box"));
  numbers.forEach((element) => {
    if (element.textContent == number) {
      element.remove();
    }
  });
  const rows = Array.from(container.querySelectorAll(".row"));
  ouCurrentRow = rows[0];
}

function isValidInteger(str) {
  const parsedInt = parseInt(str, 10);
  return !isNaN(parsedInt) && Number.isInteger(parsedInt);
}

var wage = document.getElementById("input");
wage.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    if (isValidInteger(e.target.value)) {
      inAdd(e.target.value);
      const numberBoxes = document
        .getElementById("table-container-in")
        .querySelectorAll(".number-box");
      numberBoxes.forEach((box) => {
        box.addEventListener("dblclick", function () {
          const value = box.textContent;
          console.log("in2Clicked value:", value);
          inMv(value);
        });
      });
    } else {
      console.log("invalid integer:", e.target.value);
    }
    wage.value = "";
  }
});
