import { errorResponse } from "@/lib/utils";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";
import { RentSchema } from "@/lib/zodValidators";

export async function GET(req : Request) {
  try {
    const listings = await db.listing.findMany({
      orderBy : {createdAt : "desc"}
    })

    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt : listing.createdAt.toISOString(),
    }))
    
    return NextResponse.json(safeListings, {status : 200})
  } catch (error) {
    errorResponse(error, "Failed to get listings", 400)
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const isOneEmpty = Object.keys(body).some((key: any) => body[key] === "" || body[key] === null);
    if (isOneEmpty) {
      return new Response("Please fill out all data", {status : 403})
    }

    const {location, ...parsedBody} = RentSchema.parse(body);
    const listingData = {
      ...parsedBody,
      locationValue: location!.value,
      userId: currentUser.id,
    }

    const listing = await db.listing.create({ data: listingData});

    return NextResponse.json(listing, { status: 200 });
  } catch (error) {
    errorResponse(error, "Failed to create rent", 400);
  }
}
