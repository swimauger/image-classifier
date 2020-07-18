#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const download = require('download');
const { URL } = require('url');
const { version, author } = require('./package.json');

console.log(`Running BETA version ${version} of train by ${author}`);
function __dataset(file='') {
    return path.resolve(__dirname, 'datasets', file);
}

function __user(file='') {
    return path.resolve(process.cwd(), file);
}

class Train {
    static async save([source, dataset]) {
        try {
            if (!fs.existsSync(__dataset())) fs.mkdirSync(__dataset());
            const url = new URL(source);
            fs.writeFileSync(__dataset(dataset), await download(url));
        } catch (error) {
            try {
                fs.copyFileSync(__user(source), __dataset(dataset));
            } catch (error) {
                console.error(error);
            }
        }
    }

    static async export([dataset, target]) {
        try {
            if (!fs.existsSync(__dataset())) fs.mkdirSync(__dataset());
            const url = new URL(dataset);
            fs.writeFileSync(__user(target), await download(url));
        } catch (error) {
            fs.copyFileSync(__dataset(dataset), __user(target));
        }
    }

    static delete([dataset]) {
        try {
            fs.unlinkSync(__dataset(dataset));
        } catch (error) {
            console.log(`${dataset} does not exist in your saved datasets`);
        }
    }

    static list() {
        try {
            for (const file of fs.readdirSync(__dataset())) {
                console.log(file);
            }
        } catch (error) {
            console.log('You have no datasets saved');
        }
    }

    static async identify([image, dataset]) {
        const ImageClassifier = require('./ImageClassifier');
        const Identifier = new ImageClassifier(dataset, false);
        console.log(await Identifier.predict(image));
    }

    static help() {
        console.log(`
            Usage: train [options] <values>
            
            Options:
                -s, --save     : Save a dataset
                -e, --export   : Export a dataset
                -d, --delete   : Delete a dataset
                -l, --list     : List all saved datasets
                -i, --identify : Identify an image with a dataset

            Examples:
                train -s https://dataset.example.com/dataset.json example-dataset.json
                train -e example-dataset.json ./testing/new-example-dataset.json
                train -i cat.png example-dataset.json
                train -d example-dataset.json
        `);
    }
}

switch(process.argv[2]) {
    case '-s' || '--save':
        process.argv.splice(0, 3);
        Train.save(process.argv)
        break;
    case '-e' || '--export':
        process.argv.splice(0, 3);
        Train.export(process.argv);
        break;
    case '-d' || '--delete':
        process.argv.splice(0, 3);
        Train.delete(process.argv);
        break;
    case '-l' || '--list':
        Train.list();
        break;
    case '-i' || '--identify':
        process.argv.splice(0, 3);
        Train.identify(process.argv);
        break;
    default:
        Train.help();
        break;
}
