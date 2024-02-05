import tensorflow as tf
import argparse

parser = argparse.ArgumentParser()

parser.add_argument("model_path", type=str)
args = parser.parse_args()
model_path = args.model_path

model = tf.keras.models.load_model(model_path)

print(model.to_json())
