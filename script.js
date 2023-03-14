const canvas = document.querySelector("canvas");
const secondsCount = document.querySelector(".seconds");
const level = document.querySelector(".grade");
const context = canvas.getContext("2d");
const DimensioniDoggo = { width: 250, height: 325};


const levels = {
  5: "Assistente",
  10: "Adoratore Base",
  15: "Adoratore Intermedio",
  30: "Adoratore Avanzato",
  60: "Fedele Base",
  100: "Fedele Intermedio",
  150: "Fedele Avanzato",
  250: "Sacerdote",
  500: "Saggio",
  750: "Eremita",
  1000: "Sommo",
  1500: "Amministratore delegato",
  2500: "CEO",
  3500: "Vescovo",
  5000: "Arcivescovo",
  10000: "Papa",
  20000: "Sovrano",
  30000: "THE MASTER"
}

const startTime = Date.now();

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.translate(window.innerWidth / 2, window.innerHeight / 2);

const image = new Image();
image.src = "./doggo.png"; // Photo credit to Matthew Henry (https://unsplash.com/photos/U5rMrSI7Pn4)

const loopingPugs = 40; // 125 pugs required to cover a full 4K television screen. Tested via Firefox DevTools
const offsetDistance = 100;
let currentOffset = 0;

const movementRange = 400

const mouseOffset = {
  x: 0,
  y: 0
}

const movementOffset = {
  x: 0,
  y: 0
}

image.onload = () => {
  startLooping();
};

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  context.setTransform(1, 0, 0, 1, 0, 0); //Reset the canvas context
  context.translate(window.innerWidth / 2, window.innerHeight / 2);
};

window.addEventListener('mousemove', onMouseMove)

function draw(offset, loopCount) {

  let currentPercentage = (loopingPugs - loopCount) / loopingPugs
  context.drawImage(
    image,
    -DimensioniDoggo.width / 2 - offset/2 + (movementOffset.x * currentPercentage),
    -DimensioniDoggo.height / 2 - offset/2 + (movementOffset.y * currentPercentage),
    DimensioniDoggo.width + offset,
    DimensioniDoggo.height + offset
  );
}

function onMouseMove(e) {
  mouseOffset.x = (e.clientX - window.innerWidth / 2) / window.innerWidth / 2 * movementRange
  mouseOffset.y = (e.clientY - window.innerHeight / 2) / window.innerHeight / 2 * movementRange
}

function lerp(start, end, amount) {
  return start*(1-amount)+end*amount
}

function loopDraw() {

  movementOffset.x = lerp(movementOffset.x, mouseOffset.x, 0.05)
  movementOffset.y = lerp(movementOffset.y, mouseOffset.y, 0.05)

  for (let i = loopingPugs; i >= 1; i--) {
    draw(i * offsetDistance + currentOffset, i);
  }

  draw(offsetDistance, 1);

  currentOffset++;
  if (currentOffset >= offsetDistance) {
    currentOffset = 0;
  }

  const newTime = Math.floor((Date.now() - startTime) / 1000);

  secondsCount.innerText = newTime;

  if(levels[newTime]) {
    level.innerText = levels[newTime]
  }

  if(newTime > 30100){
    image.src = "./sanLollo.jpg";
  }


  requestAnimationFrame(loopDraw);
}

function startLooping() {
  requestAnimationFrame(loopDraw);
}
;