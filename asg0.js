// DrawTriangle.js (c) 2012 matsuda

/*

python3 -m http.server 

used for localhost testing

parts left: 8 9

*/

function main() {  
  // Retrieve <canvas> element
  var canvas = document.getElementById('example');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG
  var ctx = canvas.getContext('2d');

  // Clear canvas to black
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Initialize a vector v1 using the Vector3 class from cuon-matrix.js
  let v1 = new Vector3([1, 1, 0]);

  // Call drawVector(v1, "red") in main()
  drawVector(ctx, v1, "red");

  // Calls handleDrawEvent whenever clicked
  var drawBtn = document.getElementById('drawBtn');
  drawBtn.addEventListener('click', () => handleDrawEvent(ctx));

  // Calls handleDrawOperationEvent whenever the 2nd draw button is clicked
  var opDrawBtn = document.getElementById('opDrawBtn');
  opDrawBtn.addEventListener('click', () => handleDrawOperationEvent(ctx));
}

// Function called whenever the user clicks the draw button
function handleDrawEvent(ctx) {
  // Clear canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Read x & y coords to create v1
  const x = parseFloat(document.getElementById('x1').value);
  const y = parseFloat(document.getElementById('y1').value);

  // New Vector3 with the input coordinates
  let v1 = new Vector3([x, y, 0]);

  // Call drawVector
  drawVector(ctx, v1, "red");

  // Read X and Y from inputs to create v2
  const x2 = parseFloat(document.getElementById('x2').value);
  const y2 = parseFloat(document.getElementById('y2').value);
  let v2 = new Vector3([x2, y2, 0]);

  // Draw v2 in blue
  drawVector(ctx, v2, "blue");
}

// Function called when the user clicks the operation draw button
function handleDrawOperationEvent(ctx) {
  // Clear canvas
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Read input values for v1
  const x1 = parseFloat(document.getElementById('x1').value);
  const y1 = parseFloat(document.getElementById('y1').value);
  let v1 = new Vector3([x1, y1, 0]);
  drawVector(ctx, v1, "red");

  // Read input values for v2
  const x2 = parseFloat(document.getElementById('x2').value);
  const y2 = parseFloat(document.getElementById('y2').value);
  let v2 = new Vector3([x2, y2, 0]);
  drawVector(ctx, v2, "blue");

  // Read operation and scalar
  const operation = document.getElementById('operation').value;
  const s = parseFloat(document.getElementById('scalar').value);

  // Perform operation and draw resulting vectors
  if (operation === "add") {
    let v3 = v1.add(v2); // v1 + v2
    drawVector(ctx, v3, "green");

  } 
  else if (operation === "sub") {
    let v3 = v1.sub(v2); // v1 - v2
    drawVector(ctx, v3, "green");
    
  } 
  else if (operation === "mul") {
    let v3 = v1.mul(s); // v1 * scalar
    let v4 = v2.mul(s); // v2 * scalar
    drawVector(ctx, v3, "green");
    drawVector(ctx, v4, "green");

  } 
  else if (operation === "div") {
    let v3 = v1.mul(1 / s); // v1 / scalar
    let v4 = v2.mul(1 / s); // v2 / scalar
    drawVector(ctx, v3, "green");
    drawVector(ctx, v4, "green");

  } 
  else if (operation === "dot") {
    let dot = v1.dot(v2);
    console.log("Dot product:", dot);
    alert("Dot product: " + dot);

  } 
  else if (operation === "cross") {
    let v3 = v1.cross(v2);
    drawVector(ctx, v3, "green");

  } 
  else if (operation === "magnitude") {
    // Print magnitudes to console
    console.log("Magnitude v1: ", v1.magnitude());
    console.log("Magnitude v2: ", v2.magnitude());

  } 
  else if (operation === "normalize") {
    // Draw normalized vectors in green
    let v1Norm = v1.normalize();
    let v2Norm = v2.normalize();
    drawVector(ctx, v1Norm, "green");
    drawVector(ctx, v2Norm, "green");

  }
  else if (operation === "angle") {
    const angleRad = angleBetween(v1, v2);
    console.log("Angle: ", angleRad * 180 / Math.PI);

  }
  else if (operation === "area") {
    const area = areaTriangle(v1, v2);
    console.log("Area of triangle v1 and v2: ", area);
  }
}

// Compute the angle (in radians) between two Vector3 objects
function angleBetween(v1, v2) {
  // dot(v1, v2) = ||v1|| * ||v2|| * cos(alpha)
  const dot = v1.elements[0] * v2.elements[0] +
              v1.elements[1] * v2.elements[1] +
              v1.elements[2] * v2.elements[2];
  const mag1 = v1.magnitude();
  const mag2 = v2.magnitude();
  if (mag1 === 0 || mag2 === 0) return NaN;
  const cosAlpha = Math.max(-1, Math.min(1, dot / (mag1 * mag2)));
  return Math.acos(cosAlpha);
}

// Compute the area of the triangle by v1 and v2
function areaTriangle(v1, v2) {
  // Area = 0.5 * ||v1 x v2||
  const cross = new Vector3([
    v1.elements[1] * v2.elements[2] - v1.elements[2] * v2.elements[1],
    v1.elements[2] * v2.elements[0] - v1.elements[0] * v2.elements[2],
    v1.elements[0] * v2.elements[1] - v1.elements[1] * v2.elements[0]
  ]);
  const area = 0.5 * cross.magnitude();
  return area;
}

// Function drawVector(v, color) that takes a Vector3 v and a string color red
function drawVector(ctx, v, color) {
  // Scale your v1 coordinates by 20
  const scale = 20;
  const originX = 200;
  const originY = 200;

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(originX, originY);

  // Builtin javascript function lineTo() to draw the vector v1
  ctx.lineTo(
    originX + v.elements[0] * scale,
    originY - v.elements[1] * scale
  );
  ctx.stroke();
}