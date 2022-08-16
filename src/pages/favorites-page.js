import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/others/header";
import Hero from "../components/others/hero";
import TableBox from "../components/coins/table-box";

function FavoritesPage() {
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const pageSize = 100;
  const findPageCount = (data) =>
    setPageCount(Math.ceil(data.length / pageSize));

  const updateData = function (data) {
    const marketData = data.market_data;
    return {
      ...data,
      market_cap_rank: data.market_cap_rank,
      image: data.image.large,
      current_price: marketData.current_price.usd,
      price_change_percentage_1h_in_currency:
        marketData.price_change_percentage_1h_in_currency.usd,
      price_change_percentage_24h_in_currency:
        marketData.price_change_percentage_24h_in_currency.usd,
      price_change_percentage_7d_in_currency:
        marketData.price_change_percentage_7d_in_currency.usd,
      total_volume: marketData.total_volume.usd,
      market_cap: marketData.market_cap.usd,
    };
  };

  const fetchData = async function (favorites) {
    return await Promise.all(
      Object.keys(favorites).map(async (coinID) => {
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/${coinID}`
          );
          const updatedData = updateData(response.data);
          return updatedData;
        } catch (err) {
          console.error(err);
        }
      })
    );
  };

  useEffect(() => {
    async function consolidateData() {
      const favorites = localStorage;
      let response = await fetchData(favorites);
      response = response.sort((a, b) => (a.rank > b.rank ? 1 : -1));
      console.log(response);
      setData(response);
      findPageCount(data);
    }
    consolidateData();
  }, []);

  return (
    // Replace className App with something else
    <div className="App">
      <Header></Header>
      <Hero></Hero>
      <TableBox
        data={data}
        setData={setData}
        page={page}
        setPage={setPage}
        pageCount={pageCount}
      ></TableBox>
    </div>
  );
}

export default FavoritesPage;

// const favoriteCoins = coins.filter((coin) => coin.id in favorites);
// console.log(favorites);

// Rename table-display to coins-table
// Add an exchange-table
// Use conditional operator in table-box to display coins-table or
// exchange-table
