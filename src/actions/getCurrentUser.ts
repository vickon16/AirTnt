import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { db } from "@/lib/prismadb";
import { SafeUser } from "@/types";


export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser(){
  try {
    const session = await getSession();
    if (!session?.user.email) return null;

    const currentUser = await db.user.findUnique({
      where : {email : session.user.email}
    })

    if (!currentUser) return null;

    const copiedUser = JSON.parse(JSON.stringify(currentUser));
    delete copiedUser.hashedPassword
    
    return copiedUser as SafeUser
  } catch (error : unknown) {
    return null
  }
}
