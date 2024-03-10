
import sys


def printBotInfo(bot_name,alpaca_key,alpaca_secret,stock_symbol,trading_strat,start_cash,risk_percentage, trade_profit_order,):

    print("\n Bot: ",bot_name ,"\n Alpaca Key: ",alpaca_key,"\n Alpaca Secret: ",alpaca_secret ,"\n Stock: ", stock_symbol,"\n Trading Strat",trading_strat,"\n Starting Cash",start_cash,"\n % Cash Risk: ", risk_percentage, "\n Trade profit Order: ", trade_profit_order)

# Check if the script is called with the correct number of arguments
if len(sys.argv) != 9:
    print("Usage: python script.py bot_name start_cash risk_percentage trade_profit_order stock_symbol")
    sys.exit(1)


bot_name = sys.argv[1]
alpaca_key = sys.argv[2]
alpaca_secret = sys.argv[3]
stock_symbol = sys.argv[4]
trading_strat = sys.argv[5]
start_cash = sys.argv[6]
risk_percentage = sys.argv[7]
trade_profit_order = sys.argv[8]

printBotInfo(bot_name,alpaca_key,alpaca_secret,stock_symbol,trading_strat,start_cash,risk_percentage, trade_profit_order,)
