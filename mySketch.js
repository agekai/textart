let particles = [];
let dotFlashes = [];
let dotCount = 20;
let radius = 150;

function setup() {
  createCanvas(600, 600);
  noFill();
  textAlign(CENTER, CENTER);
  textFont("Noto Serif TC");
}

function draw() {
  background(0, 40);

  // 第一象限的「閃點」
  createDotFlashes();
  updateDotFlashes();
  // 第一象限的焦點畫面
  push();
  background(0);
  drawFocus(); 
  pop();

  push();
  translate(100, height * 0.75);
  //scale(1, -1);
  drawAxesText(); // 用文字畫軸線
  drawFireText(); // 用「火」字畫火焰
  pop();
}

function drawAxesText() {
  let flicker = map(sin(frameCount * 0.05), -1, 1, 80, 200);
  let glowColor = color(0, 255, 255, flicker);
  let brightColor = color(0, 255, 255);

  textSize(14);
  fill(glowColor);
  noStroke();

  for (let i = -width; i < width; i += 20) {
		if((i==0)){}
		else{text("線", i, 0);}
  }
  for (let j = -height; j < height; j += 20) {
		if((j==0) || (j==-20) ){}
    else{text("線", 0, j);}
  }
}

function drawFireText() {
  let flicker = map(sin(frameCount * 0.01), -1, 1, 100, 255);
  let flameColor = color(255, 100, 0, flicker);
  textSize(40);
  fill(flameColor);
  noStroke();
  text("火", 0, 0);
}

// ---------- 閃現的「點」們 ----------
function createDotFlashes() {
  if (frameCount % 10 === 0) {
    let x = random(width* 0.3, width * 0.8);
    let y = random(30, height * 0.6);
    dotFlashes.push({
      x: x,
      y: y,
      alpha: 255,
      size: 3,
      growth: random(0.2, 0.6)
    });
  }
}

function updateDotFlashes() {
  for (let i = dotFlashes.length - 1; i >= 0; i--) {
    let p = dotFlashes[i];
    textSize(p.size);
    let c = color(255, 255, 255, p.alpha);
    fill(c);
    noStroke();
    circle(p.x, p.y,10)
    p.alpha -= 4;
    p.size += p.growth;

    if (p.alpha <= 0) {
      dotFlashes.splice(i, 1);
    }
  }
}

let baseRadius = 120;
let minRadius = 80;
let cycleFrames = 240;
let pauseFrames = 40;

function drawFocus() {
  push();
  let centerX = width * 0.6;
  let centerY = height * 0.35;

  textSize(20);
  fill(180);
  noStroke();

  for (let i = 0; i < dotCount; i++) {
    let baseAngle = TWO_PI / dotCount * i;

    let totalCycle = cycleFrames + pauseFrames;
    let cycle = frameCount % totalCycle;

    let r;
    if (cycle < cycleFrames) {
      let t = cycle / cycleFrames;
      let motion = sin(t * PI);
      r = lerp(baseRadius, minRadius, motion);
    } else {
      r = baseRadius;
    }

    let angle = baseAngle + frameCount * 0.01;

    let x = centerX + cos(angle) * r;
    let y = centerY + sin(angle) * r;

    text("點", x, y);
  }

  let flicker = map(sin(frameCount * 0.1), -1, 1, 80, 200);
  let glowColor = color(random(100, 255), 0, 0, flicker);

  textSize(80);
  stroke(glowColor);
  strokeWeight(3);
  fill(0);
  text("黑", centerX, centerY+5);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
