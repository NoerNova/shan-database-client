import SearchBox from "@components/SearchBox/SearchBox";
import RenderStaffsList from "./components/RenderStaffsList";

function StaffList() {
  return (
    <div className="w-screen overflow-hidden">
      <SearchBox searchSession="staffs" />
      <RenderStaffsList />
    </div>
  );
}

export default StaffList;
