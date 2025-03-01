import pandas as pd
from fuzzywuzzy import fuzz

# Load the dataset from the CSV file
try:
    df = pd.read_csv("JobDataset.csv")
except FileNotFoundError:
    print("Error: JobDataset.csv file not found. Please ensure the file is in the same directory as the script.")
    exit()

def calculate_similarity(row, location, skills, job_type, job_title, fresher_or_intern):
    """
    Calculate an aggregate similarity score for a job listing based on user inputs.
    """
    # Compute partial match scores
    location_score = fuzz.partial_ratio(location.lower(), str(row['Location']).lower())
    skills_score = fuzz.partial_ratio(skills.lower(), str(row['Skills Required']).lower())
    job_type_score = fuzz.partial_ratio(job_type.lower(), str(row['Job Type']).lower())
    job_title_score = fuzz.partial_ratio(job_title.lower(), str(row['Job Title']).lower())
    fresher_score = fuzz.partial_ratio(fresher_or_intern.lower(), str(row['Fresher/Intern']).lower())

    # Weighted aggregate score
    total_score = (skills_score * 0.5 +
                   job_type_score * 0.2 +
                   job_title_score * 0.15 +
                   location_score * 0.1 +
                   fresher_score * 0.05)
    return total_score

def recommend_jobs_minimum_three(location, skills, job_type, job_title, fresher_or_intern):
    """
    Recommend at least 3 jobs using fuzzy matching for user inputs.
    """
    # Calculate similarity scores for all jobs
    df['Similarity Score'] = df.apply(
        lambda row: calculate_similarity(row, location, skills, job_type, job_title, fresher_or_intern),
        axis=1
    )

    # Sort by similarity scores in descending order
    recommendations = df.sort_values(by="Similarity Score", ascending=False)

    # Ensure at least 3 matches
    top_recommendations = recommendations.head(3)

    # Generate descriptive paragraphs for each recommendation
    output = []
    for _, row in top_recommendations.iterrows():
        paragraph = (
            f"**Job Title:** {row['Job Title']}\n"
            f"**Location:** {row['Location']}\n"
            f"**Company Name:** {row['Company Name']}\n"
            f"**Job Type:** {row['Job Type']}\n"
            f"**Salary:** ₹{row['Salary (INR)']:,}\n"
            f"**Skills Required:** {row['Skills Required']}\n"
            f"**Description:** {row['Job Description Summary']}\n"
            f"**Match Score:** {row['Similarity Score']:.2f}\n"
        )
        output.append(paragraph)

    # Return the result as a single string
    return "\n\n".join(output)

# User inputs
print("Enter your job preferences:")
user_location = input("Location: ").strip()
user_skills = input("Skills (comma-separated): ").strip()
user_job_type = input("Job Type (Remote/Hybrid/On-site): ").strip()
user_job_title = input("Job Title: ").strip()
user_fresher_or_intern = input("Fresher or Intern: ").strip()

# Get recommendations
result = recommend_jobs_minimum_three(user_location, user_skills, user_job_type, user_job_title, user_fresher_or_intern)

# Display results
print("\nTop Job Recommendations:\n")
print(result)
