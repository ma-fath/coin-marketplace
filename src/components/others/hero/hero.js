import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import currencyContext from "../../../contexts/currency-context";
import StatisticCard from "../statistic-card/statistic-card";
import "./hero.css";

function Hero() {
  const [currencyName] = useContext(currencyContext);
  const [marketCap, setMarketCap] = useState(0);
  // const [marketCapChange, setMarketCapChange] = useState(0);
  const [volume, setVolume] = useState(0);
  const [btcDominance, setBtcDominance] = useState(0);
  const [coinsTotal, setCoinsTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/global"
        );
        const data = response.data.data;
        setMarketCap(data.total_market_cap[currencyName]);
        // setMarketCapChange(data.market_cap_change_percentage_24h_usd);
        setVolume(data.total_volume[currencyName]);
        setBtcDominance(data.market_cap_percentage.btc);
        setCoinsTotal(data.active_cryptocurrencies);
        // console.log(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [currencyName]);

  return (
    <div className="hero-section">
      <h1 className="hero-heading">
        An easy way to track and trade cryptocurrencies
      </h1>
      <p className="hero-description">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aperiam
        assumenda atque culpa cum delectus earum enim facere fugit impedit iure
        iusto obcaecati, odio optio possimus praesentium rerum tempore velit!
      </p>
      <div className="hero-stats">
        <StatisticCard
          label="Market Capitalization"
          value={marketCap}
          type={"monetary"}
          // change={marketCapChange}
        ></StatisticCard>
        <StatisticCard
          label="24h Trading Volume"
          value={volume}
          type={"monetary"}
          // change={}
        ></StatisticCard>
        <StatisticCard
          label="Bitcoin Market Cap Dominance"
          value={btcDominance}
          type={"percentage"}
        ></StatisticCard>
        <StatisticCard
          label="Number of Coins"
          value={coinsTotal}
          type={"other"}
        ></StatisticCard>
      </div>
    </div>
  );
}

export default Hero;