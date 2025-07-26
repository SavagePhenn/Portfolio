const display = document.getElementById("display");

function appendValue(val) {
  display.value += val;
}

function appendSymbol(symbol) {
  if (symbol === '×') {
    display.value += '*';
  } else if (symbol === '÷') {
    display.value += '/';
  } else if (symbol === '−') {
    display.value += '-';
  } else {
    display.value += symbol;
  }
}

function appendFunc(func) {
  switch (func) {
    case "sqrt":
      display.value += "Math.sqrt(";
      break;
    case "sin":
      display.value += "Math.sin(";
      break;
    case "cos":
      display.value += "Math.cos(";
      break;
    case "tan":
      display.value += "Math.tan(";
      break;
  }
}

function clearDisplay() {
  display.value = "";
}

function calculate() {
  try {
    const result = eval(display.value);
    display.value = result;
  } catch {
    display.value = "Error";
  }
}

document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key) || "+-*/().".includes(key)) {
    appendValue(key);
  } else if (key === "Enter") {
    e.preventDefault();
    calculate();
  } else if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else if (key.toLowerCase() === "c") {
    clearDisplay();
  }
});
