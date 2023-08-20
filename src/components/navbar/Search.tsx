"use client";

import useCountries from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

const Search = () => {
  const searchModal = useSearchModal();
  const searchParams = useSearchParams();
  const { getByValue } = useCountries();

  const locationValue = searchParams?.get("locationValue");
  const guestCount = searchParams?.get("guestCount");
  const startDate = searchParams?.get("startDate");
  const endDate = searchParams?.get("endDate");

  const locationLabel = locationValue
    ? getByValue(locationValue)?.label : "Anywhere";

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      let diff = differenceInDays(end, start);
      if (diff === 0) diff = 1

      return `${diff} Days`
    }

    return "AnyWeek"
  }, [endDate, startDate])

  const guestLabel = guestCount ? `${guestCount} Guests` : "Add Guests"

  return (
    <section
      className="hidden xs:block border-[1px] w-full sm:w-auto py-2 rounded-full shadow hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex items-center justify-between">
        <div className="text-clampSm font-semibold px-5">{locationLabel}</div>
        <div className="hidden sm:block text-clampSm font-semibold px-4 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="flex items-center gap-3 text-clampSm pl-4 pr-2 text-gray-500">
          <span className="hidden sm:block">{guestLabel}</span>
          <span className="p-2 bg-rose-500 rounded-full text-white">
            <BiSearch size="18" />
          </span>
        </div>
      </div>
    </section>
  );
};

export default Search;
