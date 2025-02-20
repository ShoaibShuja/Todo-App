import React, { useState } from "react";
import { filters } from "../constants";

const Filters = ({ display, setFilter, lightMode }) => {
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  const handleFilterClick = (filter) => {
    setSelectedFilter(filter);
    setFilter(filter);
  };

  return (
    <div
      className={`${display} ${
        lightMode ? "bg-white" : "bg-[#25273c]"
      } justify-center items-center max-sm:px-6 max-sm:py-4 gap-4 max-sm:shadow-lg rounded-lg max-sm:mt-2`}
    >
      {filters.map((item, index) => (
        <button
          className={`font-bold max-sm:text-[16px] text-[15px] cursor-pointer ${
            selectedFilter === item
              ? "text-[#3a7cfd]"
              : "text-gray-500 hover:text-[#e3e4f1]"
          }`}
          key={index}
          onClick={() => handleFilterClick(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default Filters;
