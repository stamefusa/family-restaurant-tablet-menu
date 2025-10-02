const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

// Ensure images directory exists
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// Create placeholder image (600x400)
const width = 600;
const height = 400;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background - light gray
ctx.fillStyle = '#f3f4f6';
ctx.fillRect(0, 0, width, height);

// Border
ctx.strokeStyle = '#d1d5db';
ctx.lineWidth = 2;
ctx.strokeRect(1, 1, width - 2, height - 2);

// Center icon (fork and knife)
const centerX = width / 2;
const centerY = height / 2;

ctx.fillStyle = '#9ca3af';

// Fork (left)
const forkX = centerX - 40;
const forkY = centerY - 50;
ctx.fillRect(forkX - 3, forkY, 6, 100);
for (let i = -2; i <= 2; i++) {
  ctx.fillRect(forkX + i * 8 - 2, forkY, 4, 30);
}

// Knife (right)
const knifeX = centerX + 40;
const knifeY = centerY - 50;
ctx.fillRect(knifeX - 3, knifeY, 6, 100);
// Knife blade
ctx.beginPath();
ctx.moveTo(knifeX, knifeY);
ctx.lineTo(knifeX - 8, knifeY + 30);
ctx.lineTo(knifeX + 8, knifeY + 30);
ctx.closePath();
ctx.fill();

// Text
ctx.fillStyle = '#6b7280';
ctx.font = 'bold 24px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('画像準備中', centerX, centerY + 80);

// Save to file
const buffer = canvas.toBuffer('image/jpeg', { quality: 0.8 });
const filename = path.join(imagesDir, 'placeholder.jpg');
fs.writeFileSync(filename, buffer);
console.log(`✅ Generated: ${filename}`);
