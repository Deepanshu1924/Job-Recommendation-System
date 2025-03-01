from flask import Flask, request, jsonify
from flask_cors import CORS
from training import recommend_jobs
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

logging.basicConfig(level=logging.DEBUG)

@app.route('/search', methods=['POST'])
def search():
    user_input = request.json.get('query')
    app.logger.debug(f"Received query: {user_input}")
    recommendations = recommend_jobs(user_input)
    app.logger.debug(f"Recommendations: {recommendations}")
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)