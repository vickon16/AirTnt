import { API } from "@/lib/utils";
import { SafeListings } from "@/types";

export default async function getListingsBySearch(query : string) {
  const {data} = await API.get(`/api/listings/search?${query}`);
  return data as SafeListings[];
}