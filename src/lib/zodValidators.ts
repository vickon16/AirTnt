import { z } from "zod";

// register schema
export const registerSchema = z.object({
  name: z.string().nonempty({ message: "Name is required" }),
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(5, { message: "Password Length should be more than 5" }),
});

export type RegisterDataType = z.infer<typeof registerSchema>;

// login schema
export const LoginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required" }).email(),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(5, { message: "Password Length should be more than 5" }),
});

export type LoginDataType = z.infer<typeof LoginSchema>;

// rent schema
export const RentSchema = z.object({
  category: z.string(),
  location: z
    .object({
      value: z.string(),
      label: z.string(),
      flag: z.string(),
      latlng: z.array(z.number()),
      region: z.string(),
    })
    .nullable(),
  guestCount: z.number().int(),
  roomCount: z.number().int(),
  bathroomCount: z.number().int(),
  price: z.number(),
  imageSrc: z.string(),
  title: z.string(),
  description: z.string(),
});

export type RentDataType = z.infer<typeof RentSchema>;

// rent schema
export const SearchSchema = z.object({
  location: z
    .object({
      value: z.string(),
      label: z.string(),
      flag: z.string(),
      latlng: z.array(z.number()),
      region: z.string(),
    })
    .nullable(),
  guestCount: z.number().int(),
  roomCount: z.number().int(),
  bathroomCount: z.number().int(),
  dateRange  : z.object({
    startDate : z.date(),
    endDate : z.date(),
    key : z.string(),
  })
});

export type SearchDataType = z.infer<typeof SearchSchema>;

// reservation schema
export const ReservationSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  totalPrice: z.number(),
  listingId: z.string(),
  userId: z.string(),
});

export type ReservationDataType = z.infer<typeof ReservationSchema>;
