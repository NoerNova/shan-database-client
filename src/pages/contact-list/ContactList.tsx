import SearchBox from "@components/SearchBox/SearchBox";

import { Table } from '@mantine/core';

function ContactList() {
  return (
    <div className="w-screen overflow-hidden">
      <SearchBox searchSession="contacts" />
      <h2>ContactList</h2>
    </div>
  );
}

export default ContactList;
