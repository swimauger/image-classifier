const tf = require('@tensorflow/tfjs');

class Dataset {
    static parse(dataset) {
        dataset = require(dataset);
        const parsedData = [];
        for (const data of dataset) {
            parsedData.push(data[0], tf.tensor(data[1], data[2]));
        }
        return parsedData;
    }

    static stringify(dataset) {
        const data = [];
        for (const label in dataset) {
            data.push([label, Array.from(dataset[label].dataSync()), dataset[label].shape]);
        }
        return JSON.stringify(data);
    }
}

module.exports = Dataset;