import pandas as pd
import pickle
from sklearn.metrics.pairwise import cosine_similarity

# Load the dataset
df = pd.read_csv('JobDataset.csv')

def recommend_jobs(user_input):
    # Load the vectorizer and tfidf_matrix
    with open('vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)
    with open('tfidf_matrix.pkl', 'rb') as f:
        tfidf_matrix = pickle.load(f)

    # Transform the user input
    user_tfidf = vectorizer.transform([user_input])

    # Calculate cosine similarity
    cosine_sim = cosine_similarity(user_tfidf, tfidf_matrix)

    # Get the top 5 job recommendations
    top_indices = cosine_sim[0].argsort()[-5:][::-1]
    recommended_jobs = df.iloc[top_indices]

    return recommended_jobs[['Job Title', 'Company Name', 'Location', 'Job Type', 'Salary (INR)', 'Skills Required']].to_dict(orient='records')