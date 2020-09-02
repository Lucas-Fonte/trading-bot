import json
from datetime import datetime

def buySymbol(symbol):

    marketAction = {}
    
    marketAction["action"] = 'BUY'
    marketAction["symbol"] = symbol
    marketAction["price"] = 100000
    

    data = json.dumps(marketAction, indent=4, sort_keys=True) 
    print('\n' + data + '\n')
    
buySymbol('WINV20')
