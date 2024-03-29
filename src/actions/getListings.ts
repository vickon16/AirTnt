import { API } from "@/lib/utils";
import { SafeListings } from "@/types";

export default async function getListings() {
  const {data} = await API.get("/api/listings");
  return data as SafeListings[];
}