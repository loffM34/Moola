from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
from datetime import datetime
#allows us to get lots of info/news from alpac trade api
from alpaca_trade_api import REST
from timedelta import Timedelta
from finbert_utils import estimate_sentiment
from algorithms import calcSharpeRatio

## Alpaca API INFO
API_KEY = "PKDGY2P4PWQ4Z5SE1QMI"
API_SECRET = "zc1yxtLN4xmhs4ZFkcgKwdlxJvje2bde68MOBecy"
BASE_URL = "https://paper-api.alpaca.markets"

ALPACA_CREDS = {
    "API_KEY": API_KEY,
    "API_SECRET": API_SECRET,
    "PAPER": True
}

class MLTrader(Strategy):
    #LIFE Cycle Methods

    #Initialize method runs once
    def initialize(self, symbol: str="SPY", cash_at_risk:float=0.25,trade_profit_order:int = 200000):
        #symbol of stock choosen
        self.symbol = symbol
        #How often bot makes a trade
        self.sleeptime = "24H"
        #Last trade made by bot (buy,sell,hold)
        self.last_trade = None
        #set value of percentage of cash we are willing to risk
        self.cash_at_risk = cash_at_risk
        #Set trade profit order value where bot will stop trading
        self.trade_profit_order = trade_profit_order
        self.api = REST(base_url = BASE_URL, key_id=API_KEY, secret_key=API_SECRET)


    def position_sizing(self):
        #get cash left
        cash = self.get_cash()
        #portfolio value
        portfolio_value = self.get_portfolio_value()
        #gets most recent price of certain stock 
        last_price = self.get_last_price(self.symbol)
        #calculate how many units of stock to order using the cash we are willing to risk (rounded down)
        quantity = round(cash * self.cash_at_risk / last_price,0)
        return cash,portfolio_value ,last_price, quantity

    #set the dates from which the news will be gathered from
    def get_dates(self):
        today = self.get_datetime()
        three_days_prior = today - Timedelta(days = 3)
        return today.strftime('%Y-%m-%d'), three_days_prior.strftime('%Y-%m-%d')

    #get sentiment based on news from alpaca api
    def get_sentiment(self):
        today, three_days_prior = self.get_dates()
        news = self.api.get_news(symbol = self.symbol, start = three_days_prior , end = today )
        
        news = [ev.__dict__["_raw"]["headline"] for ev in news]
        
        probability, sentiment = estimate_sentiment(news)
        return probability, sentiment

    def get_sharpe_ratio(self):
        today = self.get_datetime()
        year_before = today - Timedelta(days = 365)
        sharpe_Ratio = calcSharpeRatio(self.symbol,year_before,today)
        return sharpe_Ratio
    
    #on trading runs every time we get new data
    def on_trading_iteration(self):
        cash,portfolio_value, last_price, quantity = self.position_sizing()
        probablitiy, sentiment = self.get_sentiment()
        # sharpe_ratio = self.get_sharpe_ratio()

        #if we have more cash than the stock costs or if 
        if cash > last_price:
                #if sentiment states that stock is going up and there is a high probablitiy of it 
                if sentiment == "positive" and probablitiy > 0.9:
                    #if last trade was a sell 
                    if self.last_trade == "sell":
                         self.sell_all()
                    order = self.create_order(
                        self.symbol,
                        quantity,
                        "buy",
                        #set barrier where if there is 20% profit or 5% loss than the bot atomattically sells 
                        type="bracket",
                            take_profit_price = last_price * 1.2,
                            stop_loss_price = last_price*0.95
                    )
                    #submits order through alpaca
                    self.submit_order(order)
                    self.last_trade = "buy"  
                    print("CASH: ", cash, " Trade: ", "BOUGHT")  


                #if sentiment states that stock is going up and there is a high probablitiy of it 
                elif sentiment == "negative" and probablitiy > 0.9:
                    #
                    if self.last_trade == "buy":
                         self.sell_all()
                    order = self.create_order(
                        self.symbol,
                        quantity,
                        "sell",
                        #set barrier where if there is 20% profit or 5% loss than the bot atomattically sells 
                        type="bracket",
                        take_profit_price = last_price * 0.8,
                        stop_loss_price = last_price*1.05
                    )
                    #submits order through alpaca
                    self.submit_order(order)
                    self.last_trade = "sell"
                    print("CASH: ", cash, " Trade: ", "SOLD")  
                else:
                    print("CASH: ", cash, " Trade: HELD")  



# Get current date
current_date = datetime.today()

# Extract year, month, and day
year = current_date.year
month = current_date.month
day = current_date.day

start_date = datetime(2014, 12, 25)
end_date = datetime(2016, 12, 25)

broker = Alpaca(ALPACA_CREDS)
strategy = MLTrader(name='mlstrat', broker = broker,
                    parameters={"symbol":"SPY", 
                                "cash_at_risk":0.25})

strategy.backtest(
    YahooDataBacktesting,
    start_date,
    end_date,
    parameters={"symbol":"SPY", "cash_at_risk":0.25}
)
