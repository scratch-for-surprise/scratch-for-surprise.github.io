let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");
let revealText = document.getElementById("reveal-text");
let isFirstScratch = true;

const init = () => {
  let gradientColor = context.createLinearGradient(0, 0, 135, 135);
  gradientColor.addColorStop(0, "#c3a3f1");
  gradientColor.addColorStop(1, "#6414e9");
  context.fillStyle = gradientColor;
  context.fillRect(0, 0, 200, 200);
};

let mouseX = 0;
let mouseY = 0;
let isDragged = false;
let lastX = 0;
let lastY = 0;

let events = {
  mouse: {
    down: "mousedown",
    move: "mousemove",
    up: "mouseup",
  },
  touch: {
    down: "touchstart",
    move: "touchmove",
    up: "touchend",
  },
};

let deviceType = "";

const isTouchDevice = () => {
  try {
    document.createEvent("TouchEvent");
    deviceType = "touch";
    return true;
  } catch (e) {
    deviceType = "mouse";
    return false;
  }
};

let rect = canvas.getBoundingClientRect();

const getXY = (e) => {
  mouseX = (!isTouchDevice() ? e.pageX : e.touches[0].pageX) - rect.left;
  mouseY = (!isTouchDevice() ? e.pageY : e.touches[0].pageY) - rect.top;
};

isTouchDevice();

canvas.addEventListener(events[deviceType].down, (event) => {
  isDragged = true;
  getXY(event);
  lastX = mouseX;
  lastY = mouseY;
});

canvas.addEventListener(events[deviceType].move, (event) => {
  if (!isTouchDevice()) {
    event.preventDefault();
  }
  if (isDragged) {
    getXY(event);
    scratch(mouseX, mouseY);
  }
});

canvas.addEventListener(events[deviceType].up, () => {
  isDragged = false;
});

canvas.addEventListener("mouseleave", () => {
  isDragged = false;
});

const scratch = (x, y) => {
  context.globalCompositeOperation = "destination-out";
  context.lineWidth = 24;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.beginPath();
  context.moveTo(lastX, lastY);
  context.lineTo(x, y);
  context.stroke();
  
  lastX = x;
  lastY = y;
  
  if (isFirstScratch) {
    revealText.style.display = "block";
    isFirstScratch = false;
  }
};

window.onload = init();
