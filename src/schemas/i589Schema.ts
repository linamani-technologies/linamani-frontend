// src/schemas/i589Schema.ts
import { z } from "zod";

export const i589Schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  middleName: z.string().optional(),
  dateOfBirth: z.string(),
  cityOrTown: z.string().optional(),
  state: z.string().optional(),
  province: z.string().optional(),
  country: z.string(),
  ssn: z.string(),
  mailingAddress: z.object({
    streetNumber: z.string(),
    streetName: z.string(),
    unitType: z.string().optional(),
    unitNumber: z.string().optional(),
    cityOrTown: z.string(),
    state: z.string().optional(),
    zipCode: z.string().optional(),
    country: z.string(),
    province: z.string().optional(),
    postalCode: z.string().optional(),
    inCareOf: z.string().optional(),
  }),
  // Add more as you progress through Part A, B, C, etc.
});

export type I589Schema = z.infer<typeof i589Schema>;
