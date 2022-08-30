import React, { useEffect, useLayoutEffect, useState } from "react";
import axios from "axios";
import currencyContext from "../contexts/currency-context";
import favoritesContext from "../contexts/favorites-context";
import Header from "../components/others/header/header";
import Hero from "../components/others/hero/hero";
import TableBox from "../components/coins/table-box";

function CoinsPage() {
  const [data, setData] = useState([]); // replace with "paginatedData"
  const [fullDataList, setFullDataList] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);
  // Included the following + context provider in coins-page.js too because
  // otherwise favorite.js will complain since it cannot consume anything
  // without a provider first
  const [currencyName, setCurrencyName] = useState("usd");
  const [currencySymbol, setCurrencySymbol] = useState("$");
  const [favoritesChanged, setFavoritesChanged] = useState(false);

  const pageSize = 100;
  const findPageCount = (coinsCount) =>
    setPageCount(Math.ceil(coinsCount / pageSize));

  // Initialize all data that will be retrieved from localStorage
  useEffect(() => {
    // Favorites data
    localStorage.getItem("favorites") ||
      localStorage.setItem("favorites", "[]");
    // Currency data
    if (localStorage.getItem("currency")) {
      setCurrencyName(JSON.parse(localStorage.getItem("currency"))["name"]);
      setCurrencySymbol(JSON.parse(localStorage.getItem("currency"))["symbol"]);
    }
    if (!localStorage.getItem("currency")) {
      localStorage.setItem(
        "currency",
        JSON.stringify({ name: currencyName, symbol: currencySymbol })
      );
    }
  }, [currencyName]);

  // Retrieve total number of coins
  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/global")
      .then((response) => {
        findPageCount(response.data.data.active_cryptocurrencies);
        console.log(response.data.data.active_cryptocurrencies);
      })
      .catch((err) => console.log(err));
  }, []); // findPageCount - if included, runs too many times (remove []?)

  // Retrieve data of 100 coins on specific page
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencyName}&order=market_cap_desc&per_page=${pageSize}&page=${page}&sparkline=false&price_change_percentage=1h%2C24h%2C7d`
      )
      .then((response) => {
        console.log(response.data);
        // setData(addRankToCoins(response.data));
        setData(response.data);
      })
      .catch((err) => console.error(err));
  }, [page, currencyName]); // This will run everytime page changes.

  // Retrieve full list of coins (necessary for search mechanism)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/list"
        );
        setFullDataList(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  return (
    // See explanation above for following. This does nothing but prevent
    // a context error in favorite.js
    <currencyContext.Provider
      value={[currencyName, setCurrencyName, currencySymbol, setCurrencySymbol]}
    >
      <favoritesContext.Provider
        value={[favoritesChanged, setFavoritesChanged]}
      >
        {/* Replace className App with something else*/}
        <div className="App">
          <Header></Header>
          <Hero></Hero>
          <TableBox
            data={data}
            setData={setData}
            fullDataList={fullDataList}
            page={page}
            setPage={setPage}
            pageCount={pageCount}
            setPageCount={setPageCount}
          ></TableBox>
        </div>
      </favoritesContext.Provider>
    </currencyContext.Provider>
  );
}

export default CoinsPage;
