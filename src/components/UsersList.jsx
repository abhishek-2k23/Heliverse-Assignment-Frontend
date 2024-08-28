import { useSelector } from 'react-redux';
import UsersCard from '../components/UserCard';
import { useFetchUser } from '../hooks/useFetchUser';

const UserList = () => {
  // const dispatch = useDispatch();
  const users = useSelector((state) => state.users.data);
  // const [editingUserId, setEditingUserId] = useState(null);
  // const [formData, setFormData] = useState({});

  useFetchUser();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 bg-gray-900 min-h-screen">
      {users?.map(user => (
        <UsersCard
          key={user.id}
          user={user}
          id={user?.id}
        />
      ))}
    </div>
  );
};
export default UserList;
