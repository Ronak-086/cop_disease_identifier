# 🌿 COP Disease Identifier

An AI-powered plant disease detection system that uses deep learning and image classification to identify diseases from leaf images. This project helps farmers and gardeners diagnose plant diseases and get potential solutions.

---

## 🚀 Features

- Classifies plant diseases by analyzing leaf images.
- Supports multiple crops (e.g. Tomato, Potato, etc.)
- Uses Convolutional Neural Networks (CNN) for high accuracy.
- Provides possible remedies using integrated APIs.
- Easy-to-use web interface for users to upload images and get predictions.

---

## 🧠 Tech Stack

- **Deep Learning**: TensorFlow, Keras
- **Data Processing**: Pandas, NumPy, OpenCV
- **Backend**: Flask (API service)
- **Frontend**: HTML, CSS, JavaScript
- **Integration**: API call to suggest protection and remedies
- **Deployment (optional)**: Heroku, Render, or local server

---

## 📁 Project Structure

```bash
cop_disease_identifier/
│
├── dataset/               # Dataset of plant images
├── model/                 # Saved trained model (.h5 or .pkl)
├── notebooks/             # Jupyter Notebooks for training & EDA
├── server/                # Flask backend server
├── client/                # Web frontend files
├── utils/                 # Helper functions and preprocessing scripts
├── requirements.txt       # Python dependencies
└── README.md              # Project documentation
