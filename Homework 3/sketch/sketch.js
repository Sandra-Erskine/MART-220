let wingPositions = [];
let saucePositions = [];
let isDragging = false;
let selectedWingIndex = -1; 
let img1, img2, img3; 
let fontTitle, fontName; 
let movingImageX = 100; 
let movingImageY = 100; 
let moveTimer = 0; 

function preload() {

  img1 = loadImage('assets/images/PinkHairGirl.png'); 
  img2 = loadImage('assets/images/BombGuy.png'); 
  img3 = loadImage('assets/images/BlueAlienGirl.png'); 
  
  // fonts //
  fontTitle = loadFont('assets/fonts/SariaCondensed-Bold.ttf'); 
  fontName = loadFont('assets/fonts/SariaCondensed-Bold.ttf'); 
}

function setup() {
  createCanvas(400, 400);
  background(255);
  // wings //
  for (let i = 0; i < 6; i++) {
    wingPositions.push(createVector(random(100, 300), random(270, 320)));
    saucePositions.push(createVector(wingPositions[i].x + random(-10, 10), wingPositions[i].y + random(-10, 10)));
  }
}

function draw() {
  background(0);

  // Title //
  textFont(fontTitle);
  textSize(24);
  fill(255);
  text("Buffalo Wings My Love", 10, 30);
  
  // My Name //
  textFont(fontName);
  textSize(16);
  fill(255);
  text("Sandra Erskine", width - 160, height - 20);

  // Plate //
  fill(300, 300, 200); // color of plate//
  noStroke();
  circle(200, 200, 80);

  // Draw chicken wings and sauce
  for (let i = 0; i < wingPositions.length; i++) {
    // Draw the wing (bright orange)
    fill(255, 140, 0);  // Bright orange color
    noStroke();
    ellipse(wingPositions[i].x, wingPositions[i].y, 50, 30);  // The wing

    // Rectangles for wings //
    fill(255);  // White color for the ends
    rect(wingPositions[i].x - 25, wingPositions[i].y - 5, 15, 10); // Left end
  }

  // Draw the images
  image(img1, 50, 50, 100, 100); // Display the first image
  image(img2, 200, 50, 100, 100); // Display the second image
  image(img3, 50, 200, 100, 100); // Display the third image

  // Move 3rd image w/ timer //
  moveTimer++;
  if (moveTimer % 60 === 0) { // Move every second (assuming 60 FPS)
    movingImageX = random(0, width - 100);
    movingImageY = random(0, height - 100);
  }

  // Display the moving image
  image(img3, movingImageX, movingImageY, 100, 100);
}

function mousePressed() {
  // Check if a wing is clicked to start dragging
  for (let i = 0; i < wingPositions.length; i++) {
    let wing = wingPositions[i];
    // Check if mouse is close enough to the center of a wing (hitbox) //
    if (dist(mouseX, mouseY, wing.x, wing.y) < 25) {  // 25 is half the width of the wing (50)
      isDragging = true;
      selectedWingIndex = i;
      break;
    }
  }
}

function mouseReleased() {
  // Stop dragging when the mouse is released
  isDragging = false;
  selectedWingIndex = -1;
}

function mouseDragged() {
  // Move the selected wing with the mouse if dragging
  if (isDragging && selectedWingIndex !== -1) {
    wingPositions[selectedWingIndex].x = mouseX;
    wingPositions[selectedWingIndex].y = mouseY;
  }
}
