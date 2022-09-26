import React, { useState, useMemo, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import {
    searchResultState,
    searchLoading,
    noSearchResult,
} from "recoil-state/state";
import { Table, Loader, Pagination } from '@mantine/core';
import { contactPropsType, Phone } from "@components/SearchBox/searchIndexType";

const RenderContactList: React.FC = () => {
    const resultList = useRecoilValue<contactPropsType[]>(searchResultState);
    const loading = useRecoilValue(searchLoading);
    const noresult = useRecoilValue(noSearchResult);

    const listItemsPerPage = 50;
    const totalPage = Math.ceil(resultList.length / listItemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentList, setCurrentList] = useState<contactPropsType[]>(resultList.slice(0, 10));

    useMemo(() => {
        setCurrentPage(1)
    }, [resultList])

    useEffect(() => {
        let lastItemIndex = currentPage * listItemsPerPage;
        let firstItemIndex = lastItemIndex - listItemsPerPage;
        const newPageList = resultList.slice(firstItemIndex, lastItemIndex)
        setCurrentList(newPageList);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [currentPage, resultList])

    const rows = currentList.map((element) => (
        <tr key={element.id}>
            <td>{element.id}</td>
            <td>{element.name}</td>
            <td>{element.org}</td>
            <td>{element.email}</td>
            <td>
                {
                    element.phone &&
                    Object.keys(element.phone).map((key, index) => (
                        element.phone && element.phone[key] &&
                        <div key={index} className="flex flex-column">
                            <p className="pr-2">{key === "mm" ? "(+95)" : key === "th" ? "(+66)" : ""}</p>
                            <p>{element.phone[key]}</p>
                        </div>
                    ))
                }
            </td>
            <td>
                <a href={element.website} target="_blank">{element.website}</a>
            </td>
            <td>{element.address}</td>
        </tr>
    ));

    return (
        <div className="flex m-10 items-center justify-center">
            {!loading && noresult ? <p>No Result</p> :
                <div>
                    <Table horizontalSpacing="xl" verticalSpacing="lg" fontSize="md" striped>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Organization</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Website</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>{rows}</tbody>
                    </Table>
                    {loading && <div className="p-10 w-full flex justify-center item-center"><Loader color="gray" /></div>}
                    <div className="flex m-10 justify-center items-center">
                        <Pagination total={totalPage} page={currentPage} boundaries={3} siblings={2} onChange={setCurrentPage} />
                    </div>
                </div>
            }
        </div>
    );
}

export default RenderContactList;