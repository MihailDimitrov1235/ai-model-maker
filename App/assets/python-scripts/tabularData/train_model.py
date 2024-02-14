import logging, os

logging.disable(logging.WARNING)
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"

import tensorflow as tf
import argparse
import json
import pandas as pd
from utils.create_dataset import create_train_val_test
import sys


class CustomCallback(tf.keras.callbacks.Callback):
    def __init__(self, validation_data, test_data, initial_epochs):
        super(CustomCallback, self).__init__()
        self.validation_data = validation_data
        self.test_data = test_data
        self.initial_epochs = initial_epochs

    def on_epoch_end(self, epoch, logs=None):

        train_loss = logs.get("loss")
        train_accuracy = logs.get("accuracy")
        val_loss = logs.get("val_loss")
        val_accuracy = logs.get("val_accuracy")
        test_loss, test_accuracy = self.model.evaluate(self.test_data, verbose=0)

        results = {
            "epoch": epoch + self.initial_epochs,
            "train_loss": float(train_loss),
            "train_accuracy": float(train_accuracy),
            "val_loss": float(val_loss),
            "val_accuracy": float(val_accuracy),
            "test_loss": float(test_loss),
            "test_accuracy": float(test_accuracy),
        }

        print(json.dumps(results))
        sys.stdout.flush()
        cancel = input()

        if cancel == "true":
            self.model.stop_training = True


parser = argparse.ArgumentParser()

parser.add_argument("folder_path", type=str)
parser.add_argument("model_path", type=str)
parser.add_argument("checkpoint_path", type=str)
parser.add_argument("learning_rate", type=float)
parser.add_argument("epochs", type=int)
parser.add_argument("initial_epochs", type=int)
parser.add_argument("batch_size", type=int)
parser.add_argument("target", type=str)
parser.add_argument("validation_split", type=float)
parser.add_argument("test_split", type=float)

args = parser.parse_args()

folder_path = args.folder_path
model_path = args.model_path
checkpoint_path = args.checkpoint_path
learning_rate = args.learning_rate
epochs = args.epochs
initial_epochs = args.initial_epochs
batch_size = args.batch_size
target = args.target
validation_split = args.validation_split
test_split = args.test_split
train_split = 1 - validation_split - test_split

model = tf.keras.models.load_model(model_path, safe_mode=False)
model.optimizer.learning_rate = learning_rate

info = json.load(open(folder_path + "/info.json"))
dataframe = pd.read_csv(folder_path + "/data.csv")

train_ds, val_ds, test_ds = create_train_val_test(
    dataframe,
    batch_size,
    target,
    info,
    train_split,
    validation_split,
)

custom_callback = CustomCallback(val_ds, test_ds, initial_epochs)

model_checkpoint_callback = tf.keras.callbacks.ModelCheckpoint(
    filepath=checkpoint_path,
    save_weights_only=True,
    monitor="val_loss",
    mode="min",
    save_best_only=True,
)

model.fit(
    train_ds,
    epochs=epochs,
    validation_data=val_ds,
    callbacks=[custom_callback, model_checkpoint_callback],
)
model.save(model_path)
