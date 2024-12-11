document.addEventListener("DOMContentLoaded", () => {
    const whiteCar = document.getElementById("white");
    const redCar = document.getElementById("red");
    const whiteButton = document.getElementById("branco");
    const redButton = document.getElementById("vermelho");
    const resultText = document.getElementById("result");
    const resetButton = document.getElementById("resetar");
    const body = document.body;

    let carSize = 1;


    function updateCar(carElement, colorName, bgColor) {
        whiteCar.style.display = "none";
        redCar.style.display = "none";
        carElement.style.display = "block";
        resultText.textContent = `Carro ${colorName}`;
        body.style.backgroundColor = bgColor;
    }


    whiteButton.addEventListener("click", () => updateCar(whiteCar, "Branco", "white"));
    whiteCar.addEventListener("click", () => updateCar(whiteCar, "Branco", "white"));


    redButton.addEventListener("click", () => updateCar(redCar, "Vermelho", "red"));
    redCar.addEventListener("click", () => updateCar(redCar, "Vermelho", "red"));

    resetButton.addEventListener("click", () => {
        whiteCar.style.display = "block";
        redCar.style.display = "block";
        resultText.textContent = "?";
        body.style.backgroundColor = "initial";
        carSize = 1;
        updateCarSize();
    });


    function updateCarSize() {
        whiteCar.style.transform = `scale(${carSize})`;
        redCar.style.transform = `scale(${carSize})`;
    }


    function accelerate() {
        carSize += 0.1;
        updateCarSize();
    }

    function decelerate() {
        carSize = Math.max(0.5, carSize - 0.1);
        updateCarSize();
    }


    document.addEventListener("keydown", (event) => {
        if (event.key === "ArrowUp") {
            accelerate();
        } else if (event.key === "ArrowDown") {
            decelerate();
        }
    });
});