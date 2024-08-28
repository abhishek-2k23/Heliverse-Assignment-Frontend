import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {IoCloseSharp} from 'react-icons/io5'
import { setShowTeamView } from "../redux_store/slices/team.slice";
import toast from "react-hot-toast";

const api_url = import.meta.env.VITE_API_URL;

const TeamList = () => {
  const team_list = useSelector((store) => store.team.team_list);
  const user_id = useSelector((store) => store.team.user_id);

  const dispatch = useDispatch();

  const handleTeamSelect = async (id) => {
    try {
      // Ensure the API endpoint matches your backend requirements
      const res = await axios.post(`${api_url}/team/addUser/${id}`, {
        id: user_id,
      });
      console.log(res);
      if(!res?.data?.status){
        toast.error(res?.data?.message)
      }else{
          toast.success(res?.data?.message);
      }
    //   toast.promise(res,{
    //     loading: 'adding to the team',
    //   })
    //   toast.error(res?.data?.message)
      
    } catch (error) {
      console.error('Error adding user to team:', error);
      alert(`${error.message}`)
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 relative">
        <div className="flex justify-between align-middle px-2">
            <h3 className="text-lg font-semibold mb-4">Select a Team</h3>
            <div
              className="absolute top-2 right-2 flex justify-center items-center text-white bg-red-500  w-7 h-7 rounded-full cursor-pointer"
              onClick={() => dispatch(setShowTeamView(false))}
            >
              <IoCloseSharp />
            </div>
        </div>
      <ul>
        {team_list.map((team) => (
          <li
            key={team?.team_id}
            onClick={() => handleTeamSelect(team?.team_id)}
            className="cursor-pointer p-2 border border-gray-400 hover:border-gray-800 rounded-lg hover:bg-gray-200"
          >
            {team?.team_name || 'Unnamed Team'} {/* Adjust to display the correct team name */}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default TeamList;
