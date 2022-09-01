import React, { useState, useMemo, useEffect } from 'react';
import { useRecoilValue } from "recoil";
import {
    searchResultState,
    searchLoading,
    noSearchResult,
} from "recoil-state/state";
import { Table, Loader, Pagination } from '@mantine/core';
import { staffPropsType } from "@components/SearchBox/searchIndexType";

const RenderStaffList: React.FC = () => {
    const resultList = useRecoilValue<staffPropsType[]>(searchResultState);
    const loading = useRecoilValue(searchLoading);
    const noresult = useRecoilValue(noSearchResult);

    const listItemsPerPage = 50;
    const totalPage = Math.ceil(resultList.length / listItemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentList, setCurrentList] = useState<staffPropsType[]>(resultList.slice(0, 10));

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
            <td>{element.department}</td>
            <td>{element.email}</td>
            <td>
                {
                    element.phone &&
                    Object.keys(element.phone).map((key, index) => (
                        element.phone && element.phone[key] &&
                        <div key={index} className="flex flex-column">
                            <p className="pr-2">{key}:</p>
                            <p>{element.phone[key]}</p>
                        </div>
                    ))
                }
            </td>
            <td>{element.address}</td>
            <td>
                {
                    element.equipment &&
                    element.equipment.map(item => (
                        Object.keys(item).map((key, index) => (
                            <div key={index} className="flex flex-column">
                                <p className="pr-2">{key}:</p>
                                <p>{item[key]}</p>
                            </div>
                        ))
                    ))
                }
            </td>
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
                                <th>Department</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Equipment</th>
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

export default RenderStaffList;