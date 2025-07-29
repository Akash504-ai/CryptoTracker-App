import React, { useEffect, useState } from "react";
import Header from "../components/Common/Header";
import Select from "react-select";
import axios from "axios";
import List from "../components/Dashboard/List";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./compare.css";

const customStyles = {
  control: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    color: "white",
    borderColor: "#0f0",
  }),
  singleValue: (base) => ({
    ...base,
    color: "white",
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: "#1a1a1a",
    color: "#0f0",
  }),
};

const ComparePage = () => {
  const [coins, setCoins] = useState([]);
  const [selectedCoins, setSelectedCoins] = useState([]);
  const [coinData, setCoinData] = useState([]);
  const [expandedDesc, setExpandedDesc] = useState({});

  const fetchCoins = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: { vs_currency: "usd", per_page: 100, page: 1 },
      }
    );
    const options = res.data.map((coin) => ({
      value: coin.id,
      label: coin.name,
    }));
    setCoins(options);
  };

  const fetchCoinDetails = async () => {
    if (selectedCoins.length === 2) {
      const responses = await Promise.all(
        selectedCoins.map((coin) =>
          axios.get(`https://api.coingecko.com/api/v3/coins/${coin.value}`)
        )
      );
      setCoinData(responses.map((res) => res.data));
    }
  };

  const downloadPDF = () => {
    const input = document.getElementById("stats-table");
    html2canvas(input).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(img);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("coin-comparison.pdf");
    });
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  useEffect(() => {
    if (selectedCoins.length === 2) fetchCoinDetails();
  }, [selectedCoins]);

  const aiSummaries = {
    bitcoin:
      "Bitcoin is the first and most well-known cryptocurrency, often called digital gold.",
    ethereum:
      "Ethereum enables smart contracts and decentralized applications on a global scale.",
    binancecoin:
      "Binance Coin powers the Binance exchange and supports trading fee discounts.",
    solana:
      "Solana is a fast, low-cost blockchain supporting decentralized applications and DeFi.",
    cardano:
      "Cardano uses a proof-of-stake model and emphasizes academic research and scalability.",
    dogecoin:
      "Dogecoin started as a meme but is now used for tipping and small payments.",
    ripple:
      "Ripple (XRP) facilitates instant cross-border payments using blockchain technology.",
    polkadot:
      "Polkadot connects blockchains and allows them to share data securely.",
    litecoin:
      "Litecoin is a faster, cheaper alternative to Bitcoin for digital payments.",
    tron: "TRON aims to build a decentralized internet through smart contracts and content sharing.",
    chainlink:
      "Chainlink provides reliable data feeds to smart contracts via decentralized oracles.",
    stellar:
      "Stellar enables low-cost cross-border payments, targeting unbanked populations.",
    avalanche:
      "Avalanche is a highly scalable platform for DeFi and enterprise blockchain apps.",
    uniswap:
      "Uniswap is a decentralized exchange for swapping Ethereum-based tokens.",
    wrappedbitcoin:
      "Wrapped Bitcoin brings Bitcoin's value to the Ethereum network as an ERC-20 token.",
    cosmos:
      "Cosmos aims to create an internet of blockchains that can communicate with each other.",
    monero:
      "Monero is a privacy-focused cryptocurrency that hides sender, receiver, and amount.",
    algorand:
      "Algorand offers quick transactions and is designed for large-scale enterprise use.",
    vechain:
      "VeChain focuses on blockchain logistics and supply chain management solutions.",
    internetcomputer:
      "Internet Computer is a blockchain that runs at web speed with internet-scale apps.",
    filecoin:
      "Filecoin is a decentralized storage network incentivizing users to share unused space.",
    thegraph:
      "The Graph indexes blockchain data and makes it easily accessible for dApps.",
    aave: "Aave is a decentralized lending protocol where users can borrow or lend crypto.",
    tezos:
      "Tezos is a self-upgrading blockchain platform for smart contracts and dApps.",
    theta:
      "Theta is a blockchain network for video streaming and content delivery.",
    elrond:
      "Elrond is a highly scalable blockchain for distributed apps, enterprise use cases, and the new internet economy.",
    neo: "NEO is known as Ethereum of China and focuses on digital identity and smart contracts.",
    iota: "IOTA uses a unique Tangle architecture ideal for IoT data transfer and zero fees.",
    quant:
      "Quant enables interoperability between blockchains via its Overledger technology.",
    hedera:
      "Hedera Hashgraph is an enterprise-grade network for fast and secure decentralized apps.",
    dash: "Dash offers fast, low-cost payments with optional privacy features.",
    waves:
      "Waves is a blockchain for custom token creation and decentralized exchange.",
    chiliz:
      "Chiliz allows fans to buy voting power in sports teams through blockchain.",
    zcash:
      "Zcash is a privacy-oriented cryptocurrency with shielded transaction capabilities.",
    enjincoin:
      "Enjin Coin supports blockchain-based gaming with tokenized virtual assets.",
    decentraland:
      "Decentraland is a virtual reality platform powered by the Ethereum blockchain.",
    eos: "EOS supports commercial-scale dApps with zero transaction fees and high throughput.",
    pancakeswap:
      "PancakeSwap is a decentralized exchange built on Binance Smart Chain.",
    kusama:
      "Kusama is Polkadot’s canary network for testing new features in a real environment.",
    helium:
      "Helium is building a decentralized wireless network for IoT devices.",
    celsius:
      "Celsius is a DeFi platform for earning interest on crypto and borrowing assets.",
    basicattentiontoken:
      "BAT is used in the Brave browser to reward users and content creators.",
    blockstack:
      "Stacks brings smart contracts and dApps to Bitcoin through its layer-1 solution.",
    curvedao_token:
      "Curve focuses on stablecoin trading with low fees and minimal slippage.",
    ankr: "Ankr provides decentralized cloud computing and Web3 infrastructure services.",
    loopring:
      "Loopring enables fast and cheap decentralized trading through zkRollups.",
    nexo: "Nexo is a platform offering instant crypto loans and high-yield savings.",
    harmony:
      "Harmony is a fast and scalable blockchain for decentralized apps.",
    "1inch":
      "1inch is a DEX aggregator that finds the best prices across multiple exchanges.",
    "ocean-protocol":
      "Ocean Protocol enables secure and transparent data sharing in a decentralized way.",
  };

  return (
    <div>
      <Header />
      <div className="compare-container">
        <h2 className="title">Compare Cryptocurrencies</h2>
        <Select
          styles={customStyles}
          isMulti
          options={coins}
          value={selectedCoins}
          onChange={(selected) => {
            if (selected.length <= 2) {
              setSelectedCoins(selected);
            }
          }}
          placeholder="Select any 2 coins"
        />

        <div className="coin-section">
          {coinData.map((coin) => (
            <div key={coin.id} className="coin-block">
              <List
                coin={{
                  image: coin.image.small,
                  name: coin.name,
                  symbol: coin.symbol.toUpperCase(),
                  current_price: coin.market_data.current_price.usd,
                  market_cap: coin.market_data.market_cap.usd,
                  price_change_percentage_24h:
                    coin.market_data.price_change_percentage_24h,
                  total_volume: coin.market_data.total_volume.usd,
                }}
              />

              <div className="description">
                <h3>Description</h3>
                {coin.description.en.length > 300 ? (
                  <>
                    <p>
                      {expandedDesc[coin.id]
                        ? coin.description.en
                        : `${coin.description.en.substring(0, 300)}...`}
                    </p>
                    <span
                      className="toggle"
                      onClick={() =>
                        setExpandedDesc((prev) => ({
                          ...prev,
                          [coin.id]: !prev[coin.id],
                        }))
                      }
                    >
                      {expandedDesc[coin.id] ? "Read Less" : "Read More"}
                    </span>
                  </>
                ) : (
                  <p>{coin.description.en}</p>
                )}
              </div>

              <div className="ai-summary">
                <h3>AI Summary</h3>
                <p>
                  {aiSummaries[coin.id] ||
                    "Summary not available for this coin."}
                </p>
              </div>
            </div>
          ))}
        </div>

        {coinData.length === 2 && (
          <>
            <div className="table-container">
              <h3>Comparison Stats</h3>
              <div id="stats-table" className="stats-grid">
                <div className="header">Metric</div>
                {coinData.map((coin) => (
                  <div className="header" key={coin.id}>
                    {coin.name}
                  </div>
                ))}
                {[
                  ["Current Price", "current_price.usd"],
                  ["Market Cap", "market_cap.usd"],
                  ["24h Volume", "total_volume.usd"],
                  ["24h Change", "price_change_percentage_24h"],
                  ["Circulating Supply", "circulating_supply"],
                  ["Max Supply", "max_supply"],
                ].map(([label, key]) => (
                  <React.Fragment key={label}>
                    <div className="label">{label}</div>
                    {coinData.map((coin) => {
                      const keys = key.split(".");
                      let value = coin.market_data;
                      keys.forEach((k) => (value = value?.[k]));
                      return (
                        <div key={coin.id + label}>
                          {value
                            ? typeof value === "number"
                              ? value.toLocaleString()
                              : value
                            : "N/A"}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
              <button onClick={downloadPDF} className="download-btn">
                Download as PDF
              </button>
            </div>

            <div className="timeline-container">
              <h3>Price Change Timeline</h3>
              <div className="stats-grid">
                <div className="header">Timeframe</div>
                {coinData.map((coin) => (
                  <div className="header" key={coin.id}>
                    {coin.name}
                  </div>
                ))}
                {[
                  ["24h", "price_change_percentage_24h"],
                  ["7 Days", "price_change_percentage_7d"],
                  ["30 Days", "price_change_percentage_30d"],
                  ["1 Year", "price_change_percentage_1y"],
                ].map(([label, key]) => (
                  <React.Fragment key={label}>
                    <div className="label">{label}</div>
                    {coinData.map((coin) => {
                      const value = coin.market_data[key];
                      return (
                        <div
                          key={coin.id + label}
                          style={{
                            color: value > 0 ? "#0f0" : "#f00",
                          }}
                        >
                          {value ? `${value.toFixed(2)}%` : "N/A"}
                        </div>
                      );
                    })}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ComparePage;
