# Trading bot

This is a trading-bot that works alongside **MetaTrader5** , build with typescript and python.

## Design Concept

```mermaid
    graph TD
        A(Application) --> B(MarketData Cronjob)
        B(MarketData Cronjob)  --> C[MarketData Watcher]
        B(MarketData Cronjob)  --> D[MarketOrder Watcher]
        B(MarketData Cronjob) --- |Before watchers| E{Data source}
        C[MarketData Watcher] --> F[MarketData Resolver]
        D[MarketOrder Watcher] --> G[MarketOrder Resolver]

        style A fill:#DAE8FC,stroke: #00aefd, stroke-width:1px
        style B fill:#FFF2CC,stroke: #ffc500, stroke-width:1px
        style C fill:#FFE6CC,stroke: #ff9e3e, stroke-width:1px
        style D fill:#FFE6CC,stroke: #ff9e3e, stroke-width:1px
        style E fill:#E1D5E7,stroke: #9673A6, stroke-width:1px

```

- **Application**: Bootstrap the application.

- **Cronjob**: The entity responsible for running the actions based on a timer, a repassing the data to the **_watchers_**.

- **Watchers**: They are responsible for watching the data a moving them accordingly to the resolvers (if needed), they are also responsible for logging the data (if needed), basically a cronjob can have multiple watchers, and a watcher can have multiple resolvers.

- **Resolvers**: Gather the data from the watchers to act on it, either applying a strategy, storing some data, basically where the action is.

- **Data source**: Source of market data.
