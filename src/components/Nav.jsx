import { useEffect, useRef, useCallback } from "react"
import { Link } from "react-router-dom"
import { BsSearch } from "react-icons/bs"
import { FaAnglesDown } from "react-icons/fa6"
import { IoCloseSharp } from "react-icons/io5"
import { RiMenu3Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { MdOutlinePersonAddAlt } from "react-icons/md";

import {
  setSearchTerm,
  setFilterOption,
  setShowFilterMenu,
  setShowSliderMenu,
  setAddUser,
} from "../redux_store/slices/nav.slice"
import {
  setCurrentPage,
  setTotalPages,
  setUsers,
} from "../redux_store/slices/user.slice"
import axios from "axios"
const api_url = import.meta.env.VITE_API_URL

const Nav = () => {
  const navStates = useSelector((store) => store.nav)
  const { searchTerm, showSliderMenu, showFilterMenu, filterOption } = navStates

  //users related data
  const currentPage = useSelector((state) => state.users.currentPage)

  const dispatch = useDispatch()

  const filterMenuRef = useRef(null)
  const sliderMenuRef = useRef(null)

  // Debounce function
  const debounce = (func, delay) => {
    let debounceTimer
    return (...args) => {
      clearTimeout(debounceTimer)
      debounceTimer = setTimeout(() => func.apply(null, args), delay)
    }
  }

  // API call for search with debouncing
  const handleSearch = useCallback(
    debounce(async (term) => {
      console.log(`Searching for: ${term}`)
      const res = await axios.get(
        `${api_url}/users/search?page=${currentPage}&limit=20&searchTerm=${term}`,
      )

      console.log(res)

      //set users data
      dispatch(setUsers(res?.data?.users))

      //set the total pages
      dispatch(setTotalPages(res?.data?.totalPages))

      //set the current page
      dispatch(setCurrentPage(res?.data?.currentPage))
    }, 300),
    [],
  )

  // Handle input change for search
  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm)
    }
  }, [searchTerm, handleSearch])

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        dispatch(setShowFilterMenu(false))
      }
      if (
        sliderMenuRef.current &&
        !sliderMenuRef.current.contains(event.target)
      ) {
        dispatch(setShowSliderMenu(false))
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dispatch])

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold tracking-widest" onClick={() => dispatch(setFilterOption('Filter'))}>
          <Link to="/">Heliverse</Link>
        </div>

        {/* Team  */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/team" className="block w-full text-left px-4 py-2 text-base bg-white rounded-md text-gray-700 hover:bg-gray-100 cursor-pointer font-semibold">
            Team
          </Link>
          
          {/* serach box  */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="px-3 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <div className="absolute bottom-3 right-3">
              <BsSearch />
            </div>
          </div>

          {/* filter option  */}
          <div className="relative" ref={filterMenuRef}>
            <div
              className="flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-700 bg-white space-x-5 w-36"
              onClick={() => dispatch(setShowFilterMenu(!showFilterMenu))}
            >
              <button className="font-semibold tracking-wider">
                {filterOption}
              </button>
              <FaAnglesDown />
            </div>

            {/* filter menu  */}
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                {["Domain", "Gender", "Availability"].map((filterOption) => (
                  <div
                    key={filterOption}
                    onClick={() => dispatch(setFilterOption(filterOption))}
                    className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer font-semibold"
                  >
                    {" "}
                    {filterOption}
                  </div>
                ))}
              </div>
            )}
            
          </div>

          {/* //add user  */}
          <button
  onClick={() => dispatch(setAddUser(true))}
  className="block w-10 h-10 text-left px-4 py-2 text-center bg-blue-600 text-gray-700 hover:bg-bg-400 text-xl cursor-pointer font-semibold rounded-full"
>
<MdOutlinePersonAddAlt className="text-lg font-bold text-white"/>
</button>
          
        </div>
        <div
          className="md:hidden text-white font-extrabold text-xl hover:text-gray-400 cursor-pointer"
          onClick={() => dispatch(setShowSliderMenu(!showSliderMenu))}
        >
          <RiMenu3Line />
        </div>
      </div>

      {/* Slider Menu for small screens */}
      {showSliderMenu && (
        <div
          ref={sliderMenuRef}
          className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-800 text-white p-4 z-50"
        >
          {/* close box  */}
          <div className="flex justify-end ">
            <div
              className="flex justify-center items-center text-gray-800 bg-red-500 w-7 h-7 rounded-full cursor-pointer"
              onClick={() => dispatch(setShowSliderMenu(!showSliderMenu))}
            >
              <IoCloseSharp />
            </div>
          </div>

          {/* Team for mobile  */}
          <div className="mt-4 space-y-4">
            <Link
              to="/team"
              className="block w-full text-left px-4 py-2 text-base text-gray-700 bg-white rounded-md hover:bg-gray-100 cursor-pointer font-semibold"
              onClick={() => dispatch(setShowSliderMenu(!showSliderMenu))}
            >
              Team
            </Link>

           {/* serach box for the mobile */}
            <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
              className="px-3 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 relative w-full"
            />
            <div className="absolute bottom-3 right-3 z-50 text-black">
              <BsSearch />
            </div>
          </div>

            {/* filter menu  for mobile */}
            <div className="relative" ref={filterMenuRef}>
              <div
                className="flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-700 bg-white space-x-5 w-full"
                onClick={() => dispatch(setShowFilterMenu(!showFilterMenu))}
              >
                <button className="font-semibold tracking-wider">
                  {filterOption}
                </button>
                <FaAnglesDown />
              </div>

              {showFilterMenu && (
                <div className="mt-2 w-full bg-white rounded-md shadow-lg py-2 z-50">
                  {["Domain", "Gender", "Availability"].map((filterOption) => (
                    <div
                      key={filterOption}
                      onClick={() => {
                        dispatch(setFilterOption(filterOption))
                        dispatch(setShowSliderMenu(false))
                      }}
                      className="block w-full text-left px-4 py-2 text-base text-gray-700 hover:bg-gray-100 cursor-pointer font-semibold"
                    >
                      {" "}
                      {filterOption}
                    </div>
                  ))}
                </div>
              )}
              {/* //add user  */}
              <button
                onClick={() => dispatch(setAddUser(true))}
                className="mt-4 w-full bg-blue-500 flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-50 space-x-5"
              >
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
