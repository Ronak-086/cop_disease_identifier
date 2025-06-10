from __future__ import division, print_function
# coding=utf-8
import sys
import os
import glob
import re
import numpy as np
from flask import jsonify
# Keras
from keras.models import load_model
from keras.preprocessing import image

# Flask utils
from flask import Flask, redirect, url_for, request, render_template
from werkzeug.utils import secure_filename

# Define a flask app
app = Flask(__name__)

# Model saved with Keras model.save()
MODEL_PATH = 'models/model_resnet.h5'

# Load your trained model
model = load_model(MODEL_PATH)

print('Model loaded. Check http://127.0.0.1:5000/')

# Replace this with your actual class names (6 classes)
class_names = ['Early_blight',
               'Late_blight',
               'healthy',
               'Early_blight',
               'Late_blight',
               'healthy']

def model_predict(img_path, model):
    img = image.load_img(img_path, target_size=(224, 224))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    x = x / 255.0  # Normalization if your model was trained this way

    preds = model.predict(x)
    pred_class_index = np.argmax(preds, axis=1)[0]
    result = class_names[pred_class_index]
    return result


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

# ... existing imports and code ...

@app.route('/predict', methods=['GET', 'POST'])
def upload():
    if request.method == 'POST':
        # Get the file from post request
        f = request.files['file']

        # Save the file to ./uploads
        basepath = os.path.dirname(__file__)
        file_path = os.path.join(
            basepath, 'uploads', secure_filename(f.filename))
        f.save(file_path)

        # Make prediction
        preds = model_predict(file_path, model)

        # Convert prediction to readable label
        class_names = [
            "Early_blight", "Late_blight", "healthy", "Early_blight", "Late_blight", "healthy"
        ]  # <-- You replace these with your actual class names
        pred_index = np.argmax(preds)
        result = class_names[pred_index]
        return jsonify({'prediction': result})
    return None

if __name__ == '__main__':
    app.run(debug=True)
