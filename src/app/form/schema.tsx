import { z } from "zod";
import { validationMessages } from "./validation_messages";

export const requiredShape = (locale: "en" | "es" | "hi") => {
  const msg = validationMessages[locale];

  return z.object({
    Part_A_I: z.object({
      "4": z.string().min(1, msg.required),
      "5": z.string().min(1, msg.required),
      "8": z.string().min(1, msg.required),
      "10": z.enum(["Male", "Female"], { message: msg.gender }),
      "11": z.enum(["Single", "Married", "Divorced", "Widowed"], {
        message: msg.maritalStatus,
      }),
      "12": z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/, msg.date),
      "13": z.string().min(1, msg.required),
      "14": z.string().min(1, msg.required),
      "18": z.enum(["never", "currently", "previously"], {
        message: msg.required,
      }),
      "19a": z.string().optional(),
      "19b": z.string().optional(),
      "19c": z.string().optional(),
      "20": z.string().optional(),
      "21": z.string().optional(),
      "22": z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/, msg.date)
        .optional(),
      "23": z.string().min(1, msg.required),
      "24": z.string().min(1, msg.required),
      "25": z.string().min(1, msg.required),
    }),
    Part_A_II: z.object({
      "Spouse-Name": z.string().optional(),
      "Spouse-DOB": z
        .string()
        .regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/, msg.date)
        .optional(),
      "Spouse-Nationality": z.string().optional(),
      "Spouse-IsInUS": z.enum(["Yes", "No"]).optional(),
      "Spouse-MaritalStatus": z
        .enum(["Single", "Married", "Divorced", "Widowed"])
        .optional(),
      "Spouse-ImmigrationCourt": z.enum(["Yes", "No"]).optional(),
    }),
    Part_A_III: z.object({
      "1": z.string().min(1, msg.required),
      "2": z.string().min(1, msg.required),
      "3": z.string().optional(),
      "4": z.string().optional(),
      "5": z.string().optional(),
    }),
    Part_B: z.object({
      "1": z.string().min(10, msg.minLength("Reason", 10)),
      "2": z.enum(["Yes", "No"], { message: msg.yesNo }),
      "3A": z.enum(["Yes", "No"], { message: msg.yesNo }),
      "3B": z.enum(["Yes", "No"], { message: msg.yesNo }),
      "4": z.enum(["Yes", "No"], { message: msg.yesNo }),
    }),
  });
};
