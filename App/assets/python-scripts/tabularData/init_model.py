import argparse
import json

import pandas as pd
import numpy as np
import tensorflow as tf
import os

from utils.create_dataset import prepare_data
from utils.create_dataset import create_train_val_test
from utils.create_dataset import get_categorical_binary_and_numeric_cols

from utils.create_model import create_model

from utils.train_model import train_model

parser = argparse.ArgumentParser()

# positional arguments
parser.add_argument("folder_path", type=str)
parser.add_argument("save_model_path", type=str)
parser.add_argument("learning_rate", type=float)
parser.add_argument("epochs", type=int)
parser.add_argument("batch_size", type=int)
parser.add_argument("target", type=str)
parser.add_argument("validation_split", type=float)
parser.add_argument("test_split", type=float)
parser.add_argument("layers", nargs="+", type=json.loads)

# Parse the command-line arguments
args = parser.parse_args()


# Access the parsed arguments

folder_path = args.folder_path
save_model_path = args.save_model_path
learning_rate = args.learning_rate
validation_split = args.validation_split
epochs = args.epochs
batch_size = args.batch_size
target = args.target
validation_split = args.validation_split
test_split = args.test_split
train_split = 1 - validation_split - test_split
layers = args.layers

# sample = {
#     "Survived": 1,
#     "Pclass": 3,
#     # "Sex": "male",
#     "Age": 22,
#     "SibSp": 1,
#     "Parch": 0,
#     "Fare": 7.25,
#     "Embarked": "S",
# }


#info = json.load(open(folder_path + "/info.json"))
info = json.load(open(folder_path + "/info.json", encoding='utf-8'))

dataframe = pd.read_csv(folder_path + "/data.csv")

train_ds, val_ds, test_ds = create_train_val_test(
    dataframe, batch_size, target, info, train_split, validation_split
)

categorical_cols, numeric_cols, binary_cols = get_categorical_binary_and_numeric_cols(
    info, target
)

all_inputs, encoded_features = prepare_data(
    categorical_cols, numeric_cols, binary_cols, train_ds
)

model = create_model(all_inputs, encoded_features, layers, info, target, learning_rate)

model.save(save_model_path)

# checkpoint_path = "training_1/cp.ckpt"
# checkpoint_dir = os.path.dirname(checkpoint_path)

# # Create a callback that saves the model's weights
# cp_callback = tf.keras.callbacks.ModelCheckpoint(
#     filepath=checkpoint_path, save_weights_only=True, verbose=1
# )

# model.fit(train_ds, epochs=epochs, validation_data=val_ds)

# loss, accuracy = model.evaluate(test_ds)
# print("Accuracy", accuracy)

# input_dict = {name: tf.convert_to_tensor([value]) for name, value in sample.items()}
# predictions = model.predict(input_dict)
# print(predictions)
