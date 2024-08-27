import React from 'react'
import UserList from '../components/UsersList';
import Pagination from '../components/Pagination';
import { useSelector } from 'react-redux';
import ShowFilterOptions from '../components/ShowFilterOptions';

const Home = () => {
  const filterOption = useSelector((store) => store.nav.filterOption);

  return (
    <div className='min-h-screen'>
      {
        filterOption !== 'Filter' && <ShowFilterOptions />
      }
      <UserList />
      <Pagination />
    </div>
  )
}

export default Home;