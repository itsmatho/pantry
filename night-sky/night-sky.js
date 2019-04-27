function draw() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let size = 1024;
  let width = canvas.width = size;
  let height = canvas.height = size;

  // Background
  let bgColor = '#001e49';

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Inner
  let innerColor = '#0e0028';
  let proportion = 0.8;
  let innerWidth = width * proportion;
  let innerHeight = height * proportion;
  let innerX = (width - innerWidth) / 2;
  let innerY = (height - innerHeight) / 2;

  ctx.fillStyle = innerColor;
  ctx.fillRect(innerX, innerY, innerWidth, innerHeight);

  let center = {
    x: width/2,
    y: height/2
  };

  let maxDist = innerWidth * 0.8 / 2; // max distance from center

  // Moon
  let moonMargin = (innerWidth - maxDist * 2) * 0.9;
  let moon = {
    x: innerX + innerWidth - moonMargin,
    y: innerY + moonMargin
  };
  let moonColor = '#78869e';
  let moonRadius = moonMargin * 0.5;

  ctx.save();
  ctx.shadowColor = '#9faec9';
  ctx.shadowBlur = moonRadius;
  ctx.beginPath();
  ctx.fillStyle = moonColor;
  ctx.arc(moon.x, moon.y, moonRadius, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.restore();

  // let moonspotColor = '#454b56';
  let moonspotColor = '#687282';
  let moonspotSize = moonRadius * 0.2;
  let minSpotSize = Math.max(Math.max(1, moonspotSize / 5), moonspotSize / 4);
  let drawMoonspot = (x, y) => {
    let radius = minSpotSize + Math.random() * (moonspotSize - minSpotSize);
    x += moon.x;
    y += moon.y;
    ctx.beginPath();
    ctx.fillStyle = moonspotColor;
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fill();
  }

  // Generate moonspots
  let numMoonspots = 15;
  for (let i = 0; i < numMoonspots; i++) {
    let startAngle = Math.PI / 4;
    let endAngle = -2 * Math.PI / 3;
    let angle = startAngle + (endAngle - startAngle) * Math.random();
    let u = Math.random() + Math.random();
    let r = (moonRadius * 0.9 - moonspotSize) * (u > 1 ? 2 - u : u);
    drawMoonspot(r * Math.cos(angle), r * Math.sin(angle));
  }

  // Stars
  let starColor = '#fff763';
  let lightColor = '#fffbbf';

  // Draw star relative to the center
  let drawStar = (x, y) => {
    // let radius = Math.random() >= 0.5 ? 2 : 1;
    let radius = parseInt(1 + Math.random() * 2.5);
    let color = Math.random() >= 0.5 ? starColor : lightColor;
    x += center.x;
    y += center.y;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2 * Math.PI, true);
    ctx.fill();
  };

  let numStars = 30;
  for (let i = 0; i < numStars; i++) {
    // Generate point within max dist
    let angle = 2 * Math.PI * Math.random();
    let u = Math.random() + Math.random();
    let r = maxDist * (u > 1 ? 2 - u : u);

    let x = r * Math.cos(angle);
    let y = r * Math.sin(angle);
    while (Math.sqrt((x + center.x - moon.x)**2 + (y + center.x - moon.y)**2) <= moonRadius * 2) {
      angle = 2 * Math.PI * Math.random();
      u = Math.random() + Math.random();
      r = maxDist * (u > 1 ? 2 - u : u);
      x = r * Math.cos(angle);
      y = r * Math.sin(angle);
    }

    drawStar(x, y);
  }
}
