# Image Classifier NodeJS Package

![](https://img.shields.io/npm/dw/image-classifier?color=16697A&style=for-the-badge)
![](https://img.shields.io/npm/v/image-classifier?color=DB6400&style=for-the-badge)
![](https://img.shields.io/github/license/swimauger/image-classifier?color=FFA62B&style=for-the-badge)

Machine Learning Image Classifier for NodeJS

## **Installation**

`npm install image-classifier`

<br>

## **Getting Started**
```javascript
    // CommonJS
    const ImageClassifier = require('image-classifier');

    // Or ES Modules
    import ImageClassifier from "image-classifier/lib/ImageClassifier";
```

<br>

## **Creating an instance of ImageClassifier**

### ImageClassifier.create()
#### Create a new instance of `ImageClassifier` from scratch
<br>
<details open>
<summary>Example:</summary>

```javascript
const classifier = await ImageClassifier.create()
```
</details>

#

### ImageClassifier.load(datasetPath: string)
#### Create a new instance of `ImageClassifier` from a dataset
<br>
<table>
    <thead>
        <th>Parameter</th>
        <th>Description</th>
        <th>Type</th>
        <th>Memory</th>
    </thead>
    <tbody>
        <tr>
            <td>datasetPath</td>
            <td>Path to load the dataset</td>
            <td>String</td>
            <td>True</td>
        </tr>
    </tbody>
</table>
<details open>
<summary>Example:</summary>

```javascript
const classifier = await ImageClassifier.load('./dataset.json');
```
</details>
<br>

## **ImageClassifier**

### ImageClassifier.prototype.save(datasetDestination: string)
#### Save the ImageClassifier's dataset to a json file
<br>
<table>
    <thead>
        <th>Parameter</th>
        <th>Description</th>
        <th>Type</th>
        <th>Memory</th>
    </thead>
    <tbody>
        <tr>
            <td>datasetPath</td>
            <td>Path to save the dataset</td>
            <td>String</td>
            <td>True</td>
        </tr>
    </tbody>
</table>
<br>
<details open>
<summary>Example:</summary>

```javascript
const classifier = await ImageClassifier.save('./carset.json');
```
</details>

#

### ImageClassifier.prototype.addExample(label: string, image: string | Buffer)
#### Add an example image and label it to train the ImageClassifier
<br>
<table>
    <thead>
        <th>Parameter</th>
        <th>Description</th>
        <th>Type</th>
        <th>Memory</th>
    </thead>
    <tbody>
        <tr>
            <td>label</td>
            <td>Category label for what the image is</td>
            <td>String</td>
            <td>True</td>
        </tr>
        <tr>
            <td>image</td>
            <td>Path to image or raw image data to add as an example for the label</td>
            <td>String</td>
            <td>True</td>
        </tr>
    </tbody>
</table>
<br>
<details open>
<summary>Example:</summary>

```javascript
// Add Toyota Examples from path
await classifier.addExample('Toyota', './toyota0.png');
await classifier.addExample('Toyota', './toyota1.png');
await classifier.addExample('Toyota', './toyota2.png');

// Add Toyota Example from raw image
const toyotaRawImage = fs.readFileSync('./toyota3.png');
await classifier.addExample('Toyota', toyotaRawImage);
/* ...Add more examples */

// Add Honda Examples
await classifier.addExample('Honda', './honda0.png');
await classifier.addExample('Honda', './honda1.png');
await classifier.addExample('Honda', './honda2.png');

// Add Honda Example from raw image
const hondaRawImage = await fs.promises.readFile('./honda3.png');
await classifier.addExample('Honda', hondaRawImage);
/* ...Add more examples */
```
</details>

#

### ImageClassifier.prototype.dropClassifier(label: string)
#### Drop all classification for the specified label
<br>
<table>
    <thead>
        <th>Parameter</th>
        <th>Description</th>
        <th>Type</th>
        <th>Memory</th>
    </thead>
    <tbody>
        <tr>
            <td>label</td>
            <td>
                Label for classifier you would like to remove from ImageClassifier.
                Drops all examples of specified label.
            </td>
            <td>String</td>
            <td>True</td>
        </tr>
    </tbody>
</table>
<br>
<details open>
<summary>Example:</summary>

```javascript
classifier.dropClassifier('Honda');
```
</details>

#

### ImageClassifier.prototype.predict(image: string | Buffer)
#### Predict the label for an image
<br>
<table>
    <thead>
        <th>Parameter</th>
        <th>Description</th>
        <th>Type</th>
        <th>Memory</th>
    </thead>
    <tbody>
        <tr>
            <td>image</td>
            <td>Path to image or raw image data for evaluating a prediction with your ImageClassifier</td>
            <td>String</td>
            <td>True</td>
        </tr>
    </tbody>
</table>
<br>
<details open>
<summary>Example:</summary>

```javascript
// Predict by image path
const prediction1 = await classifier.predict('./toyotaTest0.png');

// Predict by raw image
const toyotaTestRawImage = fs.readFileSync('./toyotaTest1.png');
const prediction2 = await classifier.predict('./toyotaTest1.png');
```
</details>

<details open>
<summary>Prediction:</summary>

```json
{
    "classIndex": "<Index of Label>",
    "label": "<Label>",
    "confidences": {
        "Toyota": "<Percentile>",
        "Honda": "<Percentile>"
    }
}
```
</details>

