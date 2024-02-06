import tensorflow as tf
import argparse
import json
import pandas as pd
from utils.create_dataset import create_train_val_test
import sys


class CustomCallback(tf.keras.callbacks.Callback):
    def __init__(self, validation_data, test_data):
        super(CustomCallback, self).__init__()
        self.validation_data = validation_data
        self.test_data = test_data

    def on_epoch_end(self, epoch, logs=None):
        train_loss = logs.get("loss")
        train_accuracy = logs.get("accuracy")
        val_loss, val_accuracy = self.model.evaluate(self.validation_data, verbose=0)
        test_loss, test_accuracy = self.model.evaluate(self.test_data, verbose=0)

        results = {
            "epoch": epoch + 1,
            "train_loss": float(train_loss),
            "train_accuracy": float(train_accuracy),
            "val_loss": float(val_loss),
            "val_accuracy": float(val_accuracy),
            "test_loss": float(test_loss),
            "test_accuracy": float(test_accuracy),
        }

        # Send results to Node.js and request input
        print(json.dumps(results))
        sys.stdout.flush()


parser = argparse.ArgumentParser()

parser.add_argument("folder_path", type=str)
parser.add_argument("model_path", type=str)
parser.add_argument("learning_rate", type=float)
parser.add_argument("epochs", type=int)
parser.add_argument("initial_epochs", type=int)
parser.add_argument("batch_size", type=int)
parser.add_argument("target", type=str)
parser.add_argument("validation_split", type=str)
parser.add_argument("test_split", type=str)

args = parser.parse_args()

folder_path = args.folder_path
model_path = args.model_path
learning_rate = args.learning_rate
epochs = args.epochs
initial_epochs = args.initial_epochs
batch_size = args.batch_size
target = args.target
validation_split = args.validation_split
test_split = args.test_split

model = tf.keras.models.load_model(model_path)
model.optimizer.learning_rate = learning_rate

info = json.load(open(folder_path + "/info.json"))
dataframe = pd.read_csv(folder_path + "/data.csv")

train_ds, val_ds, test_ds = create_train_val_test(dataframe, batch_size, target, info)

custom_callback = CustomCallback(val_ds, test_ds)
model.fit(
    train_ds,
    initial_epoch=initial_epochs,
    epochs=epochs,
    validation_data=val_ds,
    callbacks=[custom_callback],
)
