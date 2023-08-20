import { errorResponse } from "@/lib/utils";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req : Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    const listings = await db.listing.findMany({
      where : {
        userId : currentUser.id
      },
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