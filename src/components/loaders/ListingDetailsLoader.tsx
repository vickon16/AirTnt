import React from "react";
import ListingDateRangeLoader from "./ListingDateRangeLoader";

const ListingDetailsLoader = () => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col gap-3">
        {/* listing head component */}
        <div className="flex flex-col gap-y-2">
          {/* title */}
          <div className="h-[35px] w-[60%] animate-pulse bg-gray-200"></div>
          {/* subtitle */}
          <div className="h-[16px] w-[20%] animate-pulse bg-gray-200"></div>
        </div>
        <p className="h-[18px] w-[50%] animate-pulse bg-gray-200"></p>
        <div className="w-full h-[60svh] overflow-hidden rounded-xl relative animate-pulse bg-gray-200"></div>

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          {/* listing info component */}
          <section className="md:col-span-4 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <div className=" flex items-center gap-2 ">
                <p className="h-[25px] w-[60%] animate-pulse bg-gray-200"></p>
                <div className="h-[30px] w-[30px] rounded-full animate-pulse bg-gray-200"></div>
              </div>

              <div className="flex items-center gap-3 font-light text-neutral-500">
                <span className="h-[16px] w-[60px] animate-pulse bg-gray-200"></span>
                <span className="h-[16px] w-[60px] animate-pulse bg-gray-200"></span>
                <span className="h-[16px] w-[60px] animate-pulse bg-gray-200"></span>
              </div>
            </div>

            <hr />

            {/* listing category component */}
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="h-[60px] w-[25px] animate-pulse bg-gray-200 self-start"></div>
                <div className="flex flex-col gap-y-2 w-full">
                  <p className="h-[25px] w-[20%] animate-pulse bg-gray-200"></p>
                  <p className="h-[16px] w-[40%] animate-pulse bg-gray-200"></p>
                </div>
              </div>
            </div>

            <hr />
            <div className="h-[25px] w-[60%] animate-pulse bg-gray-200"></div>
            <hr />
            {/* map component */}
            <div className="h-[45svh] w-full animate-pulse bg-gray-200"></div>
          </section>

          {/* listing reservation component */}
          <ListingDateRangeLoader />
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsLoader;
