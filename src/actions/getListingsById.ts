import { safeListings } from "@/types";
import { API } from "@/lib/utils";

export default async function getListingsById(listingId : string) {
    const {data} = await API.get(`/api/listings/${listingId}`);
  return data as safeListings;
}