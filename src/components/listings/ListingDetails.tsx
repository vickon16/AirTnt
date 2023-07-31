"use client";

import getListingsById from "@/actions/getListingsById";
import { useMutation, useQuery } from "@tanstack/react-query";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import EmptyState from "../EmptyState";
import { CategoryType, categories } from "@/data/categories";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Reservation } from "@prisma/client";
import { useUserContext } from "../providers/UserProvider";
import { API, errorToast, stringCapitalize } from "@/lib/utils";
import { toast } from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface MutationDataType {
  userId: string;
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

interface ListingDetailsProps {
  listingId: string;
}

const ListingDetails: FC<ListingDetailsProps> = ({ listingId }) => {
  const { currentUser } = useUserContext();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // query for getting listings
  const query = useQuery({
    enabled: listingId !== null,
    queryKey: ["listing", `${listingId}`],
    queryFn: () => getListingsById(listingId),
  });

  // mutations for creating reservations
  const mutation = useMutation({
    mutationKey: ["create Reservations"],
    mutationFn: async (mutationData: MutationDataType) => {
      const { data } = await API.post(`/api/reservations`, mutationData);
      return data;
    },
    onSuccess: () => {
      toast.success("Reservation created successfully"),
        setDateRange(initialDateRange);
      // redirect
      router.refresh();
    },
    onError: (error) => errorToast(error, "Failed to create reservation"),
  });

  const [totalPrice, setTotalPrice] = useState(query?.data?.price);
  const reservations: Reservation[] = useMemo(() => [], []);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      // if there is a difference in days and there is a price
      if (dayCount && query.data?.price) {
        setTotalPrice(dayCount * query.data.price);
      } else {
        setTotalPrice(query.data?.price);
      }
    }
  }, [query.data?.price, dateRange]);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) return loginModal.onOpen();

    if (!totalPrice || !dateRange.startDate || !dateRange.endDate) {
      return toast.error("Information to create reservation is incomplete");
    }

    mutation.mutate({
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId,
      userId: currentUser.id,
    });
  }, [currentUser, dateRange, listingId, loginModal, mutation, totalPrice]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    // creating a range of dates
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  if (query.isLoading) {
    return <></>;
  }

  if (query.error || !query.data) {
    return (
      <EmptyState
        title="No Listing Details Found"
        subtitle="Please Reload this page"
        showReload
      />
    );
  }

  const categoryCapitalize = stringCapitalize(query.data.category);

  const category = categories.find(
    (item) => item.label === categoryCapitalize
  ) as CategoryType;

  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-3">
          <ListingHead listing={query.data} />

          <div className="grid grid-col-1 md:grid-col-7 md:gap-10 mt-6">
            <ListingInfo category={category} listing={query.data} />

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                listing={query.data}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={onCreateReservation}
                disabled={mutation.isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingDetails;
