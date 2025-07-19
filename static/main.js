const ouTable = document.getElementById("table-container-out");
let ouCurrentRow;
function ouAdd(string) {
  if (!ouCurrentRow || ouCurrentRow.children.length >= 6) {
    let found = false;
    for (const row of ouTable.querySelectorAll(".row")) {
      if (row.children.length < 6) {
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
  numberBox.style.color = "#ffffff";
  numberBox.style.border = "0.3vw solid #ffffff";
  ouCurrentRow.appendChild(numberBox);
  setTimeout(() => {
    numberBox.style.animation = "none";
  }, 10000);
  bellSound.currentTime = 0;
  bellSound.play();

  const numberBoxes = ouTable.querySelectorAll(".number-box");
  numberBoxes.forEach((box) => {
    box.addEventListener("dblclick", function () {
      const value = box.textContent;
      console.log("ou2Added value:", value);
      ouRm(value);
    });
  });
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
      ouAdd(e.target.value);
      const numberBoxes = document
        .getElementById("table-container-out")
        .querySelectorAll(".number-box");
      numberBoxes.forEach((box) => {
        box.addEventListener("dblclick", function () {
          const value = box.textContent;
          console.log("ou2Rmved value:", value);
          ouRm(value);
        });
      });
    } else {
      console.log("invalid integer:", e.target.value);
    }
    wage.value = "";
  }
});
