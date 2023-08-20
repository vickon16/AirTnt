"use client";

import getListingsById from "@/actions/getListingsById";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useCallback, useEffect, useState } from "react";
import EmptyState from "../EmptyState";
import { CategoryType, categories } from "@/data/categories";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays} from "date-fns";
import { useUserContext } from "../providers/UserProvider";
import { API, errorToast, stringCapitalize } from "@/lib/utils";
import { toast } from "react-hot-toast";
import ListingReservation from "./ListingReservation";
import { Range } from "react-date-range";
import ListingDetailsLoader from "../loaders/ListingDetailsLoader";
import { ReservationDataType, ReservationSchema } from "@/lib/zodValidators";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingDetailsProps {
  listingId: string;
}

const ListingDetails: FC<ListingDetailsProps> = ({ listingId }) => {
  const { currentUser } = useUserContext();
  const loginModal = useLoginModal();
  const router = useRouter();
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const queryClient = useQueryClient();

  // query for getting listings
  const listingQuery = useQuery({
    enabled: listingId !== null,
    queryKey: ["listing", {listingId}],
    queryFn: () => getListingsById(listingId),
    onError : (error) => errorToast(error, "Failed to get listings")
  });

  // mutations for creating reservations
  const mutation = useMutation({
    mutationKey: ["create Reservations"],
    mutationFn: async (mutationData: ReservationDataType) => {
      const parsedData = ReservationSchema.parse(mutationData);
      const { data } = await API.post(`/api/reservations`, parsedData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey : ["reservations"]})
      toast.success("Reservation created successfully"),
      setDateRange(initialDateRange);
      router.push("/trips");
    },
    onError: (error) => errorToast(error, "Failed to create reservation"),
  });

  const [totalPrice, setTotalPrice] = useState(listingQuery?.data?.price);

  // to update the total price based on date Range
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      // if there is a difference in days and there is a price
      if (dayCount && listingQuery.data?.price) {
        setTotalPrice(dayCount * listingQuery.data.price);
      } else {
        setTotalPrice(listingQuery.data?.price);
      }
    }
  }, [listingQuery.data?.price, dateRange]);

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

  if (listingQuery.isLoading) return <ListingDetailsLoader />;

  if (listingQuery.error || !listingQuery.data) {
    return (
      <EmptyState
        title="No Listing Details Found"
        subtitle="Please Reload this page"
        showReload
      />
    );
  }

  const categoryCapitalize = stringCapitalize(listingQuery.data.category);

  const category = categories.find(
    (item) => item.label === categoryCapitalize
  ) as CategoryType;

  return (
    <section>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-3">
          <ListingHead listing={listingQuery.data} />

          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo category={category} listing={listingQuery.data} />

            <ListingReservation
              listingId={listingId}
              price={listingQuery?.data.price}
              totalPrice={totalPrice}
              onChangeDate={(value) => setDateRange(value)}
              dateRange={dateRange}
              onSubmit={onCreateReservation}
              disabled={mutation.isLoading}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingDetails;
