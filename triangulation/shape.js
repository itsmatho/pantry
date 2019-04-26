function draw() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let size = 1024;
  let width = canvas.width = size;
  let height = canvas.height = size;

  // Places the center of triangle at x, y
  let drawTriangle = (t, x, y, fill=false, color='#000000') => {
    let A = t[0];
    let B = t[1];
    let C = t[2];

    let D = 2 * (A.x * (B.y - C.y) + B.x * (C.y - A.y) + C.x * (A.y - B.y));
    let center = {
      x: ((A.x**2 + A.y**2) * (B.y - C.y) + (B.x**2 + B.y**2) * (C.y - A.y) + (C.x**2 + C.y**2) * (A.y - B.y)) / D,
      y: ((A.x**2 + A.y**2) * (C.x - B.x) + (B.x**2 + B.y**2) * (A.x - C.x) + (C.x**2 + C.y**2) * (B.x - A.x)) / D
    };

    ctx.beginPath();
    ctx.moveTo(A.x - center.x + x, A.y - center.y + y);
    ctx.lineTo(B.x - center.x + x, B.y - center.y + y);
    ctx.lineTo(C.x - center.x + x, C.y - center.y + y);

    if (fill) {
      ctx.fillStyle = color;
      ctx.fill();
    } else {
      ctx.strokeStyle = color;
      ctx.closePath();
      ctx.stroke();
    }
  };

  // Background
  let bgColor = '#efe8c2';

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Inner
  let innerColor = '#fffaef';
  let proportion = 0.8;
  let innerWidth = width * proportion;
  let innerHeight = height * proportion;
  let innerX = (width - innerWidth) / 2;
  let innerY = (height - innerHeight) / 2;

  ctx.fillStyle = innerColor;
  ctx.fillRect(innerX, innerY, innerWidth, innerHeight);

  let generateEquilateralTriangle = (radius, rotation=0) => {
    let side = radius * Math.sqrt(3)
    let triangle = [
      {x: 0, y: 0},
      {x: side, y: 0},
      {x: 0.5 * side, y: 0.5 * side * Math.sqrt(3)}
    ];

    let s = Math.sin(rotation);
    let c = Math.cos(rotation);
    for (let i = 1; i < triangle.length; i++) {
      triangle[i] = {
        x: triangle[i].x * c - triangle[i].y * s,
        y: triangle[i].x * s + triangle[i].y * c
      };
    }

    return triangle;
  }

  let triangleRadius = innerWidth * 0.8 / 2;

  ctx.save();
  // Triangle 1
  let triangle1 = generateEquilateralTriangle(triangleRadius);
  let lineWidth = innerWidth * 0.01;
  ctx.lineWidth = lineWidth;
  drawTriangle(triangle1, width/2, height/2);
  ctx.restore();

  // Triangle 2
  let triangle2Color = '#213e82';
  let triangle2Radius = triangleRadius * 1.25;
  let triangle2 = generateEquilateralTriangle(triangle2Radius, Math.PI);
  let offset = innerWidth * 0.02;
  drawTriangle(triangle2, width/2, height/2 + offset, true, triangle2Color);
  let borderWidth = lineWidth * 0.75;
  ctx.save();
  ctx.lineWidth = borderWidth;
  drawTriangle(triangle2, width/2, height/2 + offset, false, innerColor);
  ctx.restore();

  let numTriangles = 15;
  for (let i = 0; i < numTriangles; i++) {
    let triangle = generateEquilateralTriangle(triangle2Radius * 0.5**(i+1), 2 * Math.PI * (i + 1) / numTriangles + Math.PI);
    ctx.globalCompositeOperation = 'multiply';
    drawTriangle(triangle, width/2, height/2 + offset, true, triangle2Color);
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineWidth = Math.max(1, borderWidth * 0.75**(i + 1));
    drawTriangle(triangle, width/2, height/2 + offset, false, innerColor);
  }
}
