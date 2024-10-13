let canvas = document.getElementById("scratch");
let context = canvas.getContext("2d");
let revealText = document.getElementById("reveal-text");
let isFirstScratch = true;

const init = () => {
  context.fillStyle = "rgb(218, 165, 32)"; // Set the fill color to rgb(218, 165, 32)
  context.fillRect(0, 0, 300, 300); // Draw the filled rectangle
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
  event.preventDefault(); // Prevent default behavior
});

canvas.addEventListener(events[deviceType].move, (event) => {
  event.preventDefault(); // Prevent default behavior for both mouse and touch
  if (isDragged) {
    getXY(event);
    scratch(mouseX, mouseY);
  }
});

canvas.addEventListener(events[deviceType].up, (event) => {
  isDragged = false;
  event.preventDefault(); // Prevent default behavior
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

// Prevent default touch behavior on the entire document
document.body.addEventListener('touchstart', function(e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, { passive: false });

document.body.addEventListener('touchend', function(e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, { passive: false });

document.body.addEventListener('touchmove', function(e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, { passive: false });

window.onload = init();
