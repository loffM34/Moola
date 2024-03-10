import yfinance as yf
import numpy as np
from datetime import datetime
from timedelta import Timedelta
from riskRateScraper import getRiskFreeRate
import pandas as pd


# current_date = date.strftime("%Y-%m-%d")


def calcSharpeRatio(symbol,startDate,endDate):
    # startDate = datetime.now()
    # if (tradingStrat == "long"):
    #     startDate -= timedelta(days=365)
    # elif (tradingStrat == "short"):
    #     startDate -= timedelta(days=31)

    stock_info = yf.download(symbol, start=startDate, end = endDate)
    #gets daily return of stock and creates a column named daily return
    stock_info['Daily Return'] = stock_info['Close'].pct_change()

    print(stock_info['Daily Return'])
    stock_info.dropna(subset=['Daily Return'],inplace = True)

    avg_daily_return = stock_info['Daily Return'].mean()
    

    standard_deviation = stock_info['Daily Return'].std()

    avg_risk_free_rate = ((getRiskFreeRate(startDate)+getRiskFreeRate(endDate))/2)/252
    
    stock_info['excess_returns'] = stock_info['Daily Return'] - avg_risk_free_rate

    sharpe_ratio = np.sqrt(252) * stock_info['excess_returns'].mean() / stock_info['excess_returns'].std()
    # sharpe_ratio = np.sqrt(252)* ((avg_daily_return - risk_free_rate)/standard_deviation)

    print("avg return",avg_daily_return,"stand dev",standard_deviation,"risk rate",avg_risk_free_rate,"Sharpe:",sharpe_ratio)
    print("DATE RANGE",startDate,endDate)

    return sharpe_ratio



def calcBetaCoefficient():
    var = 0


