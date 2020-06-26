const tf = require('@tensorflow/tfjs');

class Dataset {
    static parse(data) {
        data = JSON.parse(data);
        const dataset = {};
        for (const example of data) {
            dataset[example.label] = tf.tensor(example.values, example.label);
        }
        return dataset;
    }

    static async stringify(dataset) {
        const data = [];
        for (const label in dataset) {
            data.push({
                label, 
                values: Array.from(await dataset[label].data()), 
                shape: dataset[label].shape
            });
        }
        return JSON.stringify(data);
    }
}

module.exports = Dataset;