import logging
import pandas as pd
import pickle
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

logging.basicConfig(level=logging.DEBUG)

# Load the trained models and label encoders
with open('knn_categorical_model.pkl', 'rb') as f:
    knn_categorical = pickle.load(f)
with open('knn_numerical_model.pkl', 'rb') as f:
    knn_numerical = pickle.load(f)
with open('label_encoders.pkl', 'rb') as f:
    label_encoders = pickle.load(f)

def recommend_jobs(scores):
    # Prepare the input data
    X_new = [[scores['Aptitude'], scores['DSA'], scores['Field']]]

    # Predict the categorical and numerical outputs
    categorical_predictions = knn_categorical.predict(X_new)
    numerical_predictions = knn_numerical.predict(X_new)

    # Decode the categorical predictions
    decoded_predictions = {}
    for i, column in enumerate(['Job Title', 'Location', 'Company Name', 'Job Description Summary']):
        le = label_encoders[column]
        decoded_predictions[column] = le.inverse_transform(categorical_predictions[:, i].astype(int))

    # Prepare the recommended jobs
    recommended_jobs = []
    for i in range(len(decoded_predictions['Job Title'])):
        job = {
            'Job_Title': decoded_predictions['Job Title'][i],
            'Location': decoded_predictions['Location'][i],
            'Salary': numerical_predictions[i][0],
            'Company_Name': decoded_predictions['Company Name'][i],
            'Job_Description': decoded_predictions['Job Description Summary'][i]
        }
        recommended_jobs.append(job)

    return recommended_jobs

@app.route('/quiz', methods=['POST'])
def process_quiz():
    data = request.json
    app.logger.debug(f"Received data: {data}")
    scores = data['scores']
    recommendations = recommend_jobs(scores)
    return jsonify(recommendations)

if __name__ == "__main__":
    app.run(debug=True, port=4000)  # You can change the port if needed
