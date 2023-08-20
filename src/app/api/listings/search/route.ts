import { db } from "@/lib/prismadb";
import { errorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const searchParams = new URL(req.url).searchParams;

  let query : any = {}

  const category = searchParams.get("category");
  const locationValue = searchParams.get("locationValue");
  const guestCount = searchParams.get("guestCount");
  const roomCount = searchParams.get("roomCount");
  const bathroomCount = searchParams.get("bathroomCount");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");


  if (category) query.category = category
  if (locationValue) query.locationValue = locationValue
  if (guestCount) query.guestCount = {gte : Number(guestCount)}
  if (roomCount) query.roomCount = {gte : Number(roomCount)}
  if (bathroomCount) query.bathroomCount = {gte : Number(bathroomCount)}

  // this filters checks the listings, if there is any reservations within the startDate and endDate.
  // if there is a reservation, it would not return a listing.
  // if there is no reservation, it would return a listing.
  if (startDate && endDate) {
    query.NOT = {
      reservations : {
        some : {
          OR : [
            {
              endDate : {gte : startDate},
              startDate : {lte : startDate}
            },
            {
              startDate : {lte : endDate},
              endDate : {gte : endDate}
            }
          ]
        }
      }
    }
  }


  try {
    const listings = await db.listing.findMany({
      where: query,
      orderBy : {
        createdAt : "desc"
      }
    });

    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt : listing.createdAt.toISOString(),
    }))

    return NextResponse.json(safeListings, { status: 200 });
  } catch (error) {
    errorResponse(error, "Failed to get listing", 400);
  }
}