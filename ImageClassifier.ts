import * as fsp from "fs/promises";

import * as mobilenet from "@tensorflow-models/mobilenet";
import * as knnClassifier from "@tensorflow-models/knn-classifier";
import Tensorset from "tensorset/lib/Tensorset";
import * as tf from "@tensorflow/tfjs-node";

class ImageClassifier {
    static default = ImageClassifier;

    static async create() {
        try {
            const classifier = knnClassifier.create();
            return new ImageClassifier(await mobilenet.load(), classifier);
        } catch (error) {
            // ERROR: Mobilenet fails to load
            throw error;
        }
    }

    static async load(datasetPath: string) {
        try {
            const classifier = knnClassifier.create();

            const dataset = await fsp.readFile(datasetPath, { encoding: 'utf-8' });
            const tensorset = await Tensorset.parse(dataset);
            classifier.setClassifierDataset(tensorset);

            return new ImageClassifier(await mobilenet.load(), classifier);
        } catch (error) {
            // ERROR (Option 1): Attempts to load an invalid dataset
            // ERROR (Option 2): Mobilenet fails to load
            throw error;
        }
    }
    
    private mobilenet: mobilenet.MobileNet;
    private classifier: knnClassifier.KNNClassifier;

    private constructor(mobilenet: mobilenet.MobileNet, classifier: knnClassifier.KNNClassifier) {
        this.mobilenet = mobilenet;
        this.classifier = classifier;
    }

    async save(datasetDestination: string) {
        try {
            const dataset = this.classifier.getClassifierDataset();
            const data = await Tensorset.stringify(dataset);
            await fsp.writeFile(datasetDestination, data);
        } catch (error) {
            // ERROR (Option 1): Destination path is not specified and there is no default path
            // ERROR (Option 2): File could not be written
            throw error;
        }
    }

    async addExample(label: string, image: string | Buffer) {
        try {
            const imageData = image instanceof Buffer ? image : await fsp.readFile(image);
            const tensor = this.mobilenet.infer(tf.node.decodeImage(new Uint8Array(imageData), 3), true);
            this.classifier.addExample(tensor, label);
        } catch (error) {
            // ERROR (Option 1): Failed to read file
            // ERROR (Option 2): File was not a proper image
            throw error;
        }
    }

    dropClassifier(label: string) {
        this.classifier.clearClass(label);
    }

    async predict(image: string | Buffer) {
        try {
            const imageData = image instanceof Buffer ? image : await fsp.readFile(image);
            const tensor = this.mobilenet.infer(tf.node.decodeImage(new Uint8Array(imageData), 3), true);
            return this.classifier.predictClass(tensor);
        } catch (error) {
            // ERROR (Option 1): Failed to read file
            // ERROR (Option 2): File was not a proper image
            throw error;
        }
    }
}

export = ImageClassifier;
