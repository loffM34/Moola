from datetime import datetime
import requests
from bs4 import BeautifulSoup
import re

# date = datetime.now()

# year = datetime.now().year

# month = datetime.now().month
# if(month < 10):
#     month = "0"+ f"{month}"

# current_date = date.strftime('%m/%d/%Y')


def getRiskFreeRate(date):
    
    year = date.strftime('%Y')
    month = date.strftime('%m')

    url = f"https://home.treasury.gov/resource-center/data-chart-center/interest-rates/TextView?type=daily_treasury_yield_curve&field_tdr_date_value_month={year}{month}"

    #get HTTP from Webpage
    response = requests.get(url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content
        soup = BeautifulSoup(response.content, 'html.parser')

        tableData = soup.find_all("td", class_ = "bc1month views-field views-field-field-bc-1month")

        html_string = f"{tableData[-1]}"


        yieldCurve = re.search(r'>([\d.]+)\s*<', html_string).group(1)
        
        return float(yieldCurve)*0.01
