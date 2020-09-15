<p align="center">  
  <img src="https://cdn.iconscout.com/icon/free/png-512/bot-136-504893.png" alt="api-logo" width="80" />
</p>
<h1 align="center">
    Trading bot
</h1>
<p align="center">
This is a trading-bot that works alongside <b>MetaTrader5</b> , build with typescript and python.

</p>

<br />

<p align="center">
<img src="https://img.shields.io/badge/Code-Typescript-informational?style=flat&logo=typescript&logoColor=white&color=2bbc8a)" alt="image" />

<img src="https://img.shields.io/badge/Code-Python-informational?style=flat&logo=python&logoColor=white&color=2bbc8a)" alt="image" />

<img src="https://img.shields.io/badge/Database-SQLite-informational?style=flat&logo=sqlite&logoColor=white&color=2bbc8a)" alt="image" />

<img src="https://img.shields.io/badge/Platform-MetaTrader5-informational?style=flat&logoColor=white&color=2bbc8a)" alt="image" />

</p>

---

## Design Document

<img src="DESIGN_DOC.png" alt="design_doc"/>

- **Application**: Bootstrap the application.

- **Cronjob**: The entity responsible for running the actions based on a timer, a repassing the data to the **_watchers_**.

- **Watchers**: They are responsible for watching the data a moving them accordingly to the resolvers (if needed), they are also responsible for logging the data (if needed), basically a cronjob can have multiple watchers, and a watcher can have multiple resolvers.

- **Resolvers**: Gather the data from the watchers to act on it, either applying a strategy, storing some data, basically where the action is.

- **Data source**: Source of market data.

---

## Current State

Right now the **trading-bot** is capable of reaching out to MT5, collect the symbol data, store it at SQLite DB and, based on that data, it looks backwards up to an X amount of registers, to decide if an order should be taken to either **buy it** or **sell it**. These actions are being taken based on a `MarketStrategy`, that has a positive factor and a negative factor, on which every action is gonna be based upon.

---

## Backlog

<script>
function toggleCheck(id) {
    const span = document.getElementById(id);
    const color =  span.style.color;

    console.log({ color });
    if (color === 'gray') {
        span.style.textDecoration = 'none';
        span.style.color = 'black';
        return
    }
    span.style.textDecoration = 'line-through';
    span.style.color = 'gray';
}
</script>

- | To-do
  ----- | -------------
  <input type="checkbox" onclick="toggleCheck('span1')"/> | <span id="span1">Execute python scripts to actually **buy** and **sell** on MT5<span>
  <input type="checkbox" onclick="toggleCheck('span2')"/> | <span id="span2">Add operation countdown, so if the bot is set to take up to 4 actions, it should end there</span>
  <input type="checkbox" onclick="toggleCheck('span3')"/> | <span id="span3">Add different watchers so the normal watcher runs every **60 seconds** and the second one the `orderWatcher` runs every **5 seconds** if an order has been taken</span>

---
