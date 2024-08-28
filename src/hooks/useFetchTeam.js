import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTeamList } from "../redux_store/slices/team.slice";

import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

export const useFetchTeam = () => {
    const dispatch = useDispatch();
    const user_id = useSelector((store) => store.team.user_id);
    const show_team_view = useSelector((store) => store.team.show_team_view);
    const [fetch, setFetch] = useState(true);



    //handle filter data
    const handleFetchTeam = async () => {
        const res = await axios.get(`${api_url}/team/getTeam`);
        console.log(res);

        //set users data
        dispatch(setTeamList(res?.data?.teams));
    
      };

      useEffect(() => {
        if (fetch && show_team_view) {
            handleFetchTeam();
            setFetch(false); // Reset state after fetching
        }
      },[show_team_view, fetch])

    return {handleFetchTeam};
}