TF_ENABLE_ONEDNN_OPTS = 0
from tensorflow.keras.models import load_model
from tensorflow import convert_to_tensor
import argparse
import json
import sys
import numpy as np


parser = argparse.ArgumentParser()

parser.add_argument("model_path", type=str)
parser.add_argument("checkpoint_path", type=str)

args = parser.parse_args()

model_path = args.model_path
checkpoint_path = args.checkpoint_path

model = load_model(model_path, safe_mode=False)
# model.load_weights(checkpoint_path)

print("model loaded")
sys.stdout.flush()
inp = json.loads(input())
while inp != "cancel":
    if inp["type"] == "test":
        if inp["single"] == True:
            converted_dict = {
                key: (float(value) if value.replace(".", "", 1).isdigit() else value)
                for key, value in inp["data"].items()
            }
            input_dict = {
                name: convert_to_tensor([value])
                for name, value in converted_dict.items()
            }
            # print(json.dumps({"type": "debug", "predictions": input_dict.items()}))
            predictions = model.predict(input_dict, verbose=0)
            sys.stdout.flush()
        else:
            dicts = []
            for row in inp["data"]:
                row_dict = {}
                for i, header in enumerate(inp["headers"]):
                    row_dict[header] = row[i]
                dicts.append(row_dict)
            all_predictions = []

            for sample in dicts:
                converted_dict = {
                    key: (
                        float(value)
                        if isinstance(value, str)
                        and value.replace(".", "", 1).isdigit()
                        else value
                    )
                    for key, value in sample.items()
                }
                input_dict = {
                    name: convert_to_tensor([value])
                    for name, value in converted_dict.items()
                }
                prediction = model.predict(input_dict, verbose=0)
                print(
                    json.dumps(
                        {"type": "result-file", "predictions": prediction.tolist()}
                    )
                )
                sys.stdout.flush()
    if inp["type"] == "download":
        model.save(inp["path"])
    inp = json.loads(input())
