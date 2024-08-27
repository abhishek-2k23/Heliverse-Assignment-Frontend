import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilterOption, setShowFilterMenu } from "../redux_store/slices/nav.slice";
import { setUsers,setTotalPages, setCurrentPage, setRefreshFilterData} from "../redux_store/slices/user.slice";

import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

export const useFetchFilterData = () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((store) => store.users.currentPage);
    const refreshFilterData = useSelector((store) => store.users.refreshFilterData);
    const navStates = useSelector((store) => store.nav);
    const { filterOption, activeFilterCategory } = navStates;



    //handle filter data
    const handleFilterSelect = async () => {
        dispatch(setShowFilterMenu(false));
        console.log("filter cat : ", activeFilterCategory);
        console.log(`Filtering by: ${activeFilterCategory}`);
        const res = await axios.get(`${api_url}/users?page=${currentPage}&limit=20&${filterOption.toLowerCase()}=${activeFilterCategory}`);
        console.log(res);
    
        //set users data
        dispatch(setUsers(res?.data?.users));
    
        //set the total pages 
        dispatch(setTotalPages(res?.data?.totalPages))
    
        //set the current page
        dispatch(setCurrentPage(res?.data?.currentPage))

        //set the filter refresh data false
        dispatch(setRefreshFilterData(false))
      };

      //call the filter data
    useEffect(() => {
        handleFilterSelect();
    },[refreshFilterData, activeFilterCategory])
}