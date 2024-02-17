TF_ENABLE_ONEDNN_OPTS = 0
from tensorflow.keras.models import load_model
from tensorflow import convert_to_tensor
import argparse
import json


parser = argparse.ArgumentParser()

parser.add_argument("model_path", type=str)
parser.add_argument("checkpoint_path", type=str)

args = parser.parse_args()

model_path = args.model_path
checkpoint_path = args.checkpoint_path

model = load_model(model_path)
# model.load_weights(checkpoint_path)

print("model loaded")

inp = json.loads(input())
while inp != "cancel":
    print(inp)
    if inp["type"] == "test":
        converted_dict = {
            key: float(value) if value.replace(".", "", 1).isdigit() else value
            for key, value in inp["data"].items()
        }
        input_dict = {
            name: convert_to_tensor([value]) for name, value in converted_dict.items()
        }
        predictions = model.predict(input_dict)
        print(predictions)
    if inp["type"] == "download":
        print("download")
    inp = json.loads(input())
