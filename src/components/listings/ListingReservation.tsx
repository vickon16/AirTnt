"use client";

import { FC, useMemo } from "react";
import { Range } from "react-date-range";
import Button from "../ui/Button";
import Calendar from "@/components/inputs/Calendar";
import { eachDayOfInterval } from "date-fns";
import { SafeReservations } from "@/types";
import getReservations from "@/actions/getReservations";
import { useQuery } from "@tanstack/react-query";
import { errorToast } from "@/lib/utils";
import ListingDateRangeLoader from "../loaders/ListingDateRangeLoader";

interface ListingReservationProps {
  listingId: string;
  price: number;
  totalPrice: number | undefined;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled: boolean;
}

const ListingReservation: FC<ListingReservationProps> = ({
  listingId,
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
}) => {
  // query for getting reservations
  const reservationQuery = useQuery({
    enabled: listingId !== null,
    queryKey: ["reservations", `${listingId}`],
    queryFn: () => getReservations({ listingId }),
    onError: (error) => errorToast(error, "Failed to get reservations"),
  });

  const reservations: SafeReservations[] | undefined = useMemo(() => {
    if (!reservationQuery.isLoading) return reservationQuery.data || [];
  }, [reservationQuery.data, reservationQuery.isLoading]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    // creating a range of dates
    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  if (reservationQuery.isLoading) return <ListingDateRangeLoader />;

  return (
    <section className="order-first mb-10 md:order-last md:col-span-3">
      <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
        <p className="p-4 ">
          <span className="text-clampMd mr-1 font-semibold">$ {price}</span>
          <span className="font-light text-neutral-600">night</span>
        </p>
        <hr />
        <Calendar
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value.selection)}
        />
        <hr />
        <div className="p-4">
          <Button isLoading={disabled} disabled={disabled} onClick={onSubmit}>
            Reserve
          </Button>
        </div>
        <hr />
        <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
          <div>Total</div>
          <div>$ {totalPrice}</div>
        </div>
      </div>
    </section>
  );
};

export default ListingReservation;
