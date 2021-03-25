import ImageClassifier from "../ImageClassifier";
import * as path from "path";

const DATASET_PATH = path.resolve(__dirname, './dataset.json');
const DATASET_PATH2 = path.resolve(__dirname, './dataset.2.json');

describe('image-classifier library tests', () => {
  test('image-classifier create classifier', async () => {
    const classifier = await ImageClassifier.create();
    expect(classifier).toBeInstanceOf(ImageClassifier);
  });

  test('image-classifier load classifier', async () => {
    const classifier = await ImageClassifier.load(DATASET_PATH);
    expect(classifier).toBeInstanceOf(ImageClassifier);
  });

  test('image-classifier add example and save', async () => {
    const classifier = await ImageClassifier.load(DATASET_PATH);
    expect(await classifier.addExample('Dog', path.resolve(__dirname, './data/dog.test/dog.0.jpeg'))).toReturn();
    expect(await classifier.save(DATASET_PATH2)).toReturn();
  });

  test('image-classifier drop classifier and predict', async () => {
    const classifier = await ImageClassifier.load(DATASET_PATH);
    classifier.dropClassifier('Dog');

    const prediction = await classifier.predict(path.resolve(__dirname, './data/dog.test/dog.0.jpeg'));
    expect(prediction.label).toBe('Cat');
  });
});
