"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import getListings from "@/actions/getListings";
import EmptyState from "../EmptyState";
import ListingCard from "./ListingCard";
import ListingCardLoader from "../loaders/ListingCardLoader";

const Listings = () => {
  const {
    isLoading,
    isFetching,
    data: listings,
    error,
  } = useQuery({
    queryKey: ["listings"],
    queryFn: getListings,
  });

  if (isLoading) {
    return (
      <section className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {[...Array.from({ length: 20 }).map((_, i) => (
            <ListingCardLoader key={i} />
        ))]}
      </section>
    );
  }

  if (error || listings?.length === 0) {
    return (
      <EmptyState
        title="No Listings Found"
        subtitle="Please Reload this page"
        showReload
      />
    );
  }

  return (
    <section className="py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
      {listings?.map((listing) => (
        <ListingCard key={listing.id} data={listing} />
      ))}
    </section>
  );
};

export default Listings;
