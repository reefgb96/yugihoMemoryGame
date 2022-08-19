"use strict";

const cardBack = document.querySelectorAll(".card-face");
const card = document.querySelector(".card");
let timeLeft = 100;
let flips = 0;
let score;
let chosenCards = [];
let matchedCardsArr = [];
// let prevCard = chosenCards[0];
// let curCard = chosenCards[1];
// let checkCardsArr = [];

const initBoard = () => {
  const gameCardsArr = [...cardsArr];
  gameCardsArr.sort(() => 0.5 - Math.random());
  const gameDiv = document.querySelector(".game-container");
  for (let card of cardsArr) {
    gameDiv.innerHTML += `
    <div class="card" id="card${card.id}" onclick="handleFlipCard(${card.id})">
    <div class="card-back card-face">
    <img class="spider" src="${card.frontImgUrl}"/>
    </div>
    <div class="card-front card-face">
    <img
    class="card-value"
    src="${card.backImgUrl}"
    alt="${card.title}"
    id="img${card.id}"
    />
    </div>
    `;
  }
  let edlTimeRemaining = document.querySelector("#time-remaining");
  let timer = setInterval(() => {
    edlTimeRemaining.innerHTML = timeLeft;
    timeLeft--;
    if (timeLeft <= 10) {
      edlTimeRemaining.style.color = "red";
    }
    if (timeLeft < 0) {
      clearInterval(timer);
      gameOver();
    }
    if (matchedCardsArr.length === 16) clearInterval(timer);
  }, 1000);
};
initBoard();

const handleFlipCard = (cardNum) => {
  //   let source = document.getElementById(`img${cardNum}`).src;
  let elFlips = document.querySelector("#flips");
  flips++;
  elFlips.innerHTML = flips;
  switch (cardNum) {
    case cardNum:
      document.getElementById(`card${cardNum}`).classList.add("visible");
      document.getElementById(`card${cardNum}`).classList.add("disabled");
      chosenCards.push(cardsArr[cardNum - 1]);
      console.log(chosenCards);
      if (chosenCards.length == 2) {
        checkMatch(cardNum);
      }
      break;
  }
};

let newArr = Array.from(document.querySelectorAll(`.card`));

const checkMatch = (cardNum) => {
  let flippedCArds = document.querySelectorAll(".visible");
  if (chosenCards[0].title === chosenCards[1].title) {
    const successAudio = new Audio(document.getElementById("Success").src);
    successAudio.play();
    matchedCardsArr.push(...chosenCards);
    flippedCArds.forEach((vCard) => {
      vCard.classList.add("matched");
      vCard.classList.add("visible");
      vCard.classList.add("disabled");
    });
    console.log("matchedCardsArr: ", matchedCardsArr);
    if (matchedCardsArr.length === 16) win();
    chosenCards = [];
  } else {
    flippedCArds.forEach((vCard) => {
      setTimeout(() => {
        const failAudio = new Audio(
          "http://127.0.0.1:5500/assetes/audio/FunnyLose.mp3"
        );
        failAudio.play();
        vCard.classList.remove("visible");
      }, 1000);
      vCard.classList.remove("disabled");
    });
    chosenCards = [];
  }
};

const gameOver = () => {
  if (timeLeft === 0) {
    const looseAudio = new Audio(document.getElementById("WahWahWah").src);
    looseAudio.play();
    chosenCards = [];
    matchedCardsArr = [];
    flips = 0;
    timeLeft = 100;
    score = 0;
  }
};

const calcScore = (time, tries) => {
  time = timeLeft;
  tries = flips;
  const scoreDiv = document.querySelector("#scoreDiv");
  const totalScore = document.querySelector("#score");
  score = time - flips;
  scoreDiv.innerHTML = "Score:" + score;
  totalScore.innerHTML = score;
};

const win = () => {
  const winAudio = new Audio(document.getElementById("Cheering").src);
  winAudio.play();
  const bodyDiv = document.querySelector("body");
  setInterval(() => {
    let winBgColors = [
      "tomato",
      "lightgreen",
      "lightblue",
      "goldenrod",
      "rebeccapurple",
    ];
    winBgColors.sort(() => 0.5 - Math.floor(Math.random()));
    console.log("win");
  }, 500);
  bodyDiv.style.backgroundColor = "tomato";
  calcScore();
};
