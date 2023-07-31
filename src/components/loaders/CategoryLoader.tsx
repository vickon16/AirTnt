import React from "react";

const CategoryLoader = () => {
  return (
    <div
      className={
        "category flex flex-col items-center justify-center gap-1.5 w-[60px] px-3 py-3 mr-8 shrink-0 "
      }
    >
      <div className="rounded-full h-[25px] w-[25px] animate-pulse bg-gray-200"></div>
      <div className="w-full h-[10px] animate-pulse bg-gray-200"></div>
    </div>
  );
};

export default CategoryLoader;
