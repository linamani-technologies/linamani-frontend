import { z } from "zod";

export const personSchema = z.object({
  a_number: z.string().optional(),
  us_ssn_number: z.string().optional(),
  uscis_number: z.string().optional(),

  last_name_original: z.string(),
  last_name_translated: z.string(),
  first_name_original: z.string(),
  first_name_translated: z.string(),
  middle_name_original: z.string().optional(),
  middle_name_translated: z.string().optional(),
  other_names_original: z.string().optional(),
  other_names_translated: z.string().optional(),

  sex: z.enum(["Male", "Female"]),
  marital_status: z.enum(["Single", "Married", "Divorced", "Widowed"]),
  date_of_birth: z.string(), // ISO format date

  city_of_birth_original: z.string(),
  city_of_birth_translated: z.string(),
  country_of_birth_original: z.string(),
  country_of_birth_translated: z.string(),

  nationality_current_original: z.string(),
  nationality_current_translated: z.string(),
  nationality_birth_original: z.string().optional(),
  nationality_birth_translated: z.string().optional(),

  ethnic_group_original: z.string().optional(),
  ethnic_group_translated: z.string().optional(),
  religion_original: z.string().optional(),
  religion_translated: z.string().optional(),

  native_language_original: z.string(),
  native_language_translated: z.string(),
  fluent_english: z.boolean(),

  other_languages_original: z.array(z.string()),
  other_languages_translated: z.array(z.string()),

  // 18
  immigration_proceeding_status: z.enum(["never", "currently", "previously"]),

  // 19a and 19b
  last_departure_date: z.string(),
  current_i94_number: z.string(),
});
