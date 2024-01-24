def train_model(train_x, train_y, model, batch_size, epochs, validation_data):
    model.fit(
        train_x,
        train_y,
        batch_size=batch_size,
        epochs=epochs,
        validation_data=validation_data,
    )
    return model
