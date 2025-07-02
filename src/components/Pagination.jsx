import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Pagination = ({
  currentPage,
  loading,
  handleprevpage,
  handlenextpage,
  pageNo,
}) => {
  return (
    <div className="flex items-center justify-center space-x-4 mt-12">
      <button
        onClick={handleprevpage}
        disabled={currentPage === 1 || loading}
        className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 hover:shadow-lg"
      >
        <ChevronLeft className="w-5 h-5" />
        <span>Previous</span>
      </button>

      <div className="font-bold"> {pageNo} </div>

      <button
        onClick={handlenextpage}
        disabled={loading}
        className="flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300 hover:shadow-lg"
      >
        <span>Next</span>
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Pagination;
