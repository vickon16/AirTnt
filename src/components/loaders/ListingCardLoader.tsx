import React from "react";

const ListingCardLoader = () => {
  return (
    <div className="col-span-1 flex flex-col gap-2 w-full">
      <div className="aspect-square w-full overflow-hidden rounded-xl shadow brightness-95 hover:brightness-100 transition duration-200">
        <div className="object-cover h-full w-full bg-gray-200 animate-pulse"></div>
      </div>

      {/* body content */}
      <div className="flex flex-col leading-6 mt-1 gap-y-1.5">
        <div className="font-bold w-[80%] h-[18px] animate-pulse bg-gray-200"></div>
        <div className="font-light text-neutral-500 w-[40%] h-[18px] animate-pulse bg-gray-200"></div>
        <div className="flex flex-row items-center gap-1 w-[60%] h-[18px] animate-pulse bg-gray-200"></div>
      </div>
    </div>
  );
};

export default ListingCardLoader;
