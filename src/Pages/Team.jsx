import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  setCreateTeam,
  setNewTeamName,
  setShowTeamMembers,
} from "../redux_store/slices/team.slice"
import { useFetchTeam } from "../hooks/useFetchTeam"
import Loader from "../components/Loader"

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
    {teamLoading? <Loader /> : team_list?.map((team) => (
      <div
        key={team?.team_id}
        className={`bg-white p-4 rounded-lg shadow-lg text-gray-900 transition-transform duration-300 ${
          showTeamMembers === team?.team_name ? "row-span-2" : "self-start"
        }`}
      >
        <div className="flex justify-between px-2 items-center"><h2 className="text-xl font-semibold">{team?.team_name}</h2>
        <button
          onClick={() => dispatch(setShowTeamMembers(team?.team_name))}
          className="mt-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
        >
          {showTeamMembers === team?.team_name ? "Hide Members" : "Show Members"}
        </button> </div>
        
        {showTeamMembers === team?.team_name && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Members:{` ${team?.users?.length}`}</h3>
            <ul>
              {team?.users?.map((user) => (
                <li key={user?.id} className="border-b border-gray-900 py-2">
                  <p>
                    <strong>Name:</strong>{" "}
                    {`${user?.first_name} ${user?.last_name} `}
                  </p>
                  <p>
                    <strong>Email:</strong> {user?.email}
                  </p>
                  <p>
                    <strong>Domain:</strong> {user?.domain}
                  </p>
                  <p>
                    <strong>Gender:</strong> {user?.gender}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    ))}
  </div>
</div>


  )
}

export default Team
