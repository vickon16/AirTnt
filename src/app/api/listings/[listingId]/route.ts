import { db } from "@/lib/prismadb";
import { errorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

interface IParams {
  listingId: string;
}

export async function GET(req: Request, { params }: { params: IParams }) {
  const listingId = params.listingId;
  try {
    const listing = await db.listing.findUnique({
      where: { id: listingId },
      // find out the name of the user who owns this listing
      include: {user: true},
    });

    if (!listing) return new Response("No Listing Found", {status : 404})
    
    // remove user password
    const myCopyListing = JSON.parse(JSON.stringify(listing))
    delete myCopyListing.user.hashedPassword

    return NextResponse.json(myCopyListing, { status: 200 });
  } catch (error) {
    errorResponse(error, "Failed to get listing", 400);
  }
}
