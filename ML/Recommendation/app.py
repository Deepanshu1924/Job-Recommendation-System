from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from fuzzywuzzy import fuzz

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing for frontend communication

# Load the dataset from the CSV file
try:
    df = pd.read_csv("JobDataset.csv")
except FileNotFoundError:
    raise Exception("Error: JobDataset.csv file not found. Please ensure the file is in the same directory as the script.")

def calculate_similarity(row, location, skills, job_type, job_title, fresher_or_intern):
    """
    Calculate an aggregate similarity score for a job listing based on user inputs.
    """
    location_score = fuzz.partial_ratio(location.lower(), str(row['Location']).lower())
    skills_score = fuzz.partial_ratio(skills.lower(), str(row['Skills Required']).lower())
    job_type_score = fuzz.partial_ratio(job_type.lower(), str(row['Job Type']).lower())
    job_title_score = fuzz.partial_ratio(job_title.lower(), str(row['Job Title']).lower())
    fresher_score = fuzz.partial_ratio(fresher_or_intern.lower(), str(row['Fresher/Intern']).lower())

    total_score = (skills_score * 0.5 +
                   job_type_score * 0.2 +
                   job_title_score * 0.15 +
                   location_score * 0.1 +
                   fresher_score * 0.05)
    return total_score

def recommend_jobs(location, skills, job_type, job_title, fresher_or_intern):
    """
    Recommend jobs using fuzzy matching for user inputs.
    """
    # Ensure there are no null values in required fields
    for field in ['Location', 'Skills Required', 'Job Type', 'Job Title', 'Fresher/Intern']:
        df[field] = df[field].fillna("")

    # Calculate similarity scores
    df['Similarity Score'] = df.apply(
        lambda row: calculate_similarity(row, location, skills, job_type, job_title, fresher_or_intern),
        axis=1
    )

    # Sort jobs by similarity score in descending order and select top 3
    recommendations = df.sort_values(by="Similarity Score", ascending=False).head(3)
    jobs = recommendations.to_dict(orient="records")
    return jobs

@app.route("/recommend", methods=["POST"])
def recommend():
    try:
        data = request.json

        # Extract user inputs
        location = data.get("location", "")
        skills = data.get("skills", "")
        job_type = data.get("job_type", "")
        job_title = data.get("job_title", "")
        fresher_or_intern = data.get("fresher_or_intern", "")

        # Validate input
        if not location or not skills or not job_type or not job_title or not fresher_or_intern:
            return jsonify({"error": "All fields are required!"}), 400

        # Get job recommendations
        jobs = recommend_jobs(location, skills, job_type, job_title, fresher_or_intern)

        # Return recommendations
        return jsonify(jobs)

    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=2000)  # You can change the port if needed
