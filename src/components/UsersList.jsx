import { useDispatch, useSelector } from "react-redux"
import UsersCard from "../components/UserCard"
import { useFetchUser } from "../hooks/useFetchUser"
import Loader from "./Loader"
import { setAddUser } from "../redux_store/slices/nav.slice"

const UserList = () => {
  const users = useSelector((state) => state.users.data)
  const loading = useSelector((state) => state.users.loading)
  const dispatch = useDispatch()

  useFetchUser()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-gray-900 min-h-screen">
      {loading ? (
        <Loader />
      ) : (!users || users === "undefined" )? (
        <div className="absolute top-1/2 left-[45%] text-white text-xl cursor-pointer">
          No User Available.{" "}
          <span
            className="italic underline tracking-wide"
            onClick={() => dispatch(setAddUser(true))}
          >
            Create user
          </span>
        </div>
      ) : (
        users?.map((user) => (
          <UsersCard key={user.id} user={user} id={user?.id} />
        ))
      )}
    </div>
  )
}
export default UserList
