import { z } from "zod";

export const passportSchema = z.object({
  passport_number: z.string().optional(),
  travel_document_number: z.string().optional(),
  country_of_issue_original: z.string(),
  country_of_issue_translated: z.string(),
  expiration_date: z.string(), // ISO date string
});
