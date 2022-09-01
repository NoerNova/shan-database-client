import SearchBox from "@components/SearchBox/SearchBox";

function StaffList() {
  return (
    <div className="w-screen overflow-hidden">
      <SearchBox searchSession="staff" />
      <h2>Staff List</h2>
    </div>
  );
}

export default StaffList;
