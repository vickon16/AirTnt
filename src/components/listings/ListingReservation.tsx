"use client";

import { safeListings } from "@/types";
import { FC } from "react";
import { Range } from "react-date-range";

interface ListingReservationProps {
  listing: safeListings;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: FC<ListingReservationProps> = ({
  listing,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return <div>ListingReservation</div>;
};

export default ListingReservation;
