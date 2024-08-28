import { useState } from "react";
import { useDispatch } from "react-redux";
import { useFetchUser } from "../hooks/useFetchUser";
import { setAddUserData } from "../redux_store/slices/user.slice";
import { setAddUser } from "../redux_store/slices/nav.slice";
import { IoCloseSharp } from "react-icons/io5";

const randomImage = "https://source.unsplash.com/random/100x100"; // Random image URL

const CreateUserForm = () => {
  const { createNewUser } = useFetchUser();
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    domain: "",
    id: "",
    avatar: "",
    available: "Available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the user data according to the required format
    const userData = {
      available: user.available === "Available",
      avatar: user.avatar || randomImage,
      domain: user.domain,
      email: user.email,
      first_name: user.first_name,
      gender: user.gender,
      id: parseInt(user.id), // Ensure the ID is a number
      last_name: user.last_name,
    };

    // Dispatch the user data to the Redux store
    dispatch(setAddUserData(userData));

    // Create a new user via the custom hook
    createNewUser(userData);
  };

  return (
    <div className=" p-4 text-white flex items-center justify-center relative">
      <div className="w-full max-w-lg overflow-x-auto">
        <form
          onSubmit={handleSubmit}
          className="min-w-full md:min-w-0 bg-white p-6 rounded-lg shadow-lg text-gray-900"
        >
          <div className="flex justify-between align-center px-2">
            <h3 className="text-lg font-semibold mb-4">Create New User</h3>
            <div
              className="absolute top-2 right-2 flex justify-center items-center text-white bg-red-500  w-8 h-8 rounded-full cursor-pointer"
              onClick={() => dispatch(setAddUser(false))}
            >
              <IoCloseSharp />
            </div>
        </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="first_name">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={user.first_name}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="last_name">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={user.last_name}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="gender">
                Gender
              </label>
              <input
                type="text"
                id="gender"
                name="gender"
                value={user.gender}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="domain">
                Domain
              </label>
              <input
                type="text"
                id="domain"
                name="domain"
                value={user.domain}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="id">
                ID
              </label>
              <input
                type="number"
                id="id"
                name="id"
                value={user.id}
                onChange={handleChange}
                className="p-2 border rounded"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="avatar">
                Image URL
              </label>
              <input
                type="text"
                id="avatar"
                name="avatar"
                value={user.avatar}
                onChange={handleChange}
                className="p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <label className="font-semibold mb-2" htmlFor="available">
                Availability
              </label>
              <select
                id="available"
                name="available"
                value={user.available}
                onChange={handleChange}
                className="p-2 border rounded"
              >
                <option value="Available">Available</option>
                <option value="Not Available">Not Available</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-6 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserForm;
