import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { errorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    const favorites = await db.listing.findMany({
      where: {
        id: {
          in: currentUser.favoriteIds || [],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt.toISOString(),
    }));

    return NextResponse.json(safeFavorites, { status: 200 });
  } catch (error) {
    errorResponse(error, "Failed to get favorite listings", 400);
  }
}
