let startText = document.getElementById('start-text');
let body = document.querySelector("body");
let level = document.querySelector("h3");
let playground = document.querySelector(".playground");
let boxes = document.querySelectorAll(".box");
let helpBtn = document.querySelector(".help");
let difficultyButtons = document.querySelectorAll(".difficulty-btn");
let difficultyIndicator = document.getElementById("difficulty-indicator");
let restartBtn = document.querySelector(".restart");

let started = false;
let memArr = [];
let userArr = [];
let levelNum = 0;
let num = 0;
let clicks = 0;
let score = 0;
let flashSpeed = 500;

difficultyButtons.forEach(button => {
    button.addEventListener("click", () => {
        let difficulty = button.getAttribute("data-difficulty");
        switch (difficulty) {
            case "easy":
                flashSpeed = 700;
                break;
            case "medium":
                flashSpeed = 500;
                break;
            case "hard":
                flashSpeed = 300;
                break;
        }
        difficultyIndicator.innerText = `Difficulty: ${difficulty.toUpperCase()}`;
    });
});

playground.addEventListener("click", (event) => {
    if (started && event.target.classList.contains("box")) {
        userFlash(event.target);
        clicks++;
        userArr.push(event.target.id);
        checker();
    }
});

function userFlash(box) {
    box.classList.add("userFlash");
    setTimeout(() => {
        box.classList.remove("userFlash");
    }, 200);
}

function checker() {
    if (userArr[clicks - 1] !== memArr[clicks - 1]) {
        level.innerText = `You have lost the game, Your score is ${score}`;
        started = false;
        body.classList.add("gameOver");
        setTimeout(() => {
            body.classList.remove("gameOver");
        }, 500);
        levelNum = 1;
        gameOver();
    } else {
        num++;
    }

    if (num === memArr.length && num !== 0) {
        score += 10;
        userArr = [];
        clicks = 0;
        num = 0;
        setTimeout(selectBox, flashSpeed);
    }
}

body.addEventListener("keydown", () => {
    if (!started && difficultyIndicator.innerText !== "No difficulty selected") {
        started = true;
        startText.style.display = "none";
        restartBtn.style.display = "none";
        selectBox();
    }
});

function selectBox() {
    level.innerText = `Level ${levelNum}`;
    levelNum++;
    let randVal = Math.floor(Math.random() * 4);
    flashRand(randVal);
    memArr.push(boxes[randVal].id);
}

function flashRand(randVal) {
    boxes[randVal].classList.add("memFlash");
    setTimeout(() => {
        boxes[randVal].classList.remove("memFlash");
    }, flashSpeed);
}

helpBtn.addEventListener("click", () => {
    let initText = level.innerText;
    level.innerText = `Memory array is : ${memArr}`;
    setTimeout(() => {
        level.innerText = initText;
    }, 2000);
});

function gameOver() {
    startText.style.display = "block";
    restartBtn.style.display = "block";
}

restartBtn.addEventListener("click", () => {
    started = false;
    memArr = [];
    userArr = [];
    levelNum = 0;
    num = 0;
    clicks = 0;
    score = 0;
    startText.style.display = "block";
    restartBtn.style.display = "none";
    level.innerText = "(Press any key to start)";
});