import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { setEditUserId, setIsEditing, setRefreshData } from "../redux_store/slices/user.slice"
import { useFetchUser } from "../hooks/useFetchUser"
const api_url = import.meta.env.VITE_API_URL

const UserCard = ({ user }) => {
  const isEditing = useSelector((store) => store.users.isEditing)
  const editUserId = useSelector((store) => store.users.editUserId)
  const refreshData = useSelector((store) => store.users.refreshData)
  const dispatch = useDispatch()

  //set form data
  const [formData, setFormData] = useState({
    first_name: user?.first_name,
    last_name: user?.last_name,
    email: user?.email,
    domain: user?.domain,
    available: user?.available,
    gender: user?.gender,
  })

  //input field handle change
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }
  
  //update the user data
  const handleUpdate = async (id) => {
    try {
       await axios.put(`${api_url}/users/${id}`, formData)
      dispatch(setRefreshData(true))
      dispatch(setIsEditing(false))
      dispatch(setEditUserId(null))
    } catch (e) {
      console.error(e)
    }
  }


  //delete the user
  const handleDelete = async (id) => {
     await axios.delete(`${api_url}/users/${id}`)
    dispatch(setRefreshData(true))
  }

  return (
    <div className="p-4 text-white rounded shadow-lg flex flex-col items-center justify-center bg-gray-800">
      <img
        className="w-24 h-24 rounded-full bg-gray-700"
        src={user?.avatar}
        alt={`${user?.first_name} ${user?.last_name}`}
      />
      <div className="mt-4 text-center">
        {isEditing && user?.id === editUserId ? (
          <>
            <input
              className="border p-2 rounded border-gray-400  mb-2 bg-gray-600 text-white"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded border-gray-400  mb-2 bg-gray-600 text-white"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded border-gray-400  mb-2 bg-gray-600 text-white"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="border p-2 rounded border-gray-400  mb-2 bg-gray-600 text-white"
              type="text"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
            />

            <select
              name="gender"
              id="gender"
              value={formData?.gender}
              onChange={handleChange}
              className="border p-2 rounded border-gray-400  mb-2 bg-gray-600 text-white "
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </select>
            <div>
              <button
                className="bg-blue-500 text-white p-2 ml-2 rounded"
                onClick={() => handleUpdate(user?.id)}
              >
                Update
              </button>
              <button
                className="bg-blue-500 text-white p-2 ml-2 rounded"
                onClick={() => dispatch(setIsEditing(false))}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{`${user?.first_name} ${user?.last_name}`}</h2>
            {/* email  */}
            <p className="text-gray-500">{user?.email}</p>

            {/* domain and gender  */}
              <p className="text-gray-500"> {user?.gender}</p>
              <p className="text-gray-500">{user?.domain}</p>

            {/* availability */}
            <p
              className={`mt-2 text-white p-2 rounded-sm ${
                user?.available ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {user?.available ? "Available" : "Not Available"}
            </p>

            {/* buttons  */}
            <div className="flex mt-4 space-x-2 ">
              <button
                className="bg-yellow-500 text-white p-2 rounded flex-grow"
                onClick={() => {
                  dispatch(setIsEditing(true))
                  dispatch(setEditUserId(user?.id))
                }}
              >
                Update
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded flex-grow"
                onClick={() => handleDelete(user?.id)}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default UserCard
