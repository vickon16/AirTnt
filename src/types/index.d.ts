import {User, Listing} from "@prisma/client";

type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
  createdAt : string;
  updatedAt : string;
  emailVerified : string | null;
};

type safeListings = Omit<Listing, "createdAt"
> & { createdAt : string, user? : SafeUser};