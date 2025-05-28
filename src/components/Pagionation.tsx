import {Box, CircularProgress, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import PaginationControls from "./PaginationControls";
import {useSearchParams} from "react-router-dom";
import {PageRequestArgs, PageResponse} from "../utils/pageable.utils";

interface PaginationProps<T> {
    render: (item: T, onRefresh: () => Promise<void> | void) => React.ReactElement;
    fetchData: (page: PageRequestArgs) => Promise<PageResponse<T>>;
}

function Pagination<T>({fetchData, render}: PaginationProps<T>) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [items, setItems] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(Number(searchParams.get('page')) || 1);
    const [search, setSearch] = useState(searchParams.get('search') || '');
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        getData();
    }, [pageNumber, search]);


    const getData = async () => {
        setLoading(true);
        try {
            const items = await fetchData({
                pageNumber,
                pageSize: 10,
                search,
                sortBy: {id: "asc"}
            })
            setItems(items.content)
            setPageCount(items.pageCount);
            setLoading(false);
        } catch (e) {

        } finally {
            setLoading(false);
        }

    }

    const handleSearchChange = (value: string) => {
        setSearch(value);
        setSearchParams({search: value, page: '1'});
        setPageNumber(1);
    };


    return (<Box p={3}>
        <SearchBar value={search} onChange={handleSearchChange}/>


        {loading ? (<Box textAlign="center" mt={4}><CircularProgress/></Box>) : items.length === 0 ? (
            <Typography mt={4} align="center">No messages found</Typography>) : (
            <Box mt={2} display="flex" flexDirection="column" gap={2}>
                {items.map((item => (render(item, getData))))}
            </Box>)}


        <PaginationControls
            page={pageNumber}
            totalPages={pageCount}
            onPageChange={(newPage) => {
                setPageNumber(newPage);
                setSearchParams({search, page: newPage.toString()});
            }}
        />
    </Box>)
}

export default Pagination

