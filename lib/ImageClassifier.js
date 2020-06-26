const fs = require('fs');

const tf = require('@tensorflow/tfjs');
const mobilenet = require('@tensorflow-models/mobilenet');
const knnClassifier = require('@tensorflow-models/knn-classifier');

const Dataset = require('./Dataset');
const parseCanvas = require('./parseCanvas');

class ImageClassifier {
    constructor(dataset, autosave=true) {
        this.autosave = autosave;
        this.dataset = dataset;
        this.events = {};
        this.classifier = knnClassifier.create();
    }

    async load() {
        try {
            this.mobilenet = await mobilenet.load();
            if (fs.existsSync(this.dataset)) {
                const dataset = await Dataset.parse(this.dataset);
                this.classifier.setClassifierDataset(dataset);
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    save() {
        return new Promise(async (resolve, reject) => {
            const dataset = this.classifier.getClassifierDataset();
            fs.writeFile(this.dataset, await Dataset.stringify(dataset), function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    async addExample(label, image) {
        try {
            const canvas = await parseCanvas(image);
            const img = tf.browser.fromPixels(canvas);
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
            const canvas = await parseCanvas(image);
            const img = tf.browser.fromPixels(canvas);
            const tensor = this.mobilenet.infer(img, 'conv_preds');
            return this.classifier.predictClass(tensor);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ImageClassifier;