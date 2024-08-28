import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  setCreateTeam,
  setNewTeamName,
  setShowTeamMembers,
} from "../redux_store/slices/team.slice"
import { useFetchTeam } from "../hooks/useFetchTeam"
import Loader from "../components/Loader"
import TeamCard from "../components/TeamCard"

const Team = () => {
  //custorm hook
  const { handleCreateTeam,handleFetchTeam } = useFetchTeam()

  useEffect(()=> {
    handleFetchTeam();
  },[])

  const team_list = useSelector((store) => store?.team?.team_list)
  const create_team = useSelector((store) => store?.team?.create_team)
  const newTeamName = useSelector((store) => store?.team?.newTeamName)
  const showTeamMembers = useSelector((store) => store?.team?.showTeamMembers)
  const teamLoading = useSelector((store) => store?.team?.teamLoading)

  const dispatch = useDispatch()
  if(teamLoading){
    return <div className="min-h-screen bg-gray-900"><Loader /></div>
  }
    //no team available case
  if (!team_list || team_list?.length === 0) {
    return (
      <div className="h-screen bg-gray-900 text-white flex items-center justify-center flex-col p-4">
        {!create_team && (
          <div className="flex flex-col justify-center">
            <p className="text-xl font-semibold mb-4">No teams available.</p>

            <button
              onClick={() => dispatch(setCreateTeam(true))}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Create Team
            </button>
          </div>
        )}
        {create_team && (
          <div className="flex flex-col gap-1">
            <h1 className="font-semibold md:text-xl text-lg mb-1 tracking-wide">
              Enter your team name :{" "}
            </h1>
            <input
              type="text"
              value={newTeamName}
              onChange={(e) => dispatch(setNewTeamName(e?.target?.value))}
              placeholder="Enter team name"
              className="border p-2 rounded mb-4 text-gray-900"
            />
            <button
              onClick={() => handleCreateTeam()}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              submit
            </button>
          </div>
        )}
      </div>
    )
  }

  //show the teams
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-black dark:text-white tracking-wider">

      <div className=" flex justify-between mb-2">
        
      <h1 className="text-2xl font-bold">Teams</h1>
      {!create_team ? <button
              onClick={() => dispatch(setCreateTeam(true))}
              className="bg-blue-500 text-white  px-4 rounded hover:bg-blue-600"
            >
              Create Team
            </button> : (
          <div className="flex md:flex-row md:justify-center md:items-center md:gap-4 flex-col ">
            

            <input
              type="text"
              value={newTeamName}
              onChange={(e) => dispatch(setNewTeamName(e?.target?.value))}
              placeholder="Enter team name"
              className="border p-2 rounded mb-4 text-gray-900 "
            />
            
            
            <button
              onClick={() => handleCreateTeam()}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              submit
            </button>
          </div>
        )}
      </div>
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
    {team_list?.map((team) => (
     <TeamCard key={team?.team_id} team={team}/>
    ))}
  </div>
</div>


  )
}

export default Team
