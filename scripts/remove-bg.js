const sharp = require('sharp');
const path = require('path');

async function removeWhiteBackground() {
  const inputPath = path.join(__dirname, '../public/logo.png');
  const outputPath = path.join(__dirname, '../public/logo-transparent.png');

  try {
    // Read the image and get raw pixel data
    const image = sharp(inputPath);
    const { data, info } = await image
      .raw()
      .ensureAlpha()
      .toBuffer({ resolveWithObject: true });

    // Process each pixel - make white/near-white pixels transparent
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // If pixel is white or near-white, make it transparent
      if (r > 240 && g > 240 && b > 240) {
        data[i + 3] = 0; // Set alpha to 0 (transparent)
      }
    }

    // Save the modified image
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
      .png()
      .toFile(outputPath);

    console.log('Successfully created transparent logo at:', outputPath);
    
    // Also replace the original
    await sharp(data, {
      raw: {
        width: info.width,
        height: info.height,
        channels: 4
      }
    })
      .png()
      .toFile(inputPath);
      
    console.log('Original logo replaced with transparent version');
  } catch (error) {
    console.error('Error:', error);
  }
}

removeWhiteBackground();
