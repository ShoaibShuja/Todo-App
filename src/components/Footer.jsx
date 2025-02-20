import React from "react";
import Filters from "./Filters";

const Footer = ({ lightMode, setFilter }) => {
  return (
    <div className="mt-5 mx-8 sm:max-w-[34rem] sm:mx-auto z-10">
      <Filters
        lightMode={lightMode}
        setFilter={setFilter}
        display={"max-sm:flex hidden"}
      />

      <div className="w-full mt-12 mb-15">
        <p className="text-gray-400 text-[14px] font-medium text-center mt-4">
          Drag and drop to reorder list
        </p>
      </div>
    </div>
  );
};

export default Footer;
