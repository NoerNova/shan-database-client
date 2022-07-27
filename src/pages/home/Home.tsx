import React from "react";
import Navbar from "components/navbar/navbar";
import SearchBox from "components/search-box/search-box";
import DisplaySearchResult from "components/search-result/search-result";

function Home() {
  return (
    <>
      <Navbar />
      <SearchBox />
      <DisplaySearchResult />
    </>
  );
}

export default Home;
