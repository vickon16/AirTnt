"use client";

import { CategoryType } from "@/data/categories";
import useCountries from "@/hooks/useCountries";
import { SafeListings } from "@/types";
import { FC } from "react";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  listing: SafeListings;
  category: CategoryType;
}

const ListingInfo: FC<ListingInfoProps> = ({ category, listing }) => {
  const {
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    locationValue,
  } = listing;

  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <section className="md:col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <p>Hosted by {user?.name}</p>
          <Avatar sessionImg={user?.image} />
        </div>

        <div className="flex items-center gap-3 font-light text-neutral-500">
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
      </div>

      <hr />
      {category && <ListingCategory category={category} />}

      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <div className="h-[45svh]">
        <Map center={coordinates} />
      </div>
    </section>
  );
};

export default ListingInfo;
