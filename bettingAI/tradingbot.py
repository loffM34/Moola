from lumibot.brokers import Alpaca
from lumibot.backtesting import YahooDataBacktesting
from lumibot.strategies.strategy import Strategy
from lumibot.traders import Trader
from datetime import datetime
#allows us to get lots of info/news from alpac trade api
from alpaca_trade_api import REST
from timedelta import Timedelta
from finbert_utils import estimate_sentiment


## Alpaca API INFO
API_KEY = ""
API_SECRET = ""
BASE_URL = "https://paper-api.alpaca.markets/v2"

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
        #How often bot makes a trade
        self.sleeptime = "1H"
        
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
                        take_profit_price = last_price * 0.8,
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

start_date = datetime(2024, 4, 1)
end_date = datetime(2024, 4, 30)

broker = Alpaca(ALPACA_CREDS)
strategy = MLTrader(name='mlstrat', broker = broker,
                    parameters={"symbol":"SPY", 
                                "cash_at_risk":0.5})

#BACKTESTING 
strategy.backtest(
    YahooDataBacktesting,
    start_date,
    end_date,
    parameters={"symbol":"SPY", "cash_at_risk":0.5}
)


#Run bot Live

# trader = Trader()
# trader.add_strategy(strategy)
# trader.run_all()

# trader.stop_all()
# strategy.initialize()
# strategy.on_trading_iteration()

