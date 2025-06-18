"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Select from "react-select";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { usePerson } from "./PersonContext";
import axios from "axios";

const birthInfoSchema = z.object({
  dateOfBirth: z.string().min(1, "Invalid date of birth"),
  cityOrTown: z.string().optional(),
  state: z.string().optional(),
  province: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});

type BirthInfoFormProps = {
  onNext: () => void;
};

type Option = {
  value: string;
  label: string;
};

const countryOptions: Option[] = [
  { value: "INDIA", label: "India" },
  { value: "UNITED_STATES", label: "United States" },
];

const stateOptions: Option[] = [
  { value: "ALABAMA", label: "Alabama" },
  { value: "ALASKA", label: "Alaska" },
  { value: "ARIZONA", label: "Arizona" },
  { value: "ARKANSAS", label: "Arkansas" },
  { value: "CALIFORNIA", label: "California" },
  { value: "COLORADO", label: "Colorado" },
  { value: "CONNECTICUT", label: "Connecticut" },
  { value: "DELAWARE", label: "Delaware" },
  { value: "FLORIDA", label: "Florida" },
  { value: "GEORGIA", label: "Georgia" },
  { value: "HAWAII", label: "Hawaii" },
  { value: "IDAHO", label: "Idaho" },
  { value: "ILLINOIS", label: "Illinois" },
  { value: "INDIANA", label: "Indiana" },
  { value: "IOWA", label: "Iowa" },
  { value: "KANSAS", label: "Kansas" },
  { value: "KENTUCKY", label: "Kentucky" },
  { value: "LOUISIANA", label: "Louisiana" },
  { value: "MAINE", label: "Maine" },
  { value: "MARYLAND", label: "Maryland" },
  { value: "MASSACHUSETTS", label: "Massachusetts" },
  { value: "MICHIGAN", label: "Michigan" },
  { value: "MINNESOTA", label: "Minnesota" },
  { value: "MISSISSIPPI", label: "Mississippi" },
  { value: "MISSOURI", label: "Missouri" },
  { value: "MONTANA", label: "Montana" },
  { value: "NEBRASKA", label: "Nebraska" },
  { value: "NEVADA", label: "Nevada" },
  { value: "NEW_HAMPSHIRE", label: "New Hampshire" },
  { value: "NEW_JERSEY", label: "New Jersey" },
  { value: "NEW_MEXICO", label: "New Mexico" },
  { value: "NEW_YORK", label: "New York" },
  { value: "NORTH_CAROLINA", label: "North Carolina" },
  { value: "NORTH_DAKOTA", label: "North Dakota" },
  { value: "OHIO", label: "Ohio" },
  { value: "OKLAHOMA", label: "Oklahoma" },
  { value: "OREGON", label: "Oregon" },
  { value: "PENNSYLVANIA", label: "Pennsylvania" },
  { value: "RHODE_ISLAND", label: "Rhode Island" },
  { value: "SOUTH_CAROLINA", label: "South Carolina" },
  { value: "SOUTH_DAKOTA", label: "South Dakota" },
  { value: "TENNESSEE", label: "Tennessee" },
  { value: "TEXAS", label: "Texas" },
  { value: "UTAH", label: "Utah" },
  { value: "VERMONT", label: "Vermont" },
  { value: "VIRGINIA", label: "Virginia" },
  { value: "WASHINGTON", label: "Washington" },
  { value: "WEST_VIRGINIA", label: "West Virginia" },
  { value: "WISCONSIN", label: "Wisconsin" },
  { value: "WYOMING", label: "Wyoming" },
  { value: "AMERICAN_SAMOA", label: "American Samoa" },
  { value: "DISTRICT_OF_COLUMBIA", label: "District of Columbia" },
  { value: "GUAM", label: "Guam" },
  { value: "NORTHERN_MARIANA_ISLANDS", label: "Northern Mariana Islands" },
  { value: "PUERTO_RICO", label: "Puerto Rico" },
  { value: "VIRGIN_ISLANDS", label: "Virgin Islands" },
];

export function BirthInfoForm({ onNext }: BirthInfoFormProps) {
  const { personId: personId } = usePerson();

  const form = useForm<z.infer<typeof birthInfoSchema>>({
    resolver: zodResolver(birthInfoSchema),
    defaultValues: {
      dateOfBirth: "",
      cityOrTown: undefined,
      state: undefined,
      province: undefined,
      country: "",
    },
  });

  const addMailingAddress = async (
    formData: z.infer<typeof birthInfoSchema>,
  ) => {
    axios
      .post("/api/birthInfo", {
        personId,
        formData,
      })
      .then((res) => {
        if (res.status === 201) {
          onNext();
        }
      })
      .catch((err: any) => {
        console.error("Error in adding birth information:", err);
      });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">
          Let&apos;s get to know you better
        </h1>
        <p className="text-sm text-muted-foreground">
          Please fill in your personal information below.
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addMailingAddress)}
          className="space-y-6"
        >
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="dateOfBirth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                  <FormControl>
                    <Input id="dateOfBirth" {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="cityOrTown"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="cityOrTown">City/Town</FormLabel>
                  <FormControl>
                    <Input id="cityOrTown" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="state">State</FormLabel>
                <FormControl>
                  <Select
                    id="state"
                    className="text-sm"
                    {...field}
                    options={stateOptions}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption ? selectedOption.value : "")
                    }
                    value={
                      stateOptions.find(
                        (option) => option.value === field.value,
                      ) || null
                    }
                    isClearable
                    placeholder="Select a state"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="province"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="province">Province</FormLabel>
                <FormControl>
                  <Input id="province" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="country">Country</FormLabel>
                <FormControl>
                  <Select
                    id="country"
                    className="text-sm"
                    {...field}
                    options={countryOptions}
                    onChange={(selectedOption) =>
                      field.onChange(selectedOption ? selectedOption.value : "")
                    }
                    value={
                      countryOptions.find(
                        (option) => option.value === field.value,
                      ) || null
                    }
                    isClearable
                    placeholder="Select a country"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="align-center flex justify-end">
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
