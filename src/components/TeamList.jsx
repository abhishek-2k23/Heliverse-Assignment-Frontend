import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {IoCloseSharp} from 'react-icons/io5'
import { setShowTeamView } from "../redux_store/slices/team.slice";
import toast from "react-hot-toast";
import { useFetchTeam } from "../hooks/useFetchTeam";

const api_url = import.meta.env.VITE_API_URL;

const TeamList = () => {
  const team_list = useSelector((store) => store.team.team_list);
  const user_id = useSelector((store) => store.team.user_id);

  const dispatch = useDispatch();

  const {handleTeamSelect} = useFetchTeam();

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
            className="cursor-pointer mb-2 p-2 border border-gray-400 hover:border-gray-800 rounded-lg hover:bg-gray-200"
          >
            {team?.team_name || 'Unnamed Team'} {/* Adjust to display the correct team name */}
          </li>
        ))}
      </ul>
      
    </div>
  );
};

export default TeamList;
