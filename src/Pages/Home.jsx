import React from 'react'
import UserList from '../components/UsersList';
import Pagination from '../components/Pagination';
const Home = () => {
  return (
    <div className='min-h-screen'>
      <UserList />
      <Pagination />
    </div>
  )
}

export default Home;