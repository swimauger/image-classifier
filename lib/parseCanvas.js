  
const { loadImage, createCanvas } = require('canvas');

async function parseCanvas(imgPath) {
    try {
        const image = await loadImage(imgPath);
        const canvas = createCanvas(image.width, image.height);
        canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);
        return canvas;
    } catch (error) {
        throw error;
    }
}

module.exports = parseCanvas;