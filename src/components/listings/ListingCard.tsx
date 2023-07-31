"use client";

import useCountries from "@/hooks/useCountries";
import { Reservation } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, MouseEvent, useCallback, useMemo } from "react";
import HeartButton from "../HeartButton";
import Button from "../ui/Button";
import { safeListings } from "@/types";

interface ListingCardProps {
  data: safeListings;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

const ListingCard: FC<ListingCardProps> = ({
  data,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();
  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) return;

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    // return reservation price if there is, or the listing price
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="col-span-1 flex flex-col gap-2 w-full cursor-pointer group"
    >
      <div className="aspect-square w-full relative overflow-hidden rounded-xl shadow brightness-95 hover:brightness-100 transition duration-200">
        <Image
          src={data.imageSrc}
          fill
          className="object-cover h-full w-full group-hover:scale-105 transition"
          alt="Listing"
        />
        <span className="absolute top-3 right-3">
          <HeartButton listingId={data.id} />
        </span>
      </div>

      {/* body content */}
      <div className="flex flex-col leading-6 mt-1">
        <div className="font-bold">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation ? <div className="font-light">night</div> : null}
        </div>

        {onAction && actionLabel && (
          <Button  disabled={disabled} size="small" onClick={handleCancel}>
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
