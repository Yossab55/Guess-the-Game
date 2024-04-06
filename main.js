// name

let userShowName = document.getElementById("name");
// images and reset them
let getNodes = document.querySelectorAll(".card");
let cards = [...getNodes];
let card = document.getElementsByClassName("cards");

// chick if they are correct
let firstElement = "";
let firstTaken = false;
let secondElement = "";
let secondTaken = false;
// play audio
let correct = new Audio("audio/correct.mp3");
let wrong = new Audio("audio/wrong.mp3");
// increase wrongs counter
let counterWrongs = document.getElementById("wrongs");

// chick if all flipped
let counterEnd = 0;
//resize card ;
let cardH = document.documentElement.clientHeight / 5;
getNodes.forEach(element => {
  element.style.height = cardH + "px";
});


startPlay();



//! take name

function takeName() {
  let startSection = document.createElement("div");
  startSection.classList = "start";
  let startButton = document.createElement("button");
  startButton.innerText = "START";
  startButton.classList = "but-start";
  startButton.onclick = function () {
    window.sessionStorage.name = prompt("Enter Your Name ");
    userShowName.innerText = window.sessionStorage.name;
    startSection.remove();
    showCards();
  };
  startSection.append(startButton);
  document.body.prepend(startSection);
}
//! reset images
function reset() {
  counterWrongs.innerText = 0;
  card[0].innerHTML = "";
  let divisor = 20;
  while (card[0].childElementCount < 20) {
    let random = new Date();
    let ind = random % divisor;
    card[0].append(cards[ind]);
    cards = cards.filter((ele, i) => i !== ind);
    divisor--;
  }
  getNodes = document.querySelectorAll(".card");
}
//! add event click and chick if they flipped
function assignmentValues() {
  getNodes.forEach((ele) => {
    
    ele.addEventListener("click", function () {
      if (!ele.hasAttribute("data-done")) {
        if (!firstTaken) {
          ele.classList.add("flipped");
          firstElement = ele.childNodes[3].firstChild.currentSrc;
          ele.setAttribute("data-done", "");
          firstTaken = true;
        } else if (!secondTaken) {
          ele.classList.add("flipped");
          secondElement = ele.childNodes[3].firstChild.currentSrc;
          ele.setAttribute("data-done", "");
          secondTaken = true;
          setTimeout(chickFlipped, 750);
        }
      }
    });
  });
}
//!  if they flipped chick for equals

function chickFlipped() {
  if (firstTaken && secondTaken) {
    if (firstElement === secondElement) {
      correct.play();
      counterEnd += 2;
      if (counterEnd === 20) makeChickEnd();

      getNodes.forEach((ele) => {
        if (ele.hasAttribute("data-done")) {
          ele.classList.add("done");
          ele.removeEventListener("click", function () {});
        }
      });
    } else {
      wrong.play();
      counterWrongs.innerText++;
      getNodes.forEach((ele) => {
        if (ele.hasAttribute("data-done") && !ele.classList.contains("done")) {
          ele.removeAttribute("data-done");
          ele.classList.remove("flipped");
        }
      });
    }
    firstTaken = false;
    secondTaken = false;
  }
}

//! want to play again or not

function makeChickEnd() {
  let endSection = document.createElement("div");
  let endContSection = document.createElement("div");
  endSection.classList = "end";
  endContSection.classList = "cont";

  let spanEnd = document.createElement("span");
  spanEnd.innerText = "Game Ended";
  spanEnd.classList = "en";
  endContSection.append(spanEnd);

  let spanTries = document.createElement("span");
  spanTries.innerText = `Wrong Times: ${counterWrongs.innerText}`;
  spanTries.classList = "tries";
  endContSection.append(spanTries);

  let endButtonSection = document.createElement("div");
  let yes = document.createElement("button");
  yes.classList = "yes";
  yes.append("Yes");
  yes.addEventListener("click", () => {
    location.reload();
  });
  endButtonSection.append(yes);
  let no = document.createElement("button");
  no.classList = "no";
  no.append("No");
  no.addEventListener("click", () => {
    window.close();
  });
  endButtonSection.append(no);
  endContSection.append(endButtonSection);
  endSection.appendChild(endContSection);
  document.body.append(endSection);
}

function startPlay() {
  reset();
  assignmentValues();
  if (window.sessionStorage.length < 2) takeName();
  if (window.sessionStorage.length >= 2) {
    userShowName.innerText = window.sessionStorage.name;
    showCards();
  }
}

function showCards() {
  getNodes.forEach((ele) => (ele.classList = "card flipped"));
  setTimeout(() => {
    getNodes.forEach((ele) => (ele.classList = "card "));
  }, 1500);
}

window.onresize = function () {
  cardH = document.documentElement.clientHeight / 5;
  getNodes.forEach((element) => {
    element.style.height = cardH + "px";
  });
}