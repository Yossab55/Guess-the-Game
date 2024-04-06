let userShowName = document.getElementById("name"),
  // images and reset them
  getNodes = document.querySelectorAll(".card"),
  cards = [...getNodes],
  card = document.getElementsByClassName("cards"),
  // chick if they are correct
  firstElement = "",
  firstTaken = false,
  secondElement = "",
  secondTaken = false,
  // play audio
  correct = new Audio("audio/correct.mp3"),
  wrong = new Audio("audio/wrong.mp3"),
  // increase wrongs counter
  counterWrongs = document.getElementById("wrongs"),
  // chick if all flipped
  counterEnd = 0;

window.onload = startPlay();

//! take name

function takeName() {
  let startSection = document.createElement("div");
  startSection.classList = "start";
  let startButton = document.createElement("button");
  startButton.innerText = "START";
  startButton.classList = "but-start";
  startButton.onclick = function () {
    let _promot = prompt("Enter Your Name ");
    window.sessionStorage.name = _promot;
    userShowName.innerText = _promot !== null ? _promot : "UnKnown";
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
  getNodes.forEach(ele => {

    ele.addEventListener("click", function () {
      if (!ele.classList.contains("flipped")) {
        if (!firstTaken) {
          ele.classList.add("flipped");
          firstElement = ele;
          firstTaken = true;
        } else if (!secondTaken) {
          ele.classList.add("flipped");
          secondElement = ele;
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
    if (firstElement.querySelector('img').src === secondElement.querySelector('img').src) {
      correct.play();
      counterEnd += 2;
      if (counterEnd == 20) makeChickEnd();
      firstElement.classList.add('done')
      secondElement.classList.add('done')
    } else {
      wrong.play();
      counterWrongs.innerText++;
      firstElement.classList.remove("flipped")
      secondElement.classList.remove("flipped")
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
  spanEnd.innerText = "GAME ENDED, Play again ?";
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
  console.log(window.sessionStorage);
  let _name = window.sessionStorage.name;
  if (!_name) {
    takeName();
  } else {
    userShowName.innerText = _name !== 'null' ? _name : "UnKnown";
    showCards();
  }
}

function showCards() {
  getNodes.forEach((ele) => {
    ele.classList.add("flipped")
    setTimeout(() => {
      ele.classList.remove("flipped")
    }, 2000);
  });
}