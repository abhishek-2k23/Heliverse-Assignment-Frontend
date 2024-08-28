import UserList from "../components/UsersList"
import Pagination from "../components/Pagination"
import { useSelector } from "react-redux"
import ShowFilterOptions from "../components/ShowFilterOptions"
import TeamList from "../components/TeamList"
import AddUser from "../components/AddUser"

const Home = () => {
  const filterOption = useSelector((store) => store.nav.filterOption)
  const addUser = useSelector((store) => store.nav.addUser)
  const show_team_view = useSelector((store) => store.team.show_team_view)
  const loading = useSelector((store) => store.users.loading)

  return (
    <div className="min-h-screen">
      {filterOption !== "Filter" && <ShowFilterOptions />}
      {addUser && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
          {" "}
          <AddUser />{" "}
        </div>
      )}
      {show_team_view && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
          <TeamList />
        </div>
      )}
      <UserList />

      {!loading && <Pagination />}
    </div>
  )
}

export default Home
