import { API } from "@/lib/utils";
import { SafeReservations } from "@/types";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function getReservations({
  listingId,
  userId,
  authorId,
}: IParams) {
  const searchParams = new URLSearchParams();

  if (listingId) searchParams.append("listingId", listingId);
  if (userId) searchParams.append("userId", userId);
  if (authorId) searchParams.append("authorId", authorId);

  const { data } = await API.get(
    `/api/reservations/?${searchParams.toString()}`
  );
  return data as SafeReservations[];
}
