import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { errorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

interface IParams {
  id: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  try {
    if (!params?.id || typeof params?.id !== "string")
      throw new Error("Invalid Id");
    const currentUser = await getCurrentUser();
    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    // find the reservation details
    const currentReservation = await db.reservation.findFirst({
      where: { id: params.id },
      include: { listing: true },
    });

    // to make sure the same user created the listing and reservation
    if (
      currentReservation?.listing.userId !== currentUser.id &&
      currentReservation?.userId !== currentUser.id
    ) {
      return new Response("Sorry!. You can only delete your own reservation", {
        status: 403,
      });
    }

    // delete this reservation only if you are the creator
    const deletedReservation = await db.reservation.delete({
      where: { id: currentReservation.id },
    });

    return NextResponse.json(deletedReservation, { status: 200 });
  } catch (error) {
    errorResponse(error, "Failed to delete reservation", 400);
  }
}
