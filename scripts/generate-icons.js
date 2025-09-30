const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const sizes = [192, 512];
const iconsDir = path.join(__dirname, '../public/icons');

// Ensure icons directory exists
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

sizes.forEach(size => {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Background - blue
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(0, 0, size, size);

  // Draw a simple restaurant icon (plate with fork and knife)
  ctx.fillStyle = '#ffffff';

  // Plate (circle)
  const centerX = size / 2;
  const centerY = size / 2;
  const plateRadius = size * 0.3;

  ctx.beginPath();
  ctx.arc(centerX, centerY, plateRadius, 0, Math.PI * 2);
  ctx.fill();

  // Fork (left)
  const forkX = centerX - size * 0.15;
  const forkY = centerY - size * 0.25;
  const forkWidth = size * 0.04;
  const forkHeight = size * 0.4;

  ctx.fillRect(forkX - forkWidth/2, forkY, forkWidth, forkHeight);

  // Fork prongs
  for (let i = -1; i <= 1; i++) {
    ctx.fillRect(forkX + i * forkWidth, forkY, forkWidth * 0.4, forkHeight * 0.3);
  }

  // Knife (right)
  const knifeX = centerX + size * 0.15;
  const knifeY = centerY - size * 0.25;
  const knifeWidth = size * 0.04;
  const knifeHeight = size * 0.4;

  ctx.fillRect(knifeX - knifeWidth/2, knifeY, knifeWidth, knifeHeight);

  // Knife blade (triangle)
  ctx.beginPath();
  ctx.moveTo(knifeX, knifeY);
  ctx.lineTo(knifeX - knifeWidth, knifeY + knifeHeight * 0.3);
  ctx.lineTo(knifeX + knifeWidth, knifeY + knifeHeight * 0.3);
  ctx.closePath();
  ctx.fill();

  // Save to file
  const buffer = canvas.toBuffer('image/png');
  const filename = path.join(iconsDir, `icon-${size}.png`);
  fs.writeFileSync(filename, buffer);
  console.log(`✅ Generated: ${filename}`);
});

console.log('✅ All icons generated successfully!');