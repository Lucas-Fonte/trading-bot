import sys
import getopt
import json
from datetime import datetime
import argparse

parser = argparse.ArgumentParser()
parser.add_argument('--symbol', help='symbol to be executed')
arguments = parser.parse_args()

def getSymbolData(symbol):

    symbolInfoDictionarie = {}
    
    symbolInfoDictionarie["symbol"] = symbol
    symbolInfoDictionarie["ask"] = 101060.0
    symbolInfoDictionarie["bid"] = 101015.0
    symbolInfoDictionarie["flags"] = 24
    symbolInfoDictionarie["last"] = 102190.0
    symbolInfoDictionarie["time"] = "2020-09-01T18:01:20Z"
    symbolInfoDictionarie["time_msc"] = 1598983280589
    symbolInfoDictionarie["volume"] = 3
    symbolInfoDictionarie["volume_real"] = 3.

    data = json.dumps(symbolInfoDictionarie, indent=4, sort_keys=True) 
    print('\n' + data + '\n')
  
getSymbolData(arguments.symbol)
