import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { FaAnglesDown } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { RiMenu3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchTerm,
  setFilterOption,
  setShowFilterMenu,
  setShowSliderMenu,
} from "../redux_store/slices/nav.slice";

const Nav = () => {
  const navStates = useSelector((store) => store.nav);
  const {searchTerm,
    showSliderMenu,
    showFilterMenu,
    filterOption,
  } = navStates;
  const dispatch = useDispatch();

  const filterMenuRef = useRef(null);
  const sliderMenuRef = useRef(null);

  // Debounce function
  const debounce = (func, delay) => {
    let debounceTimer;
    return (...args) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(null, args), delay);
    };
  };

  // API call for search with debouncing
  const handleSearch = useCallback(
    debounce((term) => {
      console.log(`Searching for: ${term}`);
      // API call logic here
    }, 300),
    []
  );

  // Handle input change for search
  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [searchTerm, handleSearch]);

  const handleFilterSelect = (option) => {
    dispatch(setFilterOption(option));
    dispatch(setShowFilterMenu(false));
    console.log(`Filtering by: ${option}`);
    // API call logic here
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterMenuRef.current &&
        !filterMenuRef.current.contains(event.target)
      ) {
        dispatch(setShowFilterMenu(false));
      }
      if (
        sliderMenuRef.current &&
        !sliderMenuRef.current.contains(event.target)
      ) {
        dispatch(setShowSliderMenu(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold tracking-widest">
          <Link to="/">Heliver</Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/team" className="text-white hover:text-gray-400">
            Team
          </Link>
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
          <div className="relative" ref={filterMenuRef}>
            <div
              className="flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-700 bg-white space-x-5 w-36"
              onClick={() => dispatch(setShowFilterMenu(!showFilterMenu))}
            >
              <button className="font-semibold tracking-wider">{filterOption}</button>
              <FaAnglesDown />
            </div>

            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                <button
                  onClick={() => handleFilterSelect("Domain")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Domain
                </button>
                <button
                  onClick={() => handleFilterSelect("Availability")}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Availability
                </button>
              </div>
            )}
          </div>
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
          className="md:hidden fixed top-0 left-0 w-64 h-full bg-gray-800 text-white p-4 z-50"
        >
          <div className="flex justify-end ">
            <div
              className="flex justify-center items-center text-gray-800 bg-white w-7 h-7 rounded-full cursor-pointer"
              onClick={() => dispatch(setShowSliderMenu(!showSliderMenu))}
            >
              <IoCloseSharp />
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <Link
              to="/team"
              className="block hover:text-gray-400"
              onClick={() => dispatch(setShowSliderMenu(!showSliderMenu))}
            >
              Team
            </Link>
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="w-full px-3 py-2 text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div className="relative" ref={filterMenuRef}>
              <div
                className="flex justify-between items-center px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900-500 text-gray-700 bg-white space-x-5 w-full"
                onClick={() => dispatch(setShowFilterMenu(!showFilterMenu))}
              >
                <button className="font-semibold tracking-wider">{filterOption}</button>
                <FaAnglesDown />
              </div>

              {showFilterMenu && (
                <div className="mt-2 w-full bg-white rounded-md shadow-lg py-2 z-50">
                  <button
                    onClick={() => handleFilterSelect("Domain")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Domain
                  </button>
                  <button
                    onClick={() => handleFilterSelect("Availability")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Availability
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
