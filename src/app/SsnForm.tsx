"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Lock } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/components/ui/form";
import { usePerson } from "./PersonContext";
import axios from "axios";

const ssnSchema = z.object({
  ssn: z.string(),
});

type SsnSectionProps = {
  onNext: () => void;
};

export function SSNForm({ onNext }: SsnSectionProps) {
  const { personId: personId } = usePerson();

  const form = useForm<z.infer<typeof ssnSchema>>({
    resolver: zodResolver(ssnSchema),
    defaultValues: {
      ssn: "",
    },
  });

  const addSSN = async (_: z.infer<typeof ssnSchema>) => {
    axios
      .post("/api/ssn", {
        personId,
        ssn: ssn.replaceAll("-", ""),
      })
      .then((res) => {
        if (res.status === 201) {
          onNext();
        }
      })
      .catch((err: any) => {
        console.error("Error in adding SSN:", err);
      });
  };

  const [ssn, setSsn] = useState("");

  const formatSSN = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");

    // Limit to 9 digits
    const limitedDigits = digits.slice(0, 9);

    // Add dashes
    let formattedSSN = "";
    for (let i = 0; i < limitedDigits.length; i++) {
      if (i === 3 || i === 5) {
        formattedSSN += "-";
      }
      formattedSSN += limitedDigits[i];
    }

    return formattedSSN;
  };

  const handleSSNChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatSSN(e.target.value);
    setSsn(formattedValue);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">
          We&apos;ll also need your Social Security number
        </h2>
        <p className="text-sm text-muted-foreground">
          This information is required to verify your identity and process your
          application.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(addSSN)} className="space-y-6">
          <FormField
            control={form.control}
            name="ssn"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="XXX-XX-XXXX"
                    value={ssn}
                    onChange={handleSSNChange}
                    aria-describedby="ssn-format"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p id="ssn-format" className="mt-1 text-sm text-gray-500">
            Format: XXX-XX-XXXX
          </p>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>We take your privacy seriously</span>
          </div>

          <div className="align-center flex justify-end">
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
