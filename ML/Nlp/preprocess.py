import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
import pickle

# Load the dataset
df = pd.read_csv('JobDataset.csv')

# Preprocess the dataset
df['combined_features'] = df['Job Title'] + ' ' + df['Skills Required'] + ' ' + df['Job Type'] + ' ' + df['Location'] + ' ' + df['Job Description Summary']

# Vectorize the text data
vectorizer = TfidfVectorizer(stop_words='english')
tfidf_matrix = vectorizer.fit_transform(df['combined_features'])

# Save the vectorizer and tfidf_matrix for later use
with open('vectorizer.pkl', 'wb') as f:
    pickle.dump(vectorizer, f)
with open('tfidf_matrix.pkl', 'wb') as f:
    pickle.dump(tfidf_matrix, f)