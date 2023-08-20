import { API } from "@/lib/utils";
import { SafeListings } from "@/types";

export default async function getProperties() {
  const { data } = await API.get(`/api/properties`);
  return data as SafeListings[];
}
