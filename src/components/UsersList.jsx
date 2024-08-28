import { useSelector } from "react-redux"
import UsersCard from "../components/UserCard"
import { useFetchUser } from "../hooks/useFetchUser"
import Loader from "./Loader"

const UserList = () => {
  const users = useSelector((state) => state.users.data)
  const loading = useSelector((state) => state.users.loading)

  useFetchUser()

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-gray-900 min-h-screen">
      {(loading || users.length === 0) ? (
        <Loader />
      ) : (
        users?.map((user) => (
          <UsersCard key={user.id} user={user} id={user?.id} />
        ))
      )}
    </div>
  )
}
export default UserList
