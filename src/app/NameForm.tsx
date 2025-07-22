// --- NameForm.tsx ---
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { usePerson } from "./PersonContext";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";

const nameInfoSchema = z.object({
  prefix: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  middleName: z.string().optional(),
  otherName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  suffix: z.string().optional(),
});

type NameFormProps = {
  onNext: () => void;
};

export default function NameForm({ onNext }: NameFormProps) {
  const { personId } = usePerson();

  const form = useForm<z.infer<typeof nameInfoSchema>>({
    resolver: zodResolver(nameInfoSchema),
    defaultValues: {
      prefix: undefined,
      firstName: "",
      middleName: undefined,
      otherName: undefined,
      lastName: "",
      suffix: undefined,
    },
  });

  const addName = async (formData: z.infer<typeof nameInfoSchema>) => {
    onNext();
    // axios
    //   .post("/api/name", {
    //     personId,
    //     formData,
    //   })
    //   .then((res) => {
    //     if (res.status === 201) {
    //       onNext();
    //     }
    //   })
    //   .catch((err: any) => {
    //     console.error("Error in adding name:", err);
    //   });
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
        <form onSubmit={form.handleSubmit(addName)} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="prefix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="prefix">Prefix (optional)</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a prefix" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MR">Mr</SelectItem>
                      <SelectItem value="MRS">Mrs</SelectItem>
                      <SelectItem value="MS">Ms</SelectItem>
                      <SelectItem value="DR">Dr</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName">
                    Given name (First name)
                  </FormLabel>
                  <FormControl>
                    <Input id="firstName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="middleName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="middleName">
                    Middle name (optional)
                  </FormLabel>
                  <FormControl>
                    <Input id="middleName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="otherName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="otherName">
                    Other name (optional)
                  </FormLabel>
                  <FormControl>
                    <Input id="otherName" {...field} />
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
                  <FormLabel htmlFor="lastName">
                    Family name (Last name)
                  </FormLabel>
                  <FormControl>
                    <Input id="lastName" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* 
            <FormField
              control={form.control}
              name="suffix"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="suffix">Suffix (optional)</FormLabel>
                  <FormControl>
                    <Input id="suffix" {...field} placeholder="Jr, Sr, etc." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
          </div>

          <div className="flex justify-end">
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
