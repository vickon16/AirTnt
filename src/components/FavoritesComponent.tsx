"use client";

import { useQuery} from "@tanstack/react-query";
import EmptyState from "./EmptyState";
import { useUserContext } from "./providers/UserProvider";
import { API, errorToast } from "@/lib/utils";
import Heading from "./Heading";
import ListingCard from "./listings/ListingCard";

import ListingCardLoader from "./loaders/ListingCardLoader";
import getFavoriteListings from "@/actions/getFavoriteListings";

const FavoritesComponent = () => {
  const { currentUser } = useUserContext();

  // query for getting reservations
  const favoritesQuery = useQuery({
    enabled: currentUser?.id !== null,
    queryKey: ["favorites-listings"],
    queryFn: getFavoriteListings,
    onError: (error) => errorToast(error, "Failed to get favorite listings"),
  });

  if (favoritesQuery.error || favoritesQuery.data?.length === 0) {
    return (
      <EmptyState
        title="No Favorites found"
        subtitle="Looks like you have no favorite Listing."
      />
    );
  }

  return (
    <>
      <Heading
        title="Your Favorite Listings"
        subtitle="List of places you have favorited"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {favoritesQuery.isLoading ? (
          <>
            {[
              ...Array.from({ length: 10 }).map((_, i) => (
                <ListingCardLoader key={i} />
              )),
            ]}
          </>
        ) : (
          favoritesQuery.data?.map((listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
            />
          ))
        )}
      </div>
    </>
  );
};

export default FavoritesComponent;
