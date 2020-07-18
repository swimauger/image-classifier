const fs = require('fs');
const path = require('path');

const ImageClassifier = require('../ImageClassifier');
const TestClassifier = new ImageClassifier(path.resolve(__dirname, 'dataset.json'), false);

TestClassifier.load().then(beginTests);

async function beginTests() {

    console.log('\nAdd Examples :', await addExamples());

    console.log('\nSave Dataset :', await saveDataset());

    console.log('\nLoad Dataset :', await loadDataset());
    
    console.log('\nPredict Dog :', await predictDog());
    
    console.log('\nPredict Cat :', await predictCat());
  
}

async function addExamples() {
    console.log("TESTING: Add Examples");
    try {
        const dogs = fs.readdirSync(path.resolve(__dirname, 'data/dog')).map(file => path.resolve(__dirname, 'data/dog', file));
        for (let i = 0; i < dogs.length; i++) {
            console.log(`Adding example of Dog #${i+1} of ${dogs.length}`);
            await TestClassifier.addExample('Dog', dogs[i]);
        }
        

        const cats = fs.readdirSync(path.resolve(__dirname, 'data/cat')).map(file => path.resolve(__dirname, 'data/cat', file));
        for (let j = 0; j < cats.length; j++) {
            console.log(`Adding example of Cat #${j+1} of ${cats.length}`);
            await TestClassifier.addExample('Cat', cats[j]);
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function saveDataset() {
    console.log("TESTING: Saving Dataset");
    try {
        await TestClassifier.save();

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function loadDataset() {
    console.log("TESTING: Loading Dataset");
    try {
        await TestClassifier.load();

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function predictDog() {
    console.log("TESTING: Dog Predictions");
    try {
        const dogs = fs.readdirSync(path.resolve(__dirname, 'test/dog')).map(file => path.resolve(__dirname, 'test/dog', file));
        for (let i = 0; i < dogs.length; i++) {
            console.log(`Dog #${i+1} was predicted to be `, `'${JSON.stringify(await TestClassifier.predict(dogs[i]))}'`);
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}

async function predictCat() {
    console.log("TESTING: Cat Predictions");
    try {
        const cats = fs.readdirSync(path.resolve(__dirname, 'test/cat')).map(file => path.resolve(__dirname, 'test/cat', file));
        for (let i = 0; i < cats.length; i++) {
            console.log(`Cat #${i+1} was predicted to be `, `'${JSON.stringify(await TestClassifier.predict(cats[i]))}'`);
        }

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
