import UserList from '../components/UsersList';
import Pagination from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import ShowFilterOptions from '../components/ShowFilterOptions';
import TeamList from '../components/TeamList';
import { setShowTeamView } from '../redux_store/slices/team.slice';

const Home = () => {
  const filterOption = useSelector((store) => store.nav.filterOption);
  const show_team_view = useSelector((store) => store.team.show_team_view);
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen">
      {filterOption !== 'Filter' && <ShowFilterOptions />}
      {show_team_view && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm bg-black/30">
          <TeamList 
            onClose={() => dispatch(setShowTeamView(false))} 
          />
        </div>
      )}
      <UserList />
      <Pagination />
    </div>
  );
};

export default Home;
