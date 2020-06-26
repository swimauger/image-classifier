# ImageClassifier

## Get Started
Create a new ImageClassifier with a dataset path for saving and loading your dataset. You can also specify to autosave to save every time you add a new example
```JavaScript
    const { ImageClassifier } = require('image-classifier');

    const MyClassifier = new ImageClassifier('./mynewdataset.json', true);
```

| Parameter |                       Description                       |  Type   | Mandatory |
| :-------: | :------------------------------------------------------ | :-----: | :-------: |
| dataset   | Path to dataset                                         | String  | True      |
| autosave  | Autosave dataset after adding a example (default: True) | Boolean | False     |

<hr>

## Load (Async)
Load should always be called before any further implementation. Will attempt to load dataset if the dataset path already exists
```JavaScript
    MyClassifier.load().then(async function() {
        /* Add Examples here */
    });
```

<hr>

## Add Example (Async)
Add example data for training a new model
```JavaScript
    // Add Toyota Exampless
    await MyClassifier.addExample('Toyota', './toyota0.png');
    await MyClassifier.addExample('Toyota', './toyota0.png');
    await MyClassifier.addExample('Toyota', './toyota0.png');
    /* ...Add more examples */

    // Add Honda Examples
    await MyClassifier.addExample('Honda', './honda0.png');
    await MyClassifier.addExample('Honda', './honda1.png');
    await MyClassifier.addExample('Honda', './honda2.png');
    /* ...Add more examples */
```

| Parameter |                       Description                       |  Type   | Mandatory |
| :-------: | :------------------------------------------------------ | :-----: | :-------: |
| label     | Category label for what the image is                    | String  | True      |
| image     | Path to image to add as an example for label            | String  | True      |

<hr>

## Predict (Async)
Get a classification prediction of image passed in
```JavaScript
    const prediction = await MyClassifier.predict('./toyotaTest0.png');
    /* Prediction 
        {
            "classIndex": <Index of Label>,
            "label": <Label>,
            "confidences": {
                "Toyota": <Percentile>,
                "Honda": <Percentile>
            }
        }
    */
```
| Parameter |                             Description                             |  Type   | Mandatory |
| :-------: | :------------------------------------------------------------------ | :-----: | :-------: |
| image     | Path to image for evaluating a prediction with your ImageClassifier | String  | True      |

<hr>

## Drop Classifier (Sync)
Remove all examples of specified label
```JavaScript
    MyClassifier.dropClassifier('Honda');
```
| Parameter |                                                 Description                                                |  Type   | Mandatory |
| :-------: | :--------------------------------------------------------------------------------------------------------- | :-----: | :-------: |
| label     | Label for classifier you would like to remove from ImageClassifier. Drops all examples of specified label. | String  | True      |

<hr>

## Save (Async)
Save dataset manually to dataset path passed from the constructor
```JavaScript
    await MyClassifier.save();
```