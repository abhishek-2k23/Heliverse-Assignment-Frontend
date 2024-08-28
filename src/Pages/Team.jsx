import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setTeamList } from '../redux_store/slices/team.slice';

const api_url = import.meta.env.VITE_API_URL;

const Team = () => {
  const [newTeamName, setNewTeamName] = useState('');
  const [showTeamMembers, setShowTeamMembers] = useState({});
  
  const team_list = useSelector((store) => store.team.team_list);
  const dispatch = useDispatch();

  const handleCreateTeam = async () => {
    try {
      // Create new team with team_name
      const response = await axios.post(`${api_url}/team/create`, { team_name: newTeamName });
      // Update the team list in the Redux store
      dispatch(setTeamList([...team_list, response.data]));
      setNewTeamName(''); // Clear input after successful creation
    } catch (error) {
      console.error('Error creating team:', error);
    }
  };

  const toggleShowTeamMembers = (teamId) => {
    setShowTeamMembers((prevState) => ({
      ...prevState,
      [teamId]: !prevState[teamId]
    }));
  };

  if (!team_list || team_list.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col p-4">
        <p className="text-lg mb-4">No teams available.</p>
        <input
          type="text"
          value={newTeamName}
          onChange={(e) => setNewTeamName(e.target.value)}
          placeholder="Enter team name"
          className="border p-2 rounded mb-4"
        />
        <button
          onClick={handleCreateTeam}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Create Team
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Teams</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {team_list.map((team) => (
          <div key={team.team_id} className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">{team.team_name}</h2>
            <button
              onClick={() => toggleShowTeamMembers(team.team_id)}
              className="mt-2 bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
            >
              {showTeamMembers[team.team_id] ? 'Hide Members' : 'Show Members'}
            </button>
            {showTeamMembers[team.team_id] && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-2">Members:</h3>
                <ul>
                  {team.users.map((user) => (
                    <li key={user.id} className="border-b py-2">
                      <p><strong>Name:</strong> {user.name}</p>
                      <p><strong>Email:</strong> {user.email}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
