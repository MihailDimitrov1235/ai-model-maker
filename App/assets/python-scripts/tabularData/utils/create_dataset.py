import tensorflow as tf
from tensorflow import keras
from keras import layers
import numpy as np


def prepare_data(categorical_cols, numeric_cols, binary_cols, train_ds):
    all_inputs = []
    encoded_features = []

    for i in numeric_cols:
        header = i["name"]
        numeric_col = tf.keras.Input(shape=(1,), name=header)
        normalization_layer = get_normalization_layer(header, train_ds)
        encoded_numeric_col = normalization_layer(numeric_col)
        all_inputs.append(numeric_col)
        encoded_features.append(encoded_numeric_col)

    for i in categorical_cols:
        header = i["name"]
        dtype = "string"
        if i["numeric"]:
            dtype = "int64"
        categorical_col = tf.keras.Input(shape=(1,), name=header, dtype=dtype)
        encoding_layer = get_category_encoding_layer(
            name=header, dataset=train_ds, dtype=dtype, max_tokens=5
        )
        encoded_categorical_col = encoding_layer(categorical_col)
        all_inputs.append(categorical_col)
        encoded_features.append(encoded_categorical_col)

    for i in binary_cols:
        header = i["name"]
        if i["zero"] == "False" or i["zero"] == "True":
            binary_col = tf.keras.Input(shape=(1,), name=header, dtype="bool")

            def data_to_01(x):
                return tf.where(tf.equal(x, False), 0.0, 1.0)

            encoded_binary_col = layers.Lambda(data_to_01)(binary_col)

            all_inputs.append(binary_col)
            encoded_features.append(encoded_binary_col)
        else:
            dtype = "string"
            if i["numeric"]:
                dtype = "int64"
            binary_col = tf.keras.Input(shape=(1,), name=header, dtype=dtype)

            def data_to_01(x):
                return tf.where(tf.equal(x, i["zero"]), 0.0, 1.0)

            encoded_binary_col = layers.Lambda(data_to_01)(binary_col)

            all_inputs.append(binary_col)
            encoded_features.append(encoded_binary_col)

    return all_inputs, encoded_features


def get_categorical_binary_and_numeric_cols(info, target):
    categorical_cols = []
    numeric_cols = []
    binary_cols = []

    for column_name in info["header"]:
        if column_name == target:
            continue
        column = info["selectedTypes"][column_name]
        if column["type"] == "categorical":
            categorical_cols.append({"name": column_name, "numeric": column["numeric"]})
        elif column["type"] == "numeric":
            numeric_cols.append(
                {
                    "name": column_name,
                    "oneToZero": True,
                    "min": column["min"],
                    "max": column["max"],
                }
            )
        elif column["type"] == "binary":
            binary_cols.append(
                {
                    "name": column_name,
                    "zero": info["selectedTypes"][column_name]["values"][0],
                    "numeric": column["numeric"],
                }
            )
        # else:
        #     del data[column_name]
    return categorical_cols, numeric_cols, binary_cols


def create_train_val_test(dataframe, batch_size, target, info, train_split, val_split):
    train, val, test = np.split(
        dataframe.sample(frac=1),
        [
            int(train_split * len(dataframe)),
            int((train_split + val_split) * len(dataframe)),
        ],
    )

    train_ds = df_to_dataset(train, target, info, batch_size=batch_size)
    val_ds = df_to_dataset(val, target, info, shuffle=False, batch_size=batch_size)
    test_ds = df_to_dataset(test, target, info, shuffle=False, batch_size=batch_size)

    return train_ds, val_ds, test_ds


def get_normalization_layer(name, dataset):
    # Create a Normalization layer for the feature.
    normalizer = layers.Normalization(axis=None)

    feature_ds = dataset.map(lambda x, y: x[name])

    # Learn the statistics of the data.
    normalizer.adapt(feature_ds)

    return normalizer


def df_to_dataset(dataframe, target, info, shuffle=True, batch_size=32):
    df = dataframe.copy()
    labels = df.pop(target)

    if info["selectedTypes"][target]["type"] == "categorical":
        if info["selectedTypes"][target]["numeric"]:
            index = layers.IntegerLookup(
                vocabulary=info["selectedTypes"][target]["values"],
                output_mode="one_hot",
            )
        else:
            index = layers.StringLookup(
                vocabulary=info["selectedTypes"][target]["values"],
                output_mode="one_hot",
            )
        labels = index(labels)

    elif info["selectedTypes"][target]["type"] == "binary":
        index = binaryLayer(zero=info["selectedTypes"][target]["values"][0])
        labels = index(labels)

    df = {key: value.values[:, tf.newaxis] for key, value in dataframe.items()}
    ds = tf.data.Dataset.from_tensor_slices((dict(df), labels))
    if shuffle:
        ds = ds.shuffle(buffer_size=len(dataframe))
    ds = ds.batch(batch_size)
    ds = ds.prefetch(batch_size)
    return ds


def get_category_encoding_layer(name, dataset, dtype, max_tokens=None):
    # Create a layer that turns strings into integer indices.
    if dtype == "string":
        index = layers.StringLookup(max_tokens=max_tokens)
    # Otherwise, create a layer that turns integer values into integer indices.
    else:
        index = layers.IntegerLookup(max_tokens=max_tokens)

    feature_ds = dataset.map(lambda x, y: x[name])

    # Learn the set of possible values and assign them a fixed integer index.
    index.adapt(feature_ds)

    # Encode the integer indices.
    encoder = layers.CategoryEncoding(num_tokens=index.vocabulary_size())
    return lambda feature: encoder(index(feature))


class binaryLayer(tf.keras.layers.Layer):
    def __init__(self, zero, **kwargs):
        super(binaryLayer, self).__init__(**kwargs)
        self.zero = zero

    def call(self, inputs):
        return tf.where(inputs == self.zero, 0, 1)
