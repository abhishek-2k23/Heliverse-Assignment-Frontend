import axios from 'axios';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsEditing } from '../redux_store/slices/user.slice';
const api_url = import.meta.env.VITE_API_URL;


const UserCard = ({ user, fetchUser }) => {
  const isEditing = useSelector((store) => store.users.isEditing);
  const dispatch = useDispatch();

  //set form data
  const [formData, setFormData] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    domain: user?.domain,
    available: user?.available,
  });

  //input field handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //update the user data
  const handleUpdate = async (id) => {
    try{
      const response = await axios.put(`${api_url}/users/${id}`, formData);
      console.log("handleUpdate : ",response);
      dispatch(setIsEditing(false));
      fetchUser();
    }catch(e){
      console.error(e)
    }
  };

  //delete the user
  const handleDelete = async (id) => {
    const response = await axios.delete(`${api_url}/users/${id}`);
    console.log("Delete response : ",response)
    fetchUser();
  }

  return (
    <div className="p-4 bg-white rounded shadow-md flex flex-col items-center">
      <img className="w-24 h-24 rounded-full" src={user?.avatar} alt={`${user?.first_name} ${user?.last_name}`} />
      <div className="mt-4 text-center">
        {isEditing ? (
          <>
            <input
              className="border p-2 rounded mb-2"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded mb-2"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded mb-2"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded mb-2"
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
            />
            <button
              className="bg-blue-500 text-white p-2 rounded"
              onClick={() => handleUpdate(user?.id)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{`${user?.first_name} ${user?.last_name}`}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-gray-600">{user?.domain}</p>
            <p className={`mt-2 ${user?.available ? 'text-green-500' : 'text-red-500'}`}>
              {user?.available ? 'Available' : 'Not Available'}
            </p>
            <div className="flex mt-4 space-x-2">
              <button
                className="bg-yellow-500 text-white p-2 rounded"
                onClick={() => dispatch(setIsEditing(true))}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => handleDelete(user?.id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserCard;
