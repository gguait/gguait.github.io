document.addEventListener("DOMContentLoaded", function () {
  let attemptsRemaining = 6;
  let next = 0;
  let currentguess = [];

  let originalNumber = generateNumbers(5);

  //Generamos el tablero
  function createInputFields() {
    let container = document.getElementById("board");
    for (let j = 0; j < 6; j++) {
      let row = document.createElement("div");
      row.className = "letter-row";
      for (let i = 0; i < 5; i++) {
        let box = document.createElement("div");
        box.className = "letter-box";
        row.appendChild(box);
      }
      container.appendChild(row);
    }
  }
  createInputFields();

  //Generamos cada uno de los digitos y lo almacenamos en el array 'originalNumber'
  function generateNumbers() {
    let originalNumber = [];
    for (let index = 0; index < 5; index++) {
      let generated;
      do {
        generated = Math.floor(Math.random() * 10);
      } while (originalNumber.includes(generated));
      originalNumber[index] = generated;
    }
    return originalNumber;
  }

  // ------------ JUEGOS ------------

  console.log(originalNumber);
  //Escuchamos las teclas
  document.addEventListener("keyup", (teclaPulsada) => {
    if (attemptsRemaining === 0) {
      return;
    }
    let pulsada = String(teclaPulsada.key);

    if (pulsada === "Backspace" && next !== 0) {
      removeLastNumber();
      return;
    }
    if (pulsada === "Enter") {
      checkguess();
      return;
    }
    let encontrada = pulsada.match(/[0-9+\-*/]/);

    if (!encontrada || encontrada.length > 1) {
      return;
    } else {
      inputNumber(pulsada);
    }
  });

  function inputNumber(num) {
    if (next === 5) {
      return;
    }

    let fila =
      document.getElementsByClassName("letter-row")[6 - attemptsRemaining];
    let caja = fila.children[next];
    caja.textContent = num;
    caja.classList.add("filled-box");
    currentguess.push(num);
    next += 1;
  }

  const teclas = document.querySelectorAll(".key");
  teclas.forEach(function (button) {
    button.addEventListener("click", function () {
      const btnValue = button.textContent;
      inputNumber(btnValue);
    });
  });

  function checkguess() {
    let row =
      document.getElementsByClassName("letter-row")[6 - attemptsRemaining];
    let guess = "";
    let rightguess = Array.from(originalNumber.join(""));
    console.log(rightguess);

    for (const val of currentguess) {
      guess += val;
    }

    if (guess.length != 5) {
      alert("El numero tiene que contener 5 digitos");
      return;
    }

    for (let i = 0; i < 5; i++) {
      let lettercolor = "";
      let box = row.children[i];
      let numberpos = rightguess.indexOf(currentguess[i]);

      if (numberpos === -1) {
        lettercolor = "grey";
        console.log("gris");
      } else {
        // console.log("a")
        if (currentguess[i] === rightguess[i]) {
          lettercolor = "green";
          console.log("green");
        } else {
          lettercolor = "yellow";
          console.log("yellow");
        }
        rightguess[numberpos] = "#";
      }
      let delay = 250 * i;
      setTimeout(() => {
        box.style.background = lettercolor;
      }, delay);
    }

    if (guess === originalNumber.join("")) {
      alert("Has ganado!");
      attemptsRemaining = 0;
      return;
    } else {
      attemptsRemaining -= 1;
      currentguess = [];
      next = 0;

      if (attemptsRemaining === 0) {
        alert(
          "Te has quedado sin vidas!\nEl número correcto era " +
            originalNumber.join("")
        );
        return;
      }
    }
  }

  function removeLastNumber() {
    let row =
      document.getElementsByClassName("letter-row")[6 - attemptsRemaining];
    let box = row.children[next - 1];
    box.textContent = "";
    box.classList.remove("filled-box");
    currentguess.pop();
    next -= 1;
  }
});
