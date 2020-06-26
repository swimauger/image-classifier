  
const { loadImage, createCanvas } = require('canvas');

async function parseCanvas(image) {
    try {
        const img = await loadImage(image);
        const canvas = createCanvas(img.width, img.height);
        canvas.getContext('2d').drawImage(image, 0, 0, img.width, img.height);
        return canvas;
    } catch (error) {
        throw error;
    }
}

module.exports = parseCanvas;