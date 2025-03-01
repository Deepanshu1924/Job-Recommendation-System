import pandas as pd
from sklearn.multioutput import MultiOutputRegressor
from sklearn.neighbors import KNeighborsRegressor
from sklearn.preprocessing import LabelEncoder
import pickle

# Load the dataset
df = pd.read_csv('JobDataset.csv')

# Generate scores (for demonstration purposes, we'll use random scores)
import numpy as np
np.random.seed(0)
df['Aptitude_Score'] = np.random.randint(1, 6, df.shape[0])
df['DSA_Score'] = np.random.randint(1, 6, df.shape[0])
df['Field_Score'] = np.random.randint(1, 6, df.shape[0])

# Prepare the feature matrix
X = df[['Aptitude_Score', 'DSA_Score', 'Field_Score']]

# Encode categorical target variables
label_encoders = {}
for column in ['Job Title', 'Location', 'Company Name', 'Job Description Summary']:
    le = LabelEncoder()
    df[column] = le.fit_transform(df[column])
    label_encoders[column] = le

# Prepare the target variables
y_categorical = df[['Job Title', 'Location', 'Company Name', 'Job Description Summary']]
y_numerical = df[['Salary (INR)']]

# Train the MultiOutputRegressor with KNeighborsRegressor for categorical outputs
knn_categorical = MultiOutputRegressor(KNeighborsRegressor(n_neighbors=3))
knn_categorical.fit(X, y_categorical)

# Train the KNeighborsRegressor for numerical outputs
knn_numerical = KNeighborsRegressor(n_neighbors=3)
knn_numerical.fit(X, y_numerical)

# Save the trained models and label encoders
with open('knn_categorical_model.pkl', 'wb') as f:
    pickle.dump(knn_categorical, f)
with open('knn_numerical_model.pkl', 'wb') as f:
    pickle.dump(knn_numerical, f)
with open('label_encoders.pkl', 'wb') as f:
    pickle.dump(label_encoders, f)