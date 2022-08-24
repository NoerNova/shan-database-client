import Navbar from "@components/NabBar/NavBar";
import SearchBox from "@components/SearchBox/SearchBox";
import DisplaySearchResult from "@components/DisplaySearchResult/DisplaySearchResult";

function Home() {
  return (
    <div className="w-screen overflow-hidden">
      <Navbar />
      <SearchBox />
      <DisplaySearchResult />
    </div>
  );
}

export default Home;
