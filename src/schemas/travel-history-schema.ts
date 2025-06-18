import { z } from "zod";

export const travelHistorySchema = z.object({
  date_of_entry: z.string(), // ISO date
  place_of_entry_original: z.string(),
  place_of_entry_translated: z.string(),
  immigration_status_at_entry_original: z.string(),
  immigration_status_at_entry_translated: z.string(),
  status_expiration_date: z.string(), // ISO date
});
