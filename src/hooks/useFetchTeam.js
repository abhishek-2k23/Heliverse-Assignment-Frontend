import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTeamList, setNewTeamName, setShowTeamMembers, setShowTeamView, setCreateTeam, setTeamLoading} from "../redux_store/slices/team.slice";
import toast from 'react-hot-toast'

import axios from "axios";
const api_url = import.meta.env.VITE_API_URL;

export const useFetchTeam = () => {
    const dispatch = useDispatch();
    const user_id = useSelector((store) => store.team.user_id);
    const show_team_view = useSelector((store) => store.team.show_team_view);

    const [fetch, setFetch] = useState(true);

    const newTeamName = useSelector((store) => store?.team?.newTeamName);

    //handle filter data
    const handleFetchTeam = async () => {
        dispatch(setTeamLoading(true));
        const res = await axios.get(`${api_url}/team/getTeam`);
        
        //set users data
        dispatch(setTeamList(res?.data?.teams));
        dispatch(setTeamLoading(false));
    
      };

      const handleCreateTeam = async () => {
        try {
          // Create new team with team_name
          const res = await axios?.post(`${api_url}/team/create`, { team_name: newTeamName });

          // Update the team list in the Redux store
          handleFetchTeam();

          if(!res.status){
            toast.error(res?.message);
          }else{
            toast.success(res?.data?.message);
          }
          dispatch(setNewTeamName('')); // Clear input after successful creation
          dispatch(setCreateTeam(false))
        } catch (error) {
          console?.error('Error creating team:', error);
        }
      };
    
      const toggleShowTeamMembers = (teamId) => {
        dispatch(setShowTeamMembers((prevState) => ({
          ...prevState,
          [teamId]: !prevState[teamId]
        })));
      };

      const handleTeamSelect = async (id) => {
        try {
          const res = await axios.post(`${api_url}/team/addUser/${id}`, {
            id: user_id,
          });
          console.log(res);
          if(res?.data?.toast === 'success'){
              toast.success(res?.data?.message,{duration: 1500});
              dispatch(setShowTeamView(false))
          }else{
            toast.error(res?.data?.message, {duration: 1800})
          }
          
        } catch (error) {
          console.error('Error adding user to team:', error);
          toast.error(error.message)
        }
      };

      useEffect(() => {
        if (fetch && show_team_view) {
            handleFetchTeam();
            setFetch(false); // Reset state after fetching
        }
      },[show_team_view, fetch])

    return {handleFetchTeam, handleCreateTeam, toggleShowTeamMembers, handleTeamSelect};
}