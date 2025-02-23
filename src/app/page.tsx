"use client"

import { useState } from "react"
import { Card } from "~/components/ui/card"
import { PersonalInfoForm } from "./personal-info-form"
import { ReviewSection } from "./review-section"
import { SsnSection } from "./ssn-section"
import { Button } from "~/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function ImmigrationForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    middleInitial: "",
    lastName: "",
    suffix: "",
    dateOfBirth: "",
    occupation: "",
    ssn: "",
    address: "",
    phone: "",
    state: "",
    filingStatus: "",
    hasDependents: false,
  })

  const handleUpdateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    setStep((prev) => prev + 1)
  }

  const handleBack = () => {
    setStep((prev) => prev - 1)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {step > 1 && (
              <Button variant="ghost" onClick={handleBack}>
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
            )}
          </div>
          <div className="text-sm text-muted-foreground">Step {step} of 3</div>
        </nav>

        <Card className="p-6">
          {step === 1 && (
            <PersonalInfoForm formData={formData} onUpdateFormData={handleUpdateFormData} onNext={handleNext} />
          )}
          {step === 2 && <SsnSection formData={formData} onUpdateFormData={handleUpdateFormData} onNext={handleNext} />}
          {step === 3 && (
            <ReviewSection
              formData={formData}
              onBack={handleBack}
              onSubmit={async () => {
                // Handle form submission here
                console.log("Form submitted:", formData)
              }}
            />
          )}
        </Card>
      </div>
    </div>
  )
}

