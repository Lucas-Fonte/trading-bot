import json
import sys
import getopt
import json
from datetime import datetime
import argparse
import MetaTrader5 as mt5

parser = argparse.ArgumentParser()
parser.add_argument('--symbol', help='symbol to be executed')
arguments = parser.parse_args()


def connectoToMT5 (): 
    mt5Connection = mt5.initialize()

    if not mt5Connection:
        mt5.shutdown()

def convertTimeStampToDate(unixTimestamp):
    return datetime.utcfromtimestamp(unixTimestamp).strftime('%Y-%m-%dT%H:%M:%SZ')

def getSymbolData(symbol):
    selected=mt5.symbol_select(symbol, True)
    if not selected:
        print("Failed to select " + symbol)
        mt5.shutdown()
        quit()
    

    symbolInfoDictionarie = mt5.symbol_info_tick(symbol)._asdict()

    symbolInfoDictionarie['time'] = convertTimeStampToDate(symbolInfoDictionarie['time'])
    data = json.dumps(symbolInfoDictionarie, indent=4, sort_keys=True) 
    print(data)
    return data
    
    mt5.shutdown()

connectoToMT5()
getSymbolData(arguments.symbol)

