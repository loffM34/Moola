
import sys

def printBotInfo(bot_name,alpaca_key,alpaca_secret,stock_symbol,alpaca_endpoint,trading_strat,start_cash,risk_percentage, trade_profit_order,):

    print("\n Bot: ",bot_name ,"\n Alpaca Key: ",alpaca_key,"\n Alpaca Secret: ",alpaca_secret ,"\n Alpaca Endpoint: ",alpaca_endpoint,"\n Stock: ", stock_symbol,"\n Trading Strat",trading_strat,"\n Starting Cash",start_cash,"\n % Cash Risk: ", risk_percentage, "\n Trade profit Order: ", trade_profit_order)

# Check if the script is called with the correct number of arguments
if len(sys.argv) != 10:
    print("Incorrect Number of arguments passed")
    sys.exit(1)



bot_name = sys.argv[1]
alpaca_key = sys.argv[2]
alpaca_secret = sys.argv[3]
alpaca_endpoint = sys.argv[4]
stock_symbol = sys.argv[5]
trading_strat = sys.argv[6]
start_cash = sys.argv[7]
risk_percentage = sys.argv[8]
trade_profit_order = sys.argv[9]

printBotInfo(bot_name,alpaca_key,alpaca_secret,alpaca_endpoint,stock_symbol,trading_strat,start_cash,risk_percentage, trade_profit_order,)
