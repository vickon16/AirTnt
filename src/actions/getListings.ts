import { API } from "@/lib/utils";
import { safeListings } from "@/types";

export default async function getListings() {
  const {data} = await API.get("/api/listings");
  return data as safeListings[];
}