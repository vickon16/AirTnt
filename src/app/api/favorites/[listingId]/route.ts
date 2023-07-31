import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/prismadb";
import { errorResponse } from "@/lib/utils";
import { NextResponse } from "next/server";

interface IParams {
  listingId: string;
}

export async function PATCH(req: Request, { params }: { params: IParams }) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return new Response("Unauthorized", { status: 401 });

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return new Response("Invalid Id", { status: 403 });
    }
    
    const list = currentUser.favoriteIds || [];
    const hasFavorited = list.includes(listingId);
    
    let user;

    if (hasFavorited) {
      // remove from favoriteIds
      user = await db.user.update({
        where : {id : currentUser.id},
        data : {
          favoriteIds : {
            set : list.filter(id => id !== listingId)
          }
        }
      });
    } else {
      // add to favoriteIds
      user = await db.user.update({
        where : {id : currentUser.id},
        data : {
          favoriteIds : {push : listingId}
        }
      });
    }

    return NextResponse.json(user, {status : 200})
  } catch (error) {
    errorResponse(error, "Failed to add to favorites", 400)
  }
}
