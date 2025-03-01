import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import requests

def ask_questions(questions, round_name):
    print(f"\n--- {round_name} Round ---")
    score = 0
    for i, (q, options, correct_ans) in enumerate(questions, 1):
        print(f"\nQuestion {i}: {q}")
        print("\n".join(options))
        user_ans = input("Your answer: ").strip().lower()
        if user_ans == correct_ans.lower():
            score += 1
    return score

def get_user_details():
    print("\nEnter your details:")
    name = input("Name: ").strip()
    age = input("Age: ").strip()
    email = input("Email: ").strip()
    return {"name": name, "age": age, "email": email}

def display_report(user_details, scores, recommended_jobs):
    total_score = sum(scores.values())
    print("\n--- Final Analytical Report ---")
    print(f"Name: {user_details['name']}")
    print(f"Age: {user_details['age']}")
    print(f"Email: {user_details['email']}")
    print(f"\nScores:")
    for round_name, score in scores.items():
        print(f"{round_name}: {score}/5")
    print(f"Total Score: {total_score}/15")
    print(f"Average Score per Round: {total_score / 3:.2f}")
    print("\nRecommended Jobs Based on Your Performance:") 
    for i, job in enumerate(recommended_jobs, 1):
        print(f"\nJob {i}:")
        print(f"Job Title: {job['Job_Title']}")
        print(f"Location: {job['Location']}")
        print(f"Salary: {job['Salary']} INR")
        print(f"Company: {job['Company_Name']}")
        print(f"Job Description: {job['Job_Description']}")

    # Ask if user wants to receive recommendations via email
    send_email_choice = input("\nDo you want to receive these job recommendations via email? (y/n): ").strip().lower()
    if send_email_choice == 'y':
        send_email(user_details, recommended_jobs)

def send_email(user_details, recommended_jobs):
    sender_email = "your_email@gmail.com"
    receiver_email = user_details['email']
    password = "your_password"
    
    subject = f"Job Recommendations for {user_details['name']}"
    body = f"Dear {user_details['name']},\n\nHere are the job recommendations based on your performance in the Career Connect Quiz:\n\n"

    for i, job in enumerate(recommended_jobs, 1):
        body += f"\nJob {i}: {job['Job_Title']} at {job['Company_Name']}\n"
        body += f"Location: {job['Location']}\n"
        body += f"Salary: {job['Salary']} INR\n"
        body += f"Description: {job['Job_Description']}\n"

    body += "\nBest regards,\nCareer Connect Team"

    # Send the email
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, password)
        text = msg.as_string()
        server.sendmail(sender_email, receiver_email, text)
        server.quit()
        print("Email sent successfully!")
    except Exception as e:
        print(f"Failed to send email: {e}")

def main():
    print("Welcome to the Career Connect Quiz!")

    # Round 1: Aptitude Questions
    aptitude_questions = [
        ("What is the next number in the series: 2, 4, 8, 16, ...?", ["a. 32", "b. 64", "c. 24", "d. 128"], "a"),
        ("If a car travels 60 km in 1 hour, how much time will it take to travel 180 km?", ["a. 3 hours", "b. 2 hours", "c. 1 hour", "d. 4 hours"], "a"),
        ("Which number is divisible by both 4 and 6?", ["a. 12", "b. 14", "c. 10", "d. 8"], "a"),
        ("Find the odd one out: 3, 9, 27, 81, 162", ["a. 3", "b. 9", "c. 27", "d. 162"], "d"),
        ("What is the value of 12 * 12 / 4?", ["a. 36", "b. 48", "c. 144", "d. 24"], "b")
    ]

    # Round 2: DSA Questions
    dsa_questions = [
        ("Which of the following is the correct definition of a linked list?", ["a. A collection of nodes", "b. A collection of arrays", "c. A stack of elements", "d. A queue of elements"], "a"),
        ("Which data structure uses LIFO (Last In First Out) principle?", ["a. Queue", "b. Stack", "c. Linked List", "d. Tree"], "b"),
        ("What does the binary search algorithm do?", ["a. Finds the maximum element", "b. Finds an element in a sorted array", "c. Sorts an array", "d. Finds the middle element"], "b"),
        ("Which of the following is not a type of tree?", ["a. Binary Tree", "b. Binary Search Tree", "c. Heap", "d. Graph"], "d"),
        ("What is the time complexity of inserting an element in a hash table?", ["a. O(1)", "b. O(n)", "c. O(log n)", "d. O(n^2)"], "a")
    ]

    # Round 3: Field Selection and Specific Questions
    fields = {
        "Frontend Developer": [
            ("Which of the following is used to style HTML documents?", ["a. CSS", "b. JavaScript", "c. HTML", "d. PHP"], "a"),
            ("Which HTML tag is used to define an internal style sheet?", ["a. <script>", "b. <style>", "c. <css>", "d. <head>"], "b"),
            ("What does CSS stand for?", ["a. Color Style Sheets", "b. Cascading Style Sheets", "c. Computer Style Sheets", "d. Creative Style Sheets"], "b"),
            ("Which of these is a JavaScript framework?", ["a. React", "b. Bootstrap", "c. Angular", "d. All of the above"], "d"),
            ("Which method is used to add an element to an array in JavaScript?", ["a. push()", "b. pop()", "c. shift()", "d. unshift()"], "a")
        ],
        "Backend Developer": [
            ("Which of the following is used to create APIs?", ["a. Django", "b. Node.js", "c. Flask", "d. All of the above"], "d"),
            ("Which language is typically used for backend development?", ["a. HTML", "b. Python", "c. JavaScript", "d. SQL"], "b"),
            ("Which database is known for its SQL-based structure?", ["a. MongoDB", "b. MySQL", "c. SQLite", "d. PostgreSQL"], "b"),
            ("What is the main function of a server?", ["a. Store data", "b. Send data", "c. Handle requests", "d. All of the above"], "d"),
            ("What is a RESTful API?", ["a. A type of API that uses HTTP requests", "b. A programming language", "c. A database type", "d. A security protocol"], "a")
        ],
        "ML Engineer": [
            ("Which algorithm is used for supervised learning?", ["a. K-Means", "b. Linear Regression", "c. DBSCAN", "d. Apriori"], "b"),
            ("What is overfitting in machine learning?", ["a. Model performs well on training data but poorly on new data", "b. Model performs well on all data", "c. Model fails to learn anything"], "a"),
            ("Which of the following is a popular ML library in Python?", ["a. NumPy", "b. TensorFlow", "c. Django", "d. React"], "b"),
            ("What does 'training' mean in machine learning?", ["a. Feeding the model data", "b. Evaluating the model", "c. Deploying the model"], "a"),
            ("What is the purpose of a loss function?", ["a. Evaluate model performance", "b. Clean data", "c. Make predictions"], "a")
        ]
    }

    print("\nSelect a field:")
    for i, role in enumerate(fields.keys(), 1):
        print(f"{i}. {role}")
    field_choice = int(input("Enter the number corresponding to your choice: ").strip()) - 1
    selected_field = list(fields.keys())[field_choice]
    field_questions = fields[selected_field]

    # Ask questions in each round
    scores = {}
    scores['Aptitude'] = ask_questions(aptitude_questions, "Aptitude")
    scores['DSA'] = ask_questions(dsa_questions, "DSA")
    scores['Field'] = ask_questions(field_questions, f"Field-Specific ({selected_field})")

    # Send scores to the Flask app for recommendations
    response = requests.post('http://127.0.0.1:5000/quiz', json={'scores': scores})
    recommended_jobs = response.json()

    # Get user details
    user_details = get_user_details()

    # Display final report and email option
    display_report(user_details, scores, recommended_jobs)

if __name__ == "__main__":
    main()