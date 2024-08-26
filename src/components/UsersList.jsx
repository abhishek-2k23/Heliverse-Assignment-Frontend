// src/components/UserList.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers, deleteUser } from '../redux_store/slices/user.slice';
import axios from 'axios';
const api_url = import.meta.env.VITE_API_URL;
import UsersCard from '../components/UserCard';

const UserList = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  const [editingUserId, setEditingUserId] = useState(null);
  const [formData, setFormData] = useState({});

  


  const fetchUser = async() => {
    try{
      const userData = await axios.get(`${api_url}/users?page=${1}&limit=20`);
      console.log("fetched user data : ", userData);

      //set data to the redux
      dispatch(setUsers(userData?.data?.users))
    }catch(e){
      console.error(e.message);
    }
  }
  useEffect(() => {
    fetchUser();
  },[]);

  const handleUpdate = (id, updatedData) => {
    axios.put(`/api/users/${id}`, updatedData)
      .then(response => {
        const updatedUsers = users.map(user =>
          user.id === id ? { ...user, ...updatedData } : user
        );
        setUsers(updatedUsers);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`/api/users/${id}`)
      .then(() => {
        const filteredUsers = users.filter(user => user.id !== id);
        setUsers(filteredUsers);
      })
      .catch(error => console.error(error));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
      {users?.map(user => (
        <UsersCard
          key={user.id}
          user={user}
          id={user?.id}
          fetchUser={fetchUser}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
export default UserList;
