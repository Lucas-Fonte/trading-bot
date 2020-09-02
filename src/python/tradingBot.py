import json
from datetime import datetime

import MetaTrader5 as mt5


def connectoToMT5 (): 
    mt5Connection = mt5.initialize()

    if not mt5Connection:
        # print('Initialized failed!')
        mt5.shutdown()

    # print(mt5.terminal_info())
    # print(mt5.version())
    # print('\nConnected')

def convertTimeStampToDate(unixTimestamp):
    return datetime.utcfromtimestamp(unixTimestamp).strftime('%Y-%m-%dT%H:%M:%SZ')

def getSymbolData(symbol):
    selected=mt5.symbol_select(symbol, True)
    if not selected:
        print("Failed to select " + symbol)
        mt5.shutdown()
        quit()
    

    # print("Show symbol info: (" + symbol + ")")
    symbolInfoDictionarie = mt5.symbol_info_tick(symbol)._asdict()

    symbolInfoDictionarie['time'] = convertTimeStampToDate(symbolInfoDictionarie['time'])
    data = json.dumps(symbolInfoDictionarie, indent=4, sort_keys=True) 
    print(data)
    return data
    
    mt5.shutdown()

connectoToMT5()
getSymbolData('WINV20')
# getSymbolData('EURUSD')
