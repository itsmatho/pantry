function draw() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  const size = 1024;
  let width = canvas.width = size;
  let height = canvas.height = size;

  // Canvas for grid
  const gridCanvas = document.createElement('canvas');
  const gridCtx = gridCanvas.getContext('2d');
  gridCanvas.width = width;
  gridCanvas.height = height;

  // Colors
  let fgColor = '#fff';
  let palettes = [
    [
      '#aa8f66',
      '#ed9b40',
      '#ffeedb',
      '#61c9a8',
      '#ba3b46'
    ],
    [
      '#d81159',
      '#9c0d38',
      '#ce5374',
      '#dbbbf5',
      '#ddf0ff'
    ]
  ];
  let palette = palettes[Math.floor(Math.random() * palettes.length)];

  // Foreground
  gridCtx.fillStyle = fgColor;
  gridCtx.fillRect(0, 0, width, height);

  // Grid of circles
  let n = 3; // n x n
  let margin = size * 0.05;
  let innerSize = size - 2 * margin;
  let circleSize = innerSize / (n + 1) * 2 * 0.5 - 2;

  gridCtx.save();
  gridCtx.globalCompositeOperation = 'xor';
  let paletteIdx = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      let x = margin + (i + 1) * innerSize / (n + 1);
      let y = margin + (j + 1) * innerSize / (n + 1);
      let angleOffset = Math.random() * Math.PI * 2;
      let nextPaletteIdx = (paletteIdx + 1) % palette.length;
      ctx.fillStyle = palette[paletteIdx];
      ctx.beginPath();
      ctx.arc(x, y, circleSize/2 + 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = palette[nextPaletteIdx];
      ctx.beginPath();
      ctx.arc(x + Math.cos(angleOffset) * circleSize/2, y + Math.sin(angleOffset) * circleSize/2, circleSize/2, 0, Math.PI * 2);
      ctx.fill();
      gridCtx.beginPath();
      gridCtx.arc(x, y, circleSize/2, 0, Math.PI * 2);
      gridCtx.fill();
      paletteIdx = nextPaletteIdx;
    }
  }
  gridCtx.restore();

  ctx.drawImage(gridCanvas, 0, 0, width, height);

  // Draw title
  const titleCanvas = document.createElement('canvas');
  const titleCtx = titleCanvas.getContext('2d');
  titleCanvas.width = width;
  titleCanvas.height = height;

  let nFill = 17;
  let fillSize = innerSize / (nFill + 1) * Math.sqrt(2);
  for (let i = 0; i < nFill; i++) {
    for (let j = 0; j < nFill; j++) {
      let x = margin + (i + 1) * innerSize / (nFill + 1);
      let y = margin + (j + 1) * innerSize / (nFill + 1);
      let angleOffset = Math.random() * Math.PI * 2;
      let nextPaletteIdx = (paletteIdx + 1) % palette.length;
      titleCtx.fillStyle = palette[paletteIdx];
      titleCtx.beginPath();
      titleCtx.arc(x, y, fillSize/2 + 1, 0, Math.PI * 2);
      titleCtx.fill();
      paletteIdx = nextPaletteIdx;
    }
  }

  let fontSize = innerSize * 0.25;
  let title = 'Colorspaces'.toUpperCase();
  titleCtx.save();
  titleCtx.globalCompositeOperation = 'destination-atop';
  titleCtx.fillStyle = '#fff';
  titleCtx.textAlign = 'center';
  titleCtx.textBaseline = 'middle';
  titleCtx.font = fontSize/2 + 'px Arial';
  titleCtx.fillText(title, width/2, height/2);
  titleCtx.restore();

  ctx.drawImage(titleCanvas, 0, 0, width, height);
}
