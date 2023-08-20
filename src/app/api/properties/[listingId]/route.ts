import { errorResponse } from "@/lib/utils";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  listingId: string;
}


export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    if (!params?.listingId || typeof params?.listingId !== "string")
      throw new Error("Invalid Id");
    const currentUser = await getCurrentUser();
    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    // find the listing details
    const currentListing = await db.listing.findFirst({
      where: { id: params.listingId },
    });

    // to make sure the same user created the listing
    if (
      currentListing?.userId !== currentUser.id
    ) {
      return new Response("Sorry!. You can only delete your own listing", {
        status: 403,
      });
    }

    // delete this listing only if you are the creator
    const deleteListing = await db.listing.delete({
      where: { id: currentListing.id },
    });

    return NextResponse.json(deleteListing, { status: 200 });
  } catch (error) {
    errorResponse(error, "Failed to delete listing", 400);
  }
}