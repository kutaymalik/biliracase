<h1 align="center">BiLiraCase</h1>
  <p align="center">
    An application to display and track real-time cryptocurrency data using Binance API.
    <br />
  </p>


<!-- ABOUT THE PROJECT -->
## About The Project
![Ekran görüntüsü 2024-07-06 160008](https://github.com/kutaymalik/biliracase/assets/56682209/d05491a5-96eb-4715-9caf-100cbc7f2367)

This project was created for the 'Frontend Developer' position at BiLira. It aims to display a list of cryptocurrencies fetched from the Binance API, along with their real-time price changes.

Here's why:
* **Real-time Updates**: Prices are fetched in real-time from Binance via a WebSocket connection, and all price changes are reflected on the page instantly.
* **Detailed Information**: Details are fetched from Binance's `exchangeInfo` endpoint. An initial state for the coins is created using `React-Redux`.
* **Coin Icons**: Icons are mapped from CoinCap PNGs in the initial state. Only one request per coin is made to display icons. If a coin's icon is not available on CoinCap, a default icon is shown.

### Built With

* [[![React][React.js]][React-url]](https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png)
* [[![Redux][Redux.js]][Redux-url]](https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png)
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Axios][Axios]][Axios-url]

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

  ### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/your_username/BiLiraCase.git


2. Install NPM packages
   ```sh
   npm install --force

3. Create a .env file in the root directory with the following content:
   ```sh
   REACT_APP_API_URL=https://api.binance.com/api/v3/ticker/24hr
   REACT_APP_EXCHANGE_INFO_URL=https://api.binance.com/api/v3/exchangeInfo
   REACT_APP_KLINE_URL=https://api.binance.com/api/v3/klines
   
4. Start the development server
   ```sh
   npm start

