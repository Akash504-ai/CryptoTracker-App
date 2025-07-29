import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Common/Header";
import TabsComponent from "../components/Dashboard/Tabs";
import Search from "../components/Dashboard/Search";
import Pagination from "../components/Dashboard/Pagination";
import Loader from "../components/Common/Loader";
import BackToTop from "../components/Common/BackToTop";

const Dashboard = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // reset to page 1 after search
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false"
        );
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    fetchCoins();
  }, []);

  // Filter coins by name or symbol
  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const coinsPerPage = 10;
  const paginatedCoins = filteredCoins.slice(
    (page - 1) * coinsPerPage,
    page * coinsPerPage
  );

  return (
    <>
      <Header />
      <BackToTop />
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={paginatedCoins} />
          <Pagination
            page={page}
            handelPageChange={handlePageChange}
            count={Math.ceil(filteredCoins.length / coinsPerPage)}
          />
        </div>
      )}
    </>
  );
};

export default Dashboard;
