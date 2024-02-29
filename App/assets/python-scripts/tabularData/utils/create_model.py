from tensorflow import keras


def create_model(all_inputs, encoded_features, layers, info, target, learning_rate):
    x = keras.layers.concatenate(encoded_features)

    for layer in layers:
        layer_type = layer["type"]
        if layer_type == "dense":
            x = keras.layers.Dense(layer["nodes"], activation=layer["activation"])(x)
        elif layer_type == "dropout":
            x = keras.layers.Dropout(float(layer["rate"]))(x, training=True)

    target_type = info["selectedTypes"][target]["type"]
    model = None

    # output and loss function based on target type
    if target_type == "categorical":
        output = keras.layers.Dense(
            len(info["selectedTypes"][target]["values"]) + 1, activation="softmax"
        )(x)
        model = keras.Model(all_inputs, output)
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=learning_rate),
            loss=keras.losses.CategoricalCrossentropy(from_logits=True),
            metrics=["accuracy"],
        )

    elif target_type == "numeric":
        output = keras.layers.Dense(1, activation="linear")(x)
        model = keras.Model(all_inputs, output)
        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=learning_rate),
            loss=keras.losses.MeanAbsoluteError(),
            metrics=["mae"],
        )

    elif target_type == "binary":
        output = keras.layers.Dense(1, activation="sigmoid")(x)
        model = keras.Model(all_inputs, output)

        model.compile(
            optimizer=keras.optimizers.Adam(learning_rate=learning_rate),
            loss=keras.losses.BinaryCrossentropy(from_logits=True),
            metrics=["accuracy"],
        )

    return model
