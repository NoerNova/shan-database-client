import Navbar from "components/navbar/navbar";
import SearchBox from "components/search-box/search-box";
import DisplaySearchResult from "components/search-result/search-result";

function Home() {
  return (
    <div className="w-screen">
      <Navbar />
      <SearchBox />
      <DisplaySearchResult />
    </div>
  );
}

export default Home;
