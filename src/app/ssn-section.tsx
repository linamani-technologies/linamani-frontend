"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import { Lock } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormMessage } from "~/components/ui/form"

const ssnSchema = z.object({
  ssn: z.string().regex(/^\d{3}-?\d{2}-?\d{4}$/, "Please enter a valid SSN"),
})

type SsnSectionProps = {
  formData: any
  onUpdateFormData: (data: any) => void
  onNext: () => void
}

export function SsnSection({ formData, onUpdateFormData, onNext }: SsnSectionProps) {
  const form = useForm<z.infer<typeof ssnSchema>>({
    resolver: zodResolver(ssnSchema),
    defaultValues: {
      ssn: formData.ssn,
    },
  })

  function onSubmit(values: z.infer<typeof ssnSchema>) {
    onUpdateFormData(values)
    onNext()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">We&apos;ll also need your Social Security number</h2>
        <p className="text-sm text-muted-foreground">
          Adding your SSN now helps us know whether you qualify for certain tax credits later on.
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
                  <Input {...field} placeholder="000-00-0000" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Lock className="h-4 w-4" />
            <span>We take your privacy seriously</span>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={() => onNext()}>
              Skip for now
            </Button>
            <Button type="submit">Continue</Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

