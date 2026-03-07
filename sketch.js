function setup() {
  createCanvas(1000, 1000);
  colorMode(HSB);
}

function draw() {
  background(60);
  monoPalette();
  let startColor = color(40, 100, 100); // yellow-orange
  let endColor = color(80, 100, 100); // yellow-green
  drawPalette(startColor, endColor, 50, 520, 250, 12);
}

function lerpBrightness(st_brightness, end_brightness, amt) {
  return st_brightness * (1 - amt) + end_brightness * amt;
}

function monoPalette() {
  let st_x = 50;
  let end_x = 520;
  let st_y = height / 8;
  let my_hue = hue("yellow");
  let st_brightness = 0;
  let end_brightness = 100;
  let divisions = 12;

  //side of  square
  let side = (end_x - st_x) / divisions;
  console.log(side);

  textSize(30);
  fill("black");
  text("Monochromatic", 50, 100);
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

  textSize(30);
  fill("black");
  text("Analogous", 50, 220);

  for (let i = 0; i < divisions; i++) {
    let amt = i / (divisions - 1);
    let c = lerpColor(startColor, endColor, amt);
    fill(c);
    rect(st_x + i * side, st_y, side, side);
  }
}
