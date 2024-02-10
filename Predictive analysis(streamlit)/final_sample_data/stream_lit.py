import streamlit as st
import pandas as pd
import seaborn as sns
from predictive import preprocess_and_model
import matplotlib.pyplot as plt

df = pd.read_csv("api_data.csv")

# HEADINGS
st.title('API Predictive Analytics')
st.sidebar.header('API Response Data')
st.subheader('Sample API Data')
st.write(df.head(10))

# FUNCTION
def user_report():
    URL = st.sidebar.selectbox('API URL',  ["https://dog.ceo/api/breeds/image/random","https://api.apis.guru/v2/list.json","https://a.4cdn.org/boards.json","https://apis.is/flight?language=en&type=departures"], index=0)
    Response_size = st.sidebar.slider('Response size', min_value=0, max_value=2000)
    protocol = st.sidebar.radio("protocol", ("http", "https"))
    Api_Method = st.sidebar.selectbox('Api Method',  ["POST","PUT","GET","DELETE","PATCH"], index=0)
    Location = st.sidebar.selectbox('Location',  ["Antartica","Africa","North America","South America","Europe","Asia","Austrlia"], index=0)
    CPU_Utilization = st.sidebar.slider('CPU Utilization ', min_value=0, max_value=30)
    Memory_Utilization = st.sidebar.slider('Memory Utilization ', min_value=0, max_value=40)
    Status = st.sidebar.radio("Status", ("Pass", "Fail"))
    Status_code = st.sidebar.text_input("Status Code")

    user_report_data = {
        'URL': URL,
        'Response_size': Response_size,
        'protocol': protocol,
        'Api_Method': Api_Method,
        'Location': Location,
        'CPU_Utilization': CPU_Utilization,
        'Memory_Utilization': Memory_Utilization,
        'Status': Status,
        'Status_code': str(Status_code),  # Include 'Status_code' field
    }
    report_data = pd.DataFrame(user_report_data, index=[0])
    report_data_transposed = report_data.transpose()
    return report_data_transposed

# API DATA
user_data = user_report()
st.subheader('Selected API Parameters')
st.dataframe(user_data, width=800)




mse, results_df = preprocess_and_model("sample_final_api.xlsx")

st.subheader('Result Values')
st.dataframe(results_df)

st.subheader('Accuracy')
st.write(mse)

# Display user inputs and results
# filename = st.sidebar.text_input("Enter the filename (e.g., final_api_pp_data.xlsx)")
# if filename:
#     mse, results_df = preprocess_and_model(filename)
#     st.write("Mean Squared Error:", mse)
#     st.write("Top 10 results:")
#     st.write(results_df)
