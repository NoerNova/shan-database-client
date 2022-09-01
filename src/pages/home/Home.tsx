import SearchBox from "@components/SearchBox/SearchBox";
import DisplaySearchResult from "@pages/home/components/DisplaySearchResult";

function Home() {
  return (
    <div className="w-screen overflow-hidden">
      <SearchBox searchSession="databases" />
      <DisplaySearchResult />
    </div>
  );
}

export default Home;
