import { User, Listing, Reservation } from "@prisma/client";

type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified" | "hashedPassword"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

type SafeListings = Omit<Listing, "createdAt" | "user"> & {
  createdAt: string;
  user?: SafeUser;
};

type SafeReservations = Omit<
  Reservation,
  "createdAt" | "startDate" | "endDate" | "listing"
> & {
  createdAt: string;
  startDate: string;
  endDate: string;
  listing: SafeListings;
}
