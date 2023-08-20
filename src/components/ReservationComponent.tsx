"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import EmptyState from "./EmptyState";
import getReservations from "@/actions/getReservations";
import { useUserContext } from "./providers/UserProvider";
import { useRouter } from "next/navigation";
import { API, errorToast } from "@/lib/utils";
import Heading from "./Heading";
import ListingCard from "./listings/ListingCard";
import { toast } from "react-hot-toast";
import ListingCardLoader from "./loaders/ListingCardLoader";

const ReservationComponent = () => {
  const router = useRouter();
  const { currentUser } = useUserContext();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState("");

  // query for getting reservations
  const reservationQuery = useQuery({
    enabled: currentUser?.id !== null,
    queryKey: ["reservations", `${currentUser?.id}`],
    queryFn: () => getReservations({ authorId: currentUser?.id }),
    onError: (error) => errorToast(error, "Failed to get reservations"),
  });

  const mutation = useMutation({
    mutationKey: ["cancel-reservation"],
    mutationFn: async (mutationDataId: string) => {
      setDeletingId(mutationDataId);
      await API.delete(`/api/reservations/${mutationDataId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      toast.success("Reservation cancelled");
      router.refresh();
    },
    onError: (error) => errorToast(error, "failed to cancel reservation"),
    onSettled: () => setDeletingId(""),
  });

  if (reservationQuery.error || reservationQuery.data?.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your property."
      />
    );
  }

  return (
    <>
      <Heading title="Reservations" subtitle="Bookings on you properties" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {reservationQuery.isLoading ? (
          <>
            {[
              ...Array.from({ length: 20 }).map((_, i) => (
                <ListingCardLoader key={i} />
              )),
            ]}
          </>
        ) : (
          reservationQuery.data?.map((reservation) => (
            <ListingCard
              key={reservation.id}
              data={reservation.listing}
              reservation={reservation}
              onAction={() => mutation.mutate(reservation.id)}
              disabled={deletingId === reservation.id}
              actionLabel="Cancel Guest Reservations"
            />
          ))
        )}
      </div>
    </>
  );
};

export default ReservationComponent;
