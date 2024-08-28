import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setDeleteTeamId, setShowTeamMembers } from "../redux_store/slices/team.slice"
import { MdDeleteForever } from "react-icons/md"
import ShowTeamMembers from "./ShowTeamMembers"
import { FaAngleDoubleUp } from "react-icons/fa";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useFetchTeam } from "../hooks/useFetchTeam"

const TeamCard = ({ team }) => {
  const showTeamMembers = useSelector((store) => store?.team?.showTeamMembers)
  const dispatch = useDispatch()
  const {deleteTeam} = useFetchTeam();
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-lg text-gray-900 transition-transform duration-300 ${
        showTeamMembers === team?.team_name ? "row-span-2" : "self-start"
      }`}
    >
      <div className="flex justify-between px-2 items-center">
        <h2 className="text-xl font-semibold flex-1">{team?.team_name}</h2>
        <div className="flex justify-end items-center gap-4 w-1/3">
            
        <button
          onClick={() => dispatch(setShowTeamMembers(team?.team_name))}
          className="mt-2  text-gray-900 py-2 rounded-full px-2 rounded hover:bg-gray-300 text-xl"
        >
          {showTeamMembers === team?.team_name
            ? < FaAngleDoubleUp/>
            : <FaAngleDoubleDown />}
        </button>{" "}
        <button onClick={() => {deleteTeam(team?.team_id);}} className="w-8 h-8 rounded-full bg-red-500 text-white hover:bg-white hover:text-red-500 hover:border hover:border-red-600 text-center flex justify-center items-center"><MdDeleteForever /></button>
        </div>
      </div>

      {showTeamMembers === team?.team_name && (
        <ShowTeamMembers teamUsers={team?.users} />
      )}
    </div>
  )
}

export default TeamCard
