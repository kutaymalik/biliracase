<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/your_username/BiLiraCase">
    <img src="public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">BiLiraCase</h3>

  <p align="center">
    An application to display and track real-time cryptocurrency data using Binance API.
    <br />
    <a href="https://github.com/your_username/BiLiraCase"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://spectacular-entremet-f6c0ed.netlify.app">View Demo</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

This project was created for the 'Frontend Developer' position at BiLira. It aims to display a list of cryptocurrencies fetched from the Binance API, along with their real-time price changes.

Here's why:
* **Real-time Updates**: Prices are fetched in real-time from Binance via a WebSocket connection, and all price changes are reflected on the page instantly.
* **Detailed Information**: Details are fetched from Binance's `exchangeInfo` endpoint. An initial state for the coins is created using `React-Redux`.
* **Coin Icons**: Icons are mapped from CoinCap PNGs in the initial state. Only one request per coin is made to display icons. If a coin's icon is not available on CoinCap, a default icon is shown.

### Built With

* [![React][React.js]][React-url]
* [![Redux][Redux.js]][Redux-url]
* [![TypeScript][TypeScript]][TypeScript-url]
* [![Axios][Axios]][Axios-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

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

