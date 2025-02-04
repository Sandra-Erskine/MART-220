let wingPositions = [];
let saucePositions = [];
let isDragging = false;
let selectedWingIndex = -1;  // Index of the wing being dragged

function setup() {
  createCanvas(400, 400);
  background(255);

  // Initial wing and sauce positions
  for (let i = 0; i < 6; i++) {
    wingPositions.push(createVector(random(100, 300), random(270, 320)));
    saucePositions.push(createVector(wingPositions[i].x + random(-10, 10), wingPositions[i].y + random(-10, 10)));
  }
}

function draw() {
  background(255);

  // Draw Title in the upper-left corner
  textSize(24);
  fill(0);
  text("Buffalo Wings My Love", 10, 30);
  
  // Draw Artist's Name in the lower-right corner
  textSize(16);
  fill(0);
  text("Sandra Erskine", width - 160, height - 20);

  // Draw the plate
  fill(200, 150, 100);  // Plate color
  noStroke();
  rect(100, 250, 200, 100);

  // Draw chicken wings and sauce
  for (let i = 0; i < wingPositions.length; i++) {
    // Draw the wing (bright orange)
    fill(255, 140, 0);  // Bright orange color
    noStroke();
    ellipse(wingPositions[i].x, wingPositions[i].y, 50, 30);  // The wing

    // Add small white rectangles to indicate the ends of the chicken wing
    fill(255);  // White color for the ends
    rect(wingPositions[i].x - 25, wingPositions[i].y - 5, 15, 10); // Left end
  }
}

function mousePressed() {
  // Check if a wing is clicked to start dragging
  for (let i = 0; i < wingPositions.length; i++) {
    let wing = wingPositions[i];
    // Check if mouse is close enough to the center of a wing (hitbox)
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
