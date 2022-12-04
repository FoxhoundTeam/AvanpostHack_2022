import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from tensorflow.keras import optimizers
from tensorflow.keras.models import Model
import cv2

def build_model():
    x1 = layers.Input(shape = (160, 160, 1))
    x2 = layers.Input(shape = (160, 160, 1))

    # share weights both inputs
    inputs = layers.Input(shape = (160, 160, 1))
    feature = layers.Conv2D(32, kernel_size = 3, activation = 'relu')(inputs)
    feature = layers.MaxPooling2D(pool_size = 2)(feature)
    feature = layers.Conv2D(64, kernel_size = 3, activation = 'relu')(feature)
    feature = layers.MaxPooling2D(pool_size = 2)(feature)
    feature = layers.Conv2D(128, kernel_size = 3, activation = 'relu')(feature)
    feature = layers.MaxPooling2D(pool_size = 2)(feature)
    feature_model = Model(inputs = inputs, outputs = feature)

    # show feature model summary
    feature_model.summary()

    # two feature models that sharing weights
    x1_net = feature_model(x1)
    x2_net = feature_model(x2)

    # subtract features
    net = layers.Subtract()([x1_net, x2_net])
    net = layers.Conv2D(128, kernel_size = 3, activation = 'relu')(net)
    net = layers.MaxPooling2D(pool_size = 2)(net)
    net = layers.Flatten()(net)
    net = layers.Dense(512, activation = 'relu')(net)
    net = layers.Dense(1, activation = 'sigmoid')(net)
    model = Model(inputs = [x1, x2], outputs = net)

    # compile
    model.compile(loss = 'binary_crossentropy', optimizer = optimizers.legacy.RMSprop(lr=1e-4), metrics = ['acc'])

    # show summary
    model.summary()
    return (model, feature_model)

(model, feature_model) = build_model()
model.load_weights("./model2/checkpoint/cp.ckpt")
tf.saved_model.save(model, "./model")
# изображение, с которым будет сравниваться второе
img1 = cv2.imread("C:\\D\\Apps\\Hack\\2022\\2022.12_AvanpostChallenge\\Data\\MINEX\\minex_dataset\\a001_03.gray.png")
img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
# совпадающее изображение
img2 = cv2.imread("C:\\D\\Apps\\Hack\\2022\\2022.12_AvanpostChallenge\\Data\\MINEX\\minex_dataset\\b001_03.gray.png")
img2 = cv2.cvtColor(img2, cv2.COLOR_BGR2GRAY)
# несовпадающе изображение
img3 = cv2.imread("C:\\D\\Apps\\Hack\\2022\\2022.12_AvanpostChallenge\\Data\\MINEX\\minex_dataset\\a001_04.gray.png")
img3 = cv2.cvtColor(img3, cv2.COLOR_BGR2GRAY)

img1 = cv2.resize(img1, dsize=(160, 160))
img2 = cv2.resize(img2, dsize=(160, 160))
img3 = cv2.resize(img3, dsize=(160, 160))

img1 = img1.astype(np.float32) / 255.
img2 = img2.astype(np.float32) / 255.
img3 = img3.astype(np.float32) / 255.

img1 = img1.reshape((1, 160, 160, 1))
img2 = img2.reshape((1, 160, 160, 1))
img3 = img3.reshape((1, 160, 160, 1))

pred_right = model.predict([img1, img2])
print("схожесть с отпечатком того же человека ", pred_right)
pred_wrong = model.predict([img1, img3])
print("схожесть с чужим отпечатком ", pred_wrong)