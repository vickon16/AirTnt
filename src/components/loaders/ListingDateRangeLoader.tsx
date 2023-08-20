import React from "react";

const ListingDateRangeLoader = () => {
  return (
    <section className="order-first mb-10 md:order-last md:col-span-3">
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <p className="p-4 ">
          <span className="h-[25px] w-[10%] animate-pulse bg-gray-200"></span>
        </p>
        <hr />

        {/* calender component */}
        <div className="h-[30svh] w-full animate-pulse bg-gray-200"></div>
        <hr />
        <div className="p-4">
          <div className="h-[30px] w-full animate-pulse bg-gray-200"></div>
        </div>
        <hr />
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <div className="h-[25px] w-[40px] animate-pulse bg-gray-200"></div>
          <div className="h-[25px] w-[40px] animate-pulse bg-gray-200"></div>
        </div>
      </div>
    </section>
  );
};

export default ListingDateRangeLoader;
