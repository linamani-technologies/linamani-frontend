import { z } from "zod";

export const addressSchema = z.object({
  type: z.enum(["residential", "mailing"]),

  street_number_original: z.string(),
  street_number_translated: z.string(),
  street_name_original: z.string(),
  street_name_translated: z.string(),

  unit_type_original: z.string().optional(),
  unit_type_translated: z.string().optional(),
  unit_number: z.string().optional(),

  city_original: z.string(),
  city_translated: z.string(),

  state: z.string().optional(),
  zip_code: z.string().optional(),

  province_original: z.string().optional(),
  province_translated: z.string().optional(),
  postal_code: z.string().optional(),

  country_original: z.string(),
  country_translated: z.string(),

  in_care_of_original: z.string().optional(),
  in_care_of_translated: z.string().optional(),
});
