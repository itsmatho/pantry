function draw() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  let size = 1024;
  let width = canvas.width = size;
  let height = canvas.height = size;

  // Background
  let bgColor = '#f2eadc';

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  // Stripes
  let drawStripe = (start, width, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(0, start - width/2);
    ctx.lineTo(start - width/2, 0);
    ctx.lineTo(start + width/2, 0);
    ctx.lineTo(0, start + width/2);
    ctx.fill();
  };

  let stripeColors = ['#ad4834', '#5774aa'];
  let numStripes = 11;
  let stripeSpace = size * 2 / numStripes; 
  let stripeWidth = stripeSpace * 0.8;
  let colorNum = 0;
  for (let i = 0; i < numStripes; i++) {
    let stripeStart = stripeSpace/2 + i * stripeSpace;
    drawStripe(stripeStart, stripeWidth, stripeColors[colorNum % stripeColors.length]);
    colorNum++;
  }

  // Inner
  const innerCanvas = document.createElement('canvas');
  const innerCtx = innerCanvas.getContext('2d');
  innerCanvas.width = size;
  innerCanvas.height = size;

  let innerColor = '#242538';
  let proportion = 0.8;
  let innerWidth = width * proportion;
  let innerHeight = height * proportion;
  let inner = {
    x: (width - innerWidth) / 2,
    y: (height - innerHeight) / 2
  };

  innerCtx.fillStyle = innerColor;
  innerCtx.fillRect(inner.x, inner.y, innerWidth, innerHeight);

  // Inner border
  let innerBorderWidth = (stripeSpace - stripeWidth) * Math.sin(Math.PI/4);
  let innerBorderColor = bgColor;

  innerCtx.lineWidth = innerBorderWidth;
  innerCtx.strokeStyle = innerBorderColor;
  innerCtx.beginPath();
  innerCtx.rect(inner.x, inner.y, innerWidth, innerHeight);
  innerCtx.stroke();

  // Text
  let text = 'STRIPES';
  innerCtx.fillStyle = bgColor;
  innerCtx.textAlign = 'center';
  innerCtx.textBaseline = 'middle';
  innerCtx.font = innerHeight * 0.2 + 'px Playfair Display';
  innerCtx.save();
  innerCtx.globalCompositeOperation = 'xor';
  innerCtx.fillText(text, width/2, height/2);
  innerCtx.restore();

  ctx.drawImage(innerCanvas, 0, 0, width, height);
}
