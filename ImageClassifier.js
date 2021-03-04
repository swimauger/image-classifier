const fs = require('fs').promises;
const fsSync = require('fs');

const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');
const { decodeImage } = require('@tensorflow/tfjs-node').node;
const Tensorset = require('tensorset');

class ImageClassifier {
    constructor(dataset, autosave=true) {
        this.autosave = autosave;
        this.dataset = dataset;
        this.classifier = knnClassifier.create();
    }

    async load() {
        try {
            this.mobilenet = await mobilenet.load();

            if (fsSync.existsSync(this.dataset)) {
                try {
                    const data = await fs.readFile(this.dataset, { encoding: 'utf-8' });
                    const dataset = await Tensorset.parse(data);
                    this.classifier.setClassifierDataset(dataset);
                } catch (error) {
                    return;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async save() {
        try {
            const dataset = this.classifier.getClassifierDataset();
            const data = await Tensorset.stringify(dataset);
            await fs.writeFile(this.dataset, data);
        } catch (error) {
            throw error;
        }
    }

    async addExample(label, image) {
        try {
            const imgData = await fs.readFile(image);
            const img = decodeImage(imgData, 3);
            const tensor = this.mobilenet.infer(img, 'conv_preds');
            this.classifier.addExample(tensor, label);
            if (this.autosave) await this.save();
            return;
        } catch (error) {
            throw error;
        }
    }

    dropClassifier(label) {
        this.classifier.clearClass(label);
    }

    async predict(image) {
        try {
            const imgData = await fs.readFile(image);
            const img = decodeImage(imgData, 3);
            const tensor = this.mobilenet.infer(img, 'conv_preds');
            return this.classifier.predictClass(tensor);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ImageClassifier;