# params
folder_path = "C:/Users/might/Desktop/files/projects/python-model-maker/tabularData"
learning_rate = 0.01
validation_split = 0.1
epochs = 10
batch_size = 24
target = "Sex"
layers = [
    {"type": "dense", "nodes": 64, "activation": "relu"},
    {"type": "dropout", "rate": 0.2},
    {"type": "dense", "nodes": 64, "activation": "relu"},
    {"type": "dropout", "rate": 0.3},
    {"type": "dense", "nodes": 64, "activation": "relu"},
]

sample = {
    "Survived": 1,
    "Pclass": 3,
    # "Sex": "male",
    "Age": 22,
    "SibSp": 1,
    "Parch": 0,
    "Fare": 7.25,
    "Embarked": "S",
}

import pandas as pd
import numpy as np
import json
import tensorflow as tf

from utils.create_dataset import prepare_data
from utils.create_dataset import create_train_val_test
from utils.create_dataset import get_categorical_and_numeric_cols

from utils.create_model import create_model

from utils.train_model import train_model


info = json.load(open(folder_path + "/info.json"))
dataframe = pd.read_csv(folder_path + "/data.csv")

train_ds, val_ds, test_ds = create_train_val_test(dataframe, batch_size, target, info)

categorical_cols, numeric_cols = get_categorical_and_numeric_cols(info, target)

all_inputs, encoded_features = prepare_data(categorical_cols, numeric_cols, train_ds)

model = create_model(all_inputs, encoded_features, layers, info, target, learning_rate)

model.fit(train_ds, epochs=epochs, validation_data=val_ds)

loss, accuracy = model.evaluate(test_ds)
print("Accuracy", accuracy)

input_dict = {name: tf.convert_to_tensor([value]) for name, value in sample.items()}
predictions = model.predict(input_dict)
print(predictions)
