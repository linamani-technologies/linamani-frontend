"use client";

import { useState } from "react";
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

const ssnSchema = z.object({
  ssn: z.string().regex(/^\d{3}-?\d{2}-?\d{4}$/, "Please enter a valid SSN"),
});

type SsnSectionProps = {
  formData: any;
  onUpdateFormData: (data: any) => void;
  onNext: () => void;
  onBack: () => void;
};

export function SsnSection({
  formData,
  onUpdateFormData,
  onNext,
  onBack,
}: SsnSectionProps) {
  const form = useForm<z.infer<typeof ssnSchema>>({
    resolver: zodResolver(ssnSchema),
    defaultValues: {
      ssn: formData.ssn,
    },
  });

  function onSubmit(values: z.infer<typeof ssnSchema>) {
    onUpdateFormData(values);
    onNext();
  }

  function onBackClick() {
    onBack();
  }

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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

          <div className="align-center flex justify-between">
            <Button onClick={onBackClick}>Back</Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}