import { errorResponse } from "@/lib/utils";
import { registerSchema } from "@/lib/zodValidators";
import bcrypt from "bcrypt";
import { db } from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, name, password } = registerSchema.parse(body);

    // check if the user already exists
    const user = await db.user.findUnique({
      where : {email : email}
    })

    if (user) return new Response("User already exists", {status : 400})

    const hashedPassword = await bcrypt.hash(password, 12);

    // create a new user
    const newUser = await db.user.create({
      data : {email, name, hashedPassword}
    })

    const {hashedPassword : removedPassword, ...others} = newUser
    
    return NextResponse.json(others, {status : 200})
  } catch (error) {
    errorResponse(error, "Failed to register user", 400)
  }
}
