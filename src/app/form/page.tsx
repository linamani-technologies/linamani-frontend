"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import formJson from "./i589_form_hindi_translation.json";
import { API_FORMS, API_TRANSLATE } from "~/lib/api";
import { formTranslations } from "./form_translations";
import { requiredShape } from "./schema";

function sanitizeKey(str: string) {
  return str.replace(/[^a-zA-Z0-9]/g, "_");
}

const formTitles = {
  en: "I-589 Form",
  hi: "I-589 प्रपत्र",
  es: "Formulario I-589",
};

type FormData = z.infer<typeof schema>;

const flatKeys: string[] = [];
Object.entries(formJson).forEach(([section, fields]) => {
  const sectionKey = sanitizeKey(section);
  Object.entries(fields).forEach(([key, value]) => {
    if (key === "title") return;
    if (typeof value === "string") {
      flatKeys.push(`${sectionKey}-${key}`);
    } else if (typeof value === "object") {
      Object.keys(value).forEach((subKey) => {
        flatKeys.push(`${sectionKey}-${key}-${subKey}`);
      });
    }
  });
});

const defaultValues: FormData = Object.fromEntries(
  flatKeys.map((key) => [key, ""]),
) as FormData;

const schema = z.object({
  ...Object.fromEntries(
    flatKeys
      .filter((key) => !(key in requiredShape))
      .map((key) => [key, z.string().optional()]),
  ),
  ...requiredShape,
});

const convertFlatToNested = (flat: FormData) => {
  const result: Record<string, Record<string, string>> = {};
  Object.entries(flat).forEach(([key, value]) => {
    const [sectionKey, ...rest] = key.split("-");
    const fieldKey = rest.join("-");
    if (!result[sectionKey]) result[sectionKey] = {};
    result[sectionKey][fieldKey] = value || "";
  });
  return result;
};

export default function I589FormPage() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);
  const [language, setLanguage] = useState<"en" | "hi" | "es">("en");
  const translations = formTranslations[language];

  const onSubmit = async (data: FormData) => {
    const structured = convertFlatToNested(data); // original responses

    try {
      // Step 1: Translate form contents
      const translationRes = await API_TRANSLATE.post("/", {
        form_data: structured,
      });

      const translated = translationRes.data.translated_form;

      // Step 2: Submit the full form to API_FORMS
      const formPayload = {
        user_id: "811f0fda-8f15-4e2c-b5bb-80aa32198244", // replace with actual UUID
        form_type: "I-589",
        date_created: new Date().toISOString(),
        last_modified: new Date().toISOString(),
        source_language: "hi", // or "hi"
        form_contents: structured,
        translated_contents: translated,
      };
      console.log(formPayload);

      const submitRes = await API_FORMS.post("/", formPayload);
      console.log("Form successfully submitted:", submitRes.data);
      setSubmittedData(translated); // optional: display translated version
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="mb-4 max-w-xs">
        <label className="mb-1 block text-sm font-medium">
          Choose Language
        </label>
        <Select
          value={language}
          onValueChange={(val) => setLanguage(val as "en" | "hi" | "es")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="hi">Hindi</SelectItem>
            <SelectItem value="es">Spanish</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <h1 className="text-2xl font-bold">{formTitles[language]}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {Object.entries(translations).map(([section, fields]) => {
            const sectionKey = sanitizeKey(section);
            const title = (fields as any).title;
            return (
              <Card key={section}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {section} - {title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {Object.entries(fields).map(([fieldKey, label]) => {
                    if (fieldKey === "title") return null;
                    if (typeof label === "string") {
                      const name = `${sectionKey}-${fieldKey}`;
                      return (
                        <FormField
                          key={name}
                          control={form.control}
                          name={name as keyof FormData}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{label}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  className={
                                    form.formState.errors[name]
                                      ? "border-red-500"
                                      : ""
                                  }
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    } else if (typeof label === "object") {
                      return Object.entries(label).map(([subKey, subLabel]) => {
                        const name = `${sectionKey}-${fieldKey}-${subKey}`;
                        return (
                          <FormField
                            key={name}
                            control={form.control}
                            name={name as keyof FormData}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>{subLabel}</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        );
                      });
                    }
                    return null;
                  })}
                </CardContent>
              </Card>
            );
          })}
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>

      {submittedData && (
        <pre className="mt-6 whitespace-pre-wrap rounded bg-gray-100 p-4 text-sm">
          {JSON.stringify(convertFlatToNested(submittedData), null, 2)}
        </pre>
      )}
    </div>
  );
}
