import tensorflow as tf
from tensorflow import keras
(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

x_train = x_train / 255
x_test = x_test / 255

model = keras.Sequential([
    keras.layers.Conv2D(32, (3,3), 1, padding='same', activation='relu', input_shape=(28,28,1)),
    keras.layers.MaxPooling2D(2, 2),
    keras.layers.Conv2D(64, (3,3), 1, padding='same', activation='relu'),
    keras.layers.MaxPooling2D(2, 2),
    keras.layers.Flatten(),
    keras.layers.Dense(128, activation='relu'),
    keras.layers.Dense(10, activation='softmax')
])

model.compile(optimizer='adam', loss=keras.losses.SparseCategoricalCrossentropy(), metrics=['accuracy'])
model.fit(x_train, y_train, batch_size=64, epochs=10)
model.evaluate(x_test, y_test)

model.save('recognizer.keras')