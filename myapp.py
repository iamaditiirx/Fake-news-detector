from flask import Flask, request, jsonify
import pickle
from flask_cors import CORS  # Add this import

app = Flask(__name__)
CORS(app)  # Add this line to enable CORS

# Load your trained model
with open('model.pkl', 'rb') as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return "Welcome to the Fake News Prediction API!"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json(force=True)
        # Extract news text
        news_text = data.get('text')
        if not news_text:
            return jsonify({'error': 'No news text provided'}), 400

        # Make prediction
        prediction = model.predict([news_text])[0]
        print(f"Prediction: {prediction}")  # Adjust as needed for your model
        return jsonify({'prediction': prediction})
    except Exception as e:
        # Handle any unexpected errors
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
