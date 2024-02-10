import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.svm import SVR
from sklearn.metrics import mean_squared_error

def preprocess_and_model(filename):
    # Importing the dataset
    df_edit = pd.read_excel(filename)

    # Splitting the data into features and target
    x = df_edit[['http://xkcd.com/info.0.json',
                 'https://jsonplaceholder.typicode.com/posts',
                 'https://jsonplaceholder.typicode.com/posts/1',
                 'response_time', 'response_size', 'memory_utilization',
                 'cpu_utilization', 'status_code', 'Bad Request', 'Created',
                 'Forbidden', 'Internal Server Error', 'No Content', 'Not Found',
                 'OK', 'Service Unavailable', 'Unauthorized', 'https', 'http',
                 'DELETE', 'GET', 'PATCH', 'POST', 'PUT', 'Africa', 'Antarctica',
                 'Asia', 'Australia', 'Europe', 'North America', 'South America',
                 'status']]
    y = df_edit['response_time']

    # Splitting the dataset into training and testing sets
    x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

    # Feature scaling
    scaler = StandardScaler()
    x_train_scaled = scaler.fit_transform(x_train)
    x_test_scaled = scaler.transform(x_test)

    # Initialize and train the SVR model
    svr = SVR(kernel='rbf')
    svr.fit(x_train_scaled, y_train)

    # Predict on the test set
    y_pred = svr.predict(x_test_scaled)
    

    # Evaluate the model
    mse = mean_squared_error(y_test, y_pred)

    # Creating a DataFrame to display actual and predicted values side by side
    results = pd.DataFrame({'Actual Response Time': y_test, 'Predicted Response Time': y_pred})

    # Shuffle the DataFrame
    shuffled_df = df_edit.sample(frac=1, random_state=42)

    # Save the preprocessed DataFrame to an Excel file
    shuffled_df.to_excel('preprocessed_data.xlsx', index=False)

    # Return MSE and DataFrame
    return mse, results.head(10)

