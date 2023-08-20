"use client";

import { useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import EmptyState from "./EmptyState";
import { useUserContext } from "./providers/UserProvider";
import { API, errorToast } from "@/lib/utils";
import Heading from "./Heading";
import ListingCard from "./listings/ListingCard";

import ListingCardLoader from "./loaders/ListingCardLoader";
import getProperties from "@/actions/getProperties";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const PropertiesComponent = () => {
  const { currentUser } = useUserContext();
  const [deletingId, setDeletingId] = useState("");
  const queryClient = useQueryClient();
  const router = useRouter();

  // query for getting reservations
  const propertiesQuery = useQuery({
    enabled: currentUser?.id !== null,
    queryKey: ["properties"],
    queryFn: getProperties,
    onError: (error) => errorToast(error, "Failed to get your properties"),
  });

  const mutation = useMutation({
    mutationKey: ["delete-property"],
    mutationFn: async (mutationDataId: string) => {
      setDeletingId(mutationDataId);
      await API.delete(`/api/properties/${mutationDataId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
      toast.success("Property Deleted Successfully");
      router.refresh();
    },
    onError: (error) => errorToast(error, "failed to delete property"),
    onSettled: () => setDeletingId(""),
  });

  if (propertiesQuery.error || propertiesQuery.data?.length === 0) {
    return (
      <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
    );
  }

  return (
    <>
      <Heading
        title="Your Properties"
        subtitle="List of places you have favorited"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {propertiesQuery.isLoading ? (
          <>
            {[
              ...Array.from({ length: 10 }).map((_, i) => (
                <ListingCardLoader key={i} />
              )),
            ]}
          </>
        ) : (
          propertiesQuery.data?.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              onAction={() => mutation.mutate(listing.id)}
              disabled={deletingId === listing.id}
              actionLabel="Delete Property"
            />
          ))
        )}
      </div>
    </>
  );
};

export default PropertiesComponent;
