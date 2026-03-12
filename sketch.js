// 1. drawSinPalette() - sine-based non-linear interpolation
// 2. drawLogarithmicPalette() - logarithmic non-linear interpolation
// 3. drawOpacityPalette() - palette variation using alpha values
// 4. drawPaletteShapePattern() - heart-shaped palette pattern
// 5. unequalRectPalette() - palette with unequal spacing
// 6. gestaltRectPalette() - proximity-based grouping using larger gaps between clusters

// Slider variables used to control palette properties interactively
let intervalsSlider;
let gapSlider;
let intervals;
let gap;
let startHueSlider;
let startHue;

// Setup canvas and create sliders to control interval, hue and spacing
function setup() {
  createCanvas(windowWidth, 1050);
  colorMode(HSB, 360, 100, 100, 1);

  intervalsSlider = createSlider(0, 30, 10, 1);
  intervalsSlider.position(650, 170);

  startHueSlider = createSlider(0, 360, 40, 1);
  startHueSlider.position(650, 270);

  gapSlider = createSlider(0, 30, 10, 1);
  gapSlider.position(650, 365);
}

function draw() {
  // Read current slider values
  gap = gapSlider.value();
  intervals = intervalsSlider.value();
  startHue = startHueSlider.value();

  background(60);

  textSize(30);
  fill("black");
  text("Monochromatic Palette", 40, 50);
  monoPalette();
  let interval = intervals;
  let endHue = (startHue + interval * 12) % 360;
  let startColor = color(startHue, 100, 100);
  let endColor = color(endHue, 100, 100);

  textSize(30);
  fill("black");
  text(`Analogous Palette 1 (Hue:${startHue} Interval:${interval})`, 40, 150);

  textSize(30);
  fill("black");
  text("Interval", 650, 150);

  drawPalette(startColor, endColor, 40, 520, 160, 12);
  let analogousInterval = intervals * 2;
  let analogousEndHue = (startHue + analogousInterval * 12) % 360;
  let analogousStartColor = color(startHue, 100, 100);
  let analogousEndColor = color(analogousEndHue, 100, 100);

  textSize(30);
  fill("black");
  text(
    `Analogous Palette 2 (Hue:${startHue} Interval:${analogousInterval})`,
    40,
    250,
  );

  textSize(30);
  fill("black");
  text("Hue", 650, 250);

  drawPalette(analogousStartColor, analogousEndColor, 40, 520, 260, 12);

  textSize(30);
  fill("black");
  text("Rectangle Palette with Spaces", 40, 350);

  textSize(30);
  fill("black");
  text("Spacing", 650, 350);
  rectPalette(analogousStartColor, analogousEndColor, 40, 520, 360, 12);

  textSize(30);
  fill("black");
  text("Sine Palette", 40, 450);
  drawSinPalette(startColor, endColor, 40, 520, 460, 12);

  textSize(30);
  fill("black");
  text("Logarithmic Palette", 40, 550);
  drawLogarithmicPalette(startColor, endColor, 40, 520, 560, 12);

  textSize(30);
  fill("black");
  text("Opacity Palette", 40, 650);
  drawOpacityPalette();

  textSize(30);
  fill("black");
  text("Shape Pattern Palette", 40, 750);
  drawPaletteShapePattern(
    analogousStartColor,
    analogousEndColor,
    40,
    520,
    760,
    12,
  );

  textSize(30);
  fill("black");
  text("Unequal Spacing Palette", 40, 850);
  unequalRectPalette(analogousStartColor, analogousEndColor, 40, 520, 860, 12);

  textSize(30);
  fill("black");
  text("Gestalt Proximity Palette", 40, 950);
  gestaltRectPalette(analogousStartColor, analogousEndColor, 40, 520, 960, 12);
}

function lerpBrightness(stBrightness, endBrightness, amt) {
  return stBrightness * (1 - amt) + endBrightness * amt;
}

// Draw a monochromatic palette using one hue with varying brightness
function monoPalette() {
  let stX = 40;
  let endX = 520;
  let stY = 60;
  let myHue = startHue;
  let stBrightness = 0;
  let endBrightness = 100;
  let divisions = 12;

  // Width of each palette block
  let side = (endX - stX) / divisions;

  for (let i = 0; i < divisions; i++) {
    let brightness = lerpBrightness(
      stBrightness,
      endBrightness,
      i / (divisions - 1),
    );
    let c = color(myHue, 100, brightness);
    fill(c);

    rect(stX + i * side, stY, side, side);
  }
}

// Draw a palette by interpolating colours between startColor and endColor
function drawPalette(startColor, endColor, stX, endX, stY, divisions) {
  let side = (endX - stX) / divisions;
  for (let i = 0; i < divisions; i++) {
    let amt = i / (divisions - 1);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);
    rect(stX + i * side, stY, side, side);
  }
}

// Draw rectangles with adjustable spacing controlled by the gap slider
function rectPalette(startColor, endColor, stX, endX, stY, divisions) {
  let totalWidth = endX - stX;
  let side = (totalWidth - gap * (divisions - 1)) / divisions;

  for (let i = 0; i < divisions; i++) {
    let amt = i / (divisions - 1);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);

    let x = stX + i * (side + gap);
    rect(x, stY, side, side);
  }
}

// Uses sine interpolation to create non-linear colour transitions
function drawSinPalette(startColor, endColor, stX, endX, stY, divisions) {
  let side = (endX - stX) / divisions;
  for (let i = 0; i < divisions; i++) {
    let t = i / (divisions - 1);
    let amt = (sin(t * PI - PI / 2) + 1) / 2;
    let c = lerpColor(startColor, endColor, amt);
    fill(c);
    rect(stX + i * side, stY, side, side);
  }
}

// Uses logarithmic interpolation for faster colour change at the start
function drawLogarithmicPalette(
  startColor,
  endColor,
  stX,
  endX,
  stY,
  divisions,
) {
  let side = (endX - stX) / divisions;
  for (let i = 0; i < divisions; i++) {
    let t = i / (divisions - 1);
    let amt = log(1 + 9 * t) / log(10);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);
    rect(stX + i * side, stY, side, side);
  }
}

// Creates a palette where opacity gradually increases
function drawOpacityPalette() {
  let stX = 40;
  let endX = 520;
  let stY = 660;
  let myHue = startHue;
  let stOpacity = 0.0;
  let endOpacity = 1.0;
  let divisions = 12;

  // Width of each palette block
  let side = (endX - stX) / divisions;

  for (let i = 0; i < divisions; i++) {
    let opacity = lerpOpacity(stOpacity, endOpacity, i / (divisions - 1));
    let c = color(myHue, 100, 100, opacity);
    fill(c);
    rect(stX + i * side, stY, side, side);
  }
}

// Linear interpolation function for opacity values
function lerpOpacity(stOpacity, endOpacity, amt) {
  return stOpacity * (1 - amt) + endOpacity * amt;
}

// Draws a heart-shaped pattern using an equation from the link below.
// Heart shape based on the mathematical heart curve equation.
// Equation reference: Wolfram MathWorld - Heart Curve. https://mathworld.wolfram.com/HeartCurve.html
function heart(x, y, size, numOfPoints = 100) {
  let t = -3;
  let dt = 6 / numOfPoints;
  beginShape();
  while (t <= 3) {
    let hx = size * sqrt(2) * pow(sin(t), 3);
    let hy = -size * (-pow(cos(t), 3) - pow(cos(t), 2) + 2 * cos(t));
    vertex(x + hx, y + hy);
    t += dt;
  }
  endShape(CLOSE);
}

// Draws palette colours using heart shapes instead of rectangles
function drawPaletteShapePattern(
  startColor,
  endColor,
  stX,
  endX,
  stY,
  divisions,
) {
  let gap = 10;
  let totalWidth = endX - stX;
  let side = (totalWidth - gap * (divisions - 1)) / divisions;

  for (let i = 0; i < divisions; i++) {
    let amt = i / (divisions - 1);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);

    let x = stX + i * (side + gap);
    heart(x + side / 2, stY + side / 2, side * 0.4);
  }
}

// Creates unequal spacing between rectangles
function unequalRectPalette(startColor, endColor, stX, endX, stY, divisions) {
  let gap = 10;
  let side = 30;

  for (let i = 0; i < divisions; i++) {
    let amt = i / (divisions - 1);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);

    let x = stX + i * (side + gap * i);
    rect(x, stY, side, side);
  }
}

// Applies Gestalt proximity by grouping rectangles with larger gaps between clusters
function gestaltRectPalette(startColor, endColor, stX, endX, stY, divisions) {
  let gap = 10;
  let side = 30;
  let offset = 0;

  for (let i = 0; i < divisions; i++) {
    let amt = i / (divisions - 1);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);

    let x = stX + i * (side + gap);
    rect(x + offset, stY, side, side);
    if (i % 3 === 2) {
      offset += 25;
    }
  }
}
// Gestalt principle: proximity
// Rectangles are arranged in close groups separated by larger gaps
// so the eye perceives colour clusters.
