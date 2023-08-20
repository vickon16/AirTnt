"use client";

import useCountries from "@/hooks/useCountries";
import { SafeListings } from "@/types";
import { FC } from "react";
import Heading from "../Heading";
import Image from "next/image";
import HeartButton from "../HeartButton";
import useFavorite from "@/hooks/useFavorites";
import {AiFillStar} from "react-icons/ai"

interface ListingHeadProps {
  listing: SafeListings;
}

const ListingHead: FC<ListingHeadProps> = ({ listing }) => {
  const { title, imageSrc, locationValue, id } = listing;
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  const randNum = Math.floor(Math.random() * 5) + 1

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />
      <p className="flex items-center gap-3 text-clampSm mb-3">
        <span className="flex items-center gap-x-1"><AiFillStar /> {randNum.toPrecision(2)}</span>
        <span className="flex items-center gap-x-1 whitespace-nowrap">
          <span className="underline cursor-pointer">{randNum} reviews</span>
          <span>&bull;</span>
          <span className="underline cursor-pointer">{`${location?.region}, ${location?.label}, ${location?.flag}`}</span>
        </span>
      </p>
      <div className="w-full h-[60svh] overflow-hidden rounded-xl relative">
        <Image src={imageSrc} alt="listing-image" fill className="w-full object-cover" />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} />
        </div>
      </div>
    </>
  );
};

export default ListingHead;
