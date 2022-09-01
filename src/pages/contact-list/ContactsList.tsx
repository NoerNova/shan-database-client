import SearchBox from "@components/SearchBox/SearchBox";

import RenderContactList from './components/RenderContactList';

function ContactList() {
  return (
    <div className="w-screen overflow-hidden">
      <SearchBox searchSession="contacts" />
      <RenderContactList />
    </div>
  );
}

export default ContactList;
