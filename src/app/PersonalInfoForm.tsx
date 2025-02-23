"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
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

const personalInfoSchema = z.object({
  prefix: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  suffix: z.string().optional()
});

type PersonalInfoFormProps = {
  formData: any;
  onUpdateFormData: (data: any) => void;
  onNext: () => void;
};

type Option = {
  value: string;
  label: string;
};

const prefixOptions: Option[] = [
  { value: "MR", label: "Mr" },
  { value: "MRS", label: "Mrs" },
  { value: "MS", label: "Ms" },
  { value: "DR", label: "Dr" },
];

const countryOptions: Option[] = [
  { value: "US", label: "United States" },
  { value: "CA", label: "Canada" },
  { value: "GB", label: "United Kingdom" },
  // Add more countries as needed
];

export default function PersonalInfoForm({
  formData,
  onUpdateFormData,
  onNext,
}: PersonalInfoFormProps) {
  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: formData.firstName,
      middleName: formData.middleName || "",
      lastName: formData.lastName,
      prefix: formData.prefix || "",
      suffix: formData.suffix || ""
    },
  });

  function onSubmit(values: z.infer<typeof personalInfoSchema>) {
    onUpdateFormData(values);
    onNext();
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prefix (optional)</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      options={prefixOptions}
                      onChange={(selectedOption) =>
                        field.onChange(
                          selectedOption ? selectedOption.value : "",
                        )
                      }
                      value={
                        prefixOptions.find(
                          (option) => option.value === field.value,
                        ) || null
                      }
                      isClearable
                      placeholder="Select a prefix"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Given name (First name)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Middle name (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} maxLength={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Family name (Last name)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="suffix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Suffix (optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Jr, Sr, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
