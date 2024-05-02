from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
from datetime import datetime
#allows us to get lots of info/news from alpac trade api
from alpaca_trade_api import REST
from timedelta import Timedelta
from finbert_utils import estimate_sentiment
import sys

#Params for the trading strategy
alpaca_key = sys.argv[1]
alpaca_secret = sys.argv[2]
alpaca_endpoint = sys.argv[3]
stock_symbol = sys.argv[4]
risk_percentage = sys.argv[5]
trade_profit_order = sys.argv[6]


# BASE_URL = alpaca_endpoint
BASE_URL = "https://paper-api.alpaca.markets/v2"

## Alpaca API INFO
API_KEY = alpaca_key
API_SECRET = alpaca_secret

ALPACA_CREDS = {
    "API_KEY": API_KEY,
    "API_SECRET": API_SECRET,
    "PAPER": True
}

class MLTrader(Strategy):
    #LIFE Cycle Methods

    #Initialize method runs once
    def initialize(self, symbol: str="SPY", cash_at_risk:float=0.5):
        print("LOGGING THE INITIALIZATION STATE")
        #symbol of stock choosen
        self.symbol = symbol
        print("STOCK SYMBOL", self.symbol)
        #How often bot makes a trade
        self.sleeptime = "24H"
        
        #Last trade made by bot (buy,sell,hold)
        self.last_trade = None
        #set value of percentage of cash we are willing to risk
        self.cash_at_risk = cash_at_risk
        self.api = REST(base_url = BASE_URL, key_id=API_KEY, secret_key=API_SECRET)


    def position_sizing(self):
        #get cash left
        cash = self.get_cash()
        #gets most recent price of certain stock 
        last_price = self.get_last_price(self.symbol)
        #calculate how many units of stock to order using the cash we are willing to risk (rounded down)
        quantity = round(cash * self.cash_at_risk / last_price,0)
        return cash, last_price, quantity

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

        
    #on trading runs every time we get new data
    def on_trading_iteration(self):
        cash, last_price, quantity = self.position_sizing()
        probablitiy, sentiment = self.get_sentiment()

        #if we have more cash than the stock costs or if 
        if cash > last_price:
                #if sentiment states that stock is going up and there is a high probablitiy of it 
                if sentiment == "positive" and probablitiy > 0.999:
                    #
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
                    print("Decision: BUY")
                    self.submit_order(order)
                    self.last_trade = "buy"  

                                    #if sentiment states that stock is going up and there is a high probablitiy of it 
                elif sentiment == "negative" and probablitiy > 0.999:
                    #
                    if self.last_trade == "buy":
                         self.sell_all()
                    order = self.create_order(
                        self.symbol,
                        quantity,
                        "sell",
                        #set barrier where if there is 20% profit or 5% loss than the bot atomattically sells 
                        type="bracket",
                        take_profit_price = trade_profit_order,
                        stop_loss_price = last_price*1.05
                    )
                    #submits order through alpaca
                    print("DECISION: SELL")
                    self.submit_order(order)
                    self.last_trade = "sell"  
                else:
                    print("HELD")




# Get current date
current_date = datetime.today()

# Extract year, month, and day
year = current_date.year
month = current_date.month
day = current_date.day

start_date = datetime(2020, 12, 25)
end_date = datetime(2023, 12, 25)

broker = Alpaca(ALPACA_CREDS)
strategy = MLTrader(name='mlstrat', broker = broker,
                    parameters={"symbol":stock_symbol, 
                                "cash_at_risk":risk_percentage})

# BACKTESTING 
# strategy.backtest(
#     YahooDataBacktesting,
#     start_date,
#     end_date,
#     parameters={"symbol":"SPY", "cash_at_risk":risk_percentage}
# )




# Check if the script is called with the correct number of arguments
if len(sys.argv) != 9:
    print("Incorrect Number of arguments passed")
    sys.exit(1)
else:
    trader = Trader()
    trader.add_strategy(strategy)
    trader.run_all()



# trader.stop_all()
# strategy.initialize()
# strategy.on_trading_iteration()

