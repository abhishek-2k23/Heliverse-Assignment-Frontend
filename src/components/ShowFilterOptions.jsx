import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { setRefreshFilterData } from "../redux_store/slices/user.slice"
import { setActiveFilterCategory } from "../redux_store/slices/nav.slice"
import { useFetchFilterData } from "../hooks/useFetchFilterData"
const ShowFilterOptions = () => {
  const navStates = useSelector((store) => store.nav)
  const { filterOption, activeFilterCategory } = navStates
  const domain_list = useSelector((store) => store.users.domain_list)
  const dispatch = useDispatch()

  useFetchFilterData();

  if (filterOption === "Filter") {
    return
  }

  return (
    <div className="w-full lg:h-20 px-5 text-white bg-gray-900 flex justify-items-startstart lg:justify-between items-start md:items-center pt-3 md:pt-0">
      <div
        className={`w-24 py-2 px-1 mx-4 rounded-md border ${
            activeFilterCategory === "All"
              ? "border-gray-700 bg-gray-100 text-black tracking-wider"
              : "border-gray-600"
          }  text-center cursor-pointer`}
        onClick={() => {
            dispatch(setRefreshFilterData(true))
            dispatch(setActiveFilterCategory("All"))
          }}>
        All
      </div>
      <div className="flex-1 ">
        {filterOption === "Domain" ? (
          <div className="flex flex-wrap md:flex-nowrap gap-2">
            {domain_list?.map((domain) => (
              <div
                key={domain}
                onClick={() => {
                  dispatch(setRefreshFilterData(true))
                  dispatch(setActiveFilterCategory(domain))
                }}
                className={`w-full py-2 px-1 mx-4 rounded-md border ${
                  activeFilterCategory === domain
                    ? "border-gray-700 bg-gray-100 text-black tracking-wider"
                    : "border-gray-600"
                }  text-center cursor-pointer`}
              >
                {" "}
                {domain}
              </div>
            ))}
          </div>
        ) : filterOption === "Gender" ? (
          <div className="flex flex-wrap gap-5 ml-5">
            <div
              className={`w-max py-2 px-10 mx-4 rounded-md border ${
                activeFilterCategory === "Male"
                  ? "border-gray-700 bg-gray-100 text-black tracking-wider"
                  : "border-gray-600"
              }  text-center cursor-pointer`}
              onClick={() => {
                dispatch(setRefreshFilterData(true))
                dispatch(setActiveFilterCategory("Male"))
              }}
            >
              Male
            </div>
            <div
              className={`w-max py-2 px-10  rounded-md border ${
                activeFilterCategory === "Female"
                  ? "border-gray-700 bg-gray-100 text-black tracking-wider"
                  : "border-gray-600"
              }  text-center cursor-pointer`}
              onClick={() => {
                dispatch(setRefreshFilterData(true))
                dispatch(setActiveFilterCategory("Female"))
              }}
            >
              Female
            </div>
          </div>
        ) : (
          <div className="flex gap-4 w-full flex-wrap">
            <div
              className={`w-fit py-2 px-5 mx-4 rounded-md border ${
                activeFilterCategory === "Available"
                  ? "border-gray-700 bg-gray-100 text-black tracking-wider"
                  : "border-gray-600"
              }  text-center cursor-pointer`}
              onClick={() => {
                dispatch(setRefreshFilterData(true))
                dispatch(setActiveFilterCategory("Available"))
              }}>
              Available
            </div>
            <div
              className={`w-fit py-2 px-5  rounded-md border ${
                activeFilterCategory === "Not Available"
                  ? "border-gray-700 bg-gray-100 text-black tracking-wider"
                  : "border-gray-600"
              }  text-center cursor-pointer`}
              onClick={() => {
                dispatch(setRefreshFilterData(true))
                dispatch(setActiveFilterCategory("Not Available"))
              }}>
              Not Available
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ShowFilterOptions
