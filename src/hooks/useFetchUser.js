import { useSelector, useDispatch } from "react-redux";
import { setUsers, setTotalPages, setCurrentPage,setDomainList, setRefreshData } from "../redux_store/slices/user.slice";
import axios from "axios";
import { useEffect } from "react";
const api_url = import.meta.env.VITE_API_URL;

export const useFetchUser =  () => {
    const dispatch = useDispatch();
    const currentPage = useSelector((store) => store.users.currentPage);
    const refreshData = useSelector((store) => store.users.refreshData);

    const fetchUser = async() => {try{
        const res = await axios.get(`${api_url}/users?page=${currentPage || 1}&limit=20`);
        console.log("fetched data in hook : ", res);
  
        //set data to the redux
        dispatch(setUsers(res?.data?.users))
  
        //set the domain list
        dispatch(setDomainList(res?.data?.domain_list))
  
        //set the total pages
        dispatch(setTotalPages(res?.data?.totalPages));
  
        //set the current page
        dispatch(setCurrentPage(res?.data?.currentPage))
        
        //set the refresh data to false
        dispatch(setRefreshData(false))
      }catch(e){
        console.error(e.message);
      }
    }
    useEffect(() => {
        fetchUser();
    },[refreshData])
}