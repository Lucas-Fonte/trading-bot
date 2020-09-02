import json
from datetime import datetime

def sellSymbol(symbol):

    marketAction = {}
    
    marketAction["action"] = 'SELL'
    marketAction["symbol"] = symbol
    marketAction["price"] = 100000
    

    data = json.dumps(marketAction, indent=4, sort_keys=True) 
    print('\n' + data + '\n')
    
sellSymbol('WINV20')
