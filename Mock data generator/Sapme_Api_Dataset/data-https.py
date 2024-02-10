import pandas as pd
import random
from faker import Faker
from datetime import datetime, timedelta

fake = Faker()

def get_status_text(status_code):
    status_texts = {
        200: "OK",
        201: "Created",
        204: "No Content",
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        500: "Internal Server Error",
        503: "Service Unavailable"
    }
    return status_texts.get(status_code, "Unknown Status")

# Define time intervals during which certain API calls are more likely to fail
failure_intervals = [
    (datetime(2022, 1, 1, 9, 0, 0), datetime(2022, 1, 1, 11, 0, 0)),  # Example: Failures between 9 AM and 11 AM
    (datetime(2022, 1, 1, 22, 0, 0), datetime(2022, 1, 2, 0, 0, 0))   # Example: Failures between 10 PM and 12 PM
]

# Define URLs for different API methods
urls = {
    "GET": "https://jsonplaceholder.typicode.com/posts",
    "POST": "https://jsonplaceholder.typicode.com/posts",
    "PATCH": "https://jsonplaceholder.typicode.com/posts/1",
    "DELETE": "https://jsonplaceholder.typicode.com/posts/1",
    "PUT": "https://jsonplaceholder.typicode.com/posts/1"
}

def calculate_cpu_utilization(memory_utilization, status_code, api_method):
    if status_code == 200:
        if api_method == "POST":
            return round(random.uniform(0.2, 0.5) * memory_utilization, 2)
        else:
            return round(random.uniform(0.1, 0.3) * memory_utilization, 2)
    elif status_code in [201, 204]:
        return round(random.uniform(0.1, 0.3) * memory_utilization, 2)
    else:
        return round(random.uniform(0.7, 0.9) * memory_utilization, 2)

data = []

# Generate user IDs for each continent
user_ids = {
    "Asia": [],
    "Africa": [],
    "North America": [],
    "South America": [],
    "Europe": [],
    "Australia": [],
    "Antarctica": []
}

for continent in user_ids:
    user_ids[continent] = ["kt" + str(fake.unique.random_number(digits=3)).zfill(3) for _ in range(10)]

for continent in user_ids:
    for _ in range(7):
        # Generate a random timestamp
        timestamp = fake.date_time_between(start_date="-1y", end_date="now")

        # Check if the current timestamp falls within any failure interval
        failure_info = None
        for start, end in failure_intervals:
            if start <= timestamp <= end:
                failure_info = {
                    "failure_start": start.isoformat(),
                    "failure_end": end.isoformat(),
                    "status_code": random.choice([400, 401, 403, 404, 500, 503])  # Random failure status codes
                }
                break
        
        # Generate a random API method
        api_method = random.choice(["GET", "POST", "PATCH", "DELETE", "PUT"])
        
        # Determine the status code based on the API method and failure status
        if api_method == "POST":
            status_code = random.choice([201, 401, 400, 403, 404, 503, 500])  # Status codes for POST method
        else:
            status_code = random.choice([200, 204, 400, 401, 404, 403, 500, 503])  # Status codes for other methods
        
        # Generate other parameters
        response_size = random.randint(1024, 2048)
        response_time = random.randint(100, 300)
        memory_utilization = random.randint(20, 40)
        cpu_utilization = calculate_cpu_utilization(memory_utilization, status_code, api_method)
        status = "pass" if status_code in [200, 201, 204] else "fail"
        https = "https"
        token = "no"
         # Assign user ID for the current location
        user_id = user_ids[continent][random.randint(0, 9)]
        url = urls[api_method]
        
        row = {
            "user_id": user_id,
            "timestamp": timestamp.isoformat(),
            "status_code": status_code,
            "status_text": get_status_text(status_code),
            "response_size": response_size,
            "response_time": response_time,
            "cpu_utilization": cpu_utilization,
            "memory_utilization": memory_utilization,
            "status": status,
            "protocol": https,
            "token": token,
            "location": continent,   
            "api_method": api_method,
            "url": url
        }
        
        if failure_info:
            row.update(failure_info)
        
        data.append(row)

df = pd.DataFrame(data)

df.to_excel("api_dataid.xlsx", index=False)
