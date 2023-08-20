import { API } from "@/lib/utils";
import { SafeListings } from "@/types";

export default async function getFavoriteListings() {
  const { data } = await API.get(`/api/favorites`);
  return data as SafeListings[];
}
