import SearchBox from "@components/SearchBox/SearchBox";
import DisplaySearchResult from "@components/DisplaySearchResult/DisplaySearchResult";

function Home() {
  return (
    <div className="w-screen overflow-hidden">
      <SearchBox />
      <DisplaySearchResult />
    </div>
  );
}

export default Home;
