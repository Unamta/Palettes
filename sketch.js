let intervals_slider;
let gap_slider;
let intervals;
let gap;
let startHue_slider;
let startHue;

function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB);
  intervals_slider = createSlider(0, 20, 10, 1);
  intervals_slider.position(600, 270);

  gap_slider = createSlider(10, 30, 0, 1);
  gap_slider.position(600, 465);

  startHue_slider = createSlider(0, 360, 40, 1);
  startHue_slider.position(600, 370);
}

function draw() {
  gap = gap_slider.value();
  intervals = intervals_slider.value();
  startHue = startHue_slider.value();

  background(60);

  textSize(30);
  fill("black");
  text("Monochromatic", 40, 150);
  monoPalette();
  let interval = intervals;
  let endHue = startHue + interval * 12;
  let startColor = color(startHue, 100, 100); // yellow-orange
  let endColor = color(endHue, 100, 100); // yellow-green

  textSize(30);
  fill("black");
  text(`Analogous (Hue:${startHue} Interval:${interval})`, 40, 250);

  textSize(30);
  fill("black");
  text("Interval", 600, 250);

  drawPalette(startColor, endColor, 40, 520, 260, 12);
  let analogousInterval = intervals * 2;
  let analogousEndHue = startHue + analogousInterval * 12;
  let analogousStartColor = color(startHue, 100, 100); // yellow-orange
  let analogousEndColor = color(analogousEndHue, 100, 100); // yellow-green

  textSize(30);
  fill("black");
  text(`Analogous (Hue:${startHue} Interval:${analogousInterval})`, 40, 350);

  textSize(30);
  fill("black");
  text("Hue", 600, 350);

  drawPalette(analogousStartColor, analogousEndColor, 40, 520, 360, 12);

  textSize(30);
  fill("black");
  text("Rectangle Palette with Spaces", 40, 450);

  textSize(30);
  fill("black");
  text("Spacing", 600, 450);
  rectPalette(analogousStartColor, analogousEndColor, 40, 520, 460, 12);
}

function lerpBrightness(st_brightness, end_brightness, amt) {
  return st_brightness * (1 - amt) + end_brightness * amt;
}

function monoPalette() {
  let st_x = 40;
  let end_x = 520;
  let st_y = 160;
  let my_hue = startHue;
  let st_brightness = 0;
  let end_brightness = 100;
  let divisions = 12;

  //side of  square
  let side = (end_x - st_x) / divisions;
  console.log(side);

  for (let i = 0; i < divisions; i++) {
    let brightness = lerpBrightness(
      st_brightness,
      end_brightness,
      i / (divisions - 1),
    );
    let c = color(my_hue, 100, brightness);
    fill(c);

    rect(st_x + i * side, st_y, side, side);
  }
}

function drawPalette(startColor, endColor, st_x, end_x, st_y, divisions) {
  let side = (end_x - st_x) / divisions;
  for (let i = 0; i < divisions; i++) {
    let amt = i / (divisions - 1);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);
    rect(st_x + i * side, st_y, side, side);
  }
}

function rectPalette(startColor, endColor, st_x, end_x, st_y, divisions) {
  let totalWidth = end_x - st_x;
  let side = (totalWidth - gap * (divisions - 1)) / divisions;

  for (let i = 0; i < divisions; i++) {
    let amt = i / (divisions - 1);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);

    let x = st_x + i * (side + gap);
    rect(x, st_y, side, side);
  }
}
