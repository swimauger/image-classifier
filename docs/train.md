# train

| **WARNING**: STILL IN BETA v1.0.0 |
| :-------------------------------- |

## Save
Save a dataset

`train -s <someurl|somefile> <title.json>`

## Export
Export a dataset

`train -e <somedataset.json> <newlocation.json>`

## Delete
Delete a dataset in your saved datasets

`train -d <somedataset.json>`

## List
List all saved datasets

`train -l`

## Identify
Identify an image with a saved dataset

`train -i <someimage.png> <somedataset.json>`

## Help
Help menu will be brought up if none of the above flags are included
```
    Usage: train [options] <values>
            
    Options:
        -s, --save     : Save a dataset
        -e, --export   : Export a dataset
        -d, --delete   : Delete a dataset
        -l, --list     : List all saved datasets
        -i, --identify : Identify an image with a dataset
        -h, --help     : Open help menu
    
    Examples:
        train -s https://dataset.example.com/dataset.json example-dataset.json
        train -e example-dataset.json ./testing/new-example-dataset.json
        train -i cat.png example-dataset.json
        train -d example-dataset.json

```
