import { errorResponse } from "@/lib/utils";
import { db } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/actions/getCurrentUser";

export async function GET(req: NextRequest) {
  const searchParams = new URL(req.url).searchParams;
  const query : any = {};

  const listingId = searchParams.get("listingId");
  const userId = searchParams.get("userId");
  const authorId = searchParams.get("authorId");

  if (listingId) query.listingId = listingId
  if (userId) query.userId = userId
  if (authorId) query.listing = {userId : authorId}

  try {
      const reservations = await db.reservation.findMany({
        where : query,
        include: {listing: true},
        orderBy : {createdAt : "desc"},
      });

    const safeReservations = reservations.map((reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      listing: {
        ...reservation.listing,
        createdAt: reservation.listing.createdAt.toISOString(),
      },
    }));

    return NextResponse.json(safeReservations, { status: 200 });
  } catch (error) {
    errorResponse(error, "Failed to get reservations", 400);
  }
}

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    const body = await req.json();
    const isOneEmpty = Object.keys(body).some(
      (key: any) => body[key] === "" || body[key] === null
    );
    if (isOneEmpty) {
      return new Response("Please fill out all data", { status: 403 });
    }
    const { listingId, startDate, endDate, totalPrice } = body;

    const listingAndReservation = await db.reservation.create({
      data: {
        userId: currentUser.id,
        startDate,
        endDate,
        totalPrice,
        listingId,
      },
    });

    return NextResponse.json(listingAndReservation, { status: 200 });
  } catch (error) {
    // console.log(error);
    errorResponse(error, "Failed to create reservation", 400);
  }
}
