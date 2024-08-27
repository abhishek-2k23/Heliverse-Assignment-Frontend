import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage,setRefreshData } from "../redux_store/slices/user.slice";
import { useFetchUser } from "../hooks/useFetchUser";

const Pagination = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((store) => store.users.currentPage);
  const totalPages = useSelector((store) => store.users.totalPages);
  
  useFetchUser();

  const handlePageClick = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      dispatch(setCurrentPage(page));
      dispatch(setRefreshData(true))
    }
  };

  return (
    <div className="min-h-full bottom-0 left-0 w-full  py-3 flex justify-center bg-gray-900 flex-wrap">
      <button
        className={`px-4 py-2 mx-1 rounded ${currentPage === 1 ? 'text-gray-400 hidden' : 'text-gray-300 font-semibold tracking-wider underline cursor-pointer '}`}
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`px-4 py-2 mx-1 rounded ${page === currentPage ? 'text-gray-50 text-lg font-bold underline' : 'text-gray-500 '}`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        className={`px-4 py-2 mx-1 rounded ${currentPage === totalPages ? 'text-gray-500 hidden'  : ' text-gray-300 font-semibold tracking-wider underline cursor-pointer'}`}
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
