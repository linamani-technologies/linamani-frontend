"use client"

import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

type ReviewSectionProps = {
  formData: any
  onBack: () => void
  onSubmit: () => Promise<void>
}

export function ReviewSection({ formData, onBack, onSubmit }: ReviewSectionProps) {
  const [personalInfoExpanded, setPersonalInfoExpanded] = useState(true)
  const [addressExpanded, setAddressExpanded] = useState(true)

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Review your information</h2>
        <p className="text-sm text-muted-foreground">Please review your information before submitting.</p>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="cursor-pointer" onClick={() => setPersonalInfoExpanded(!personalInfoExpanded)}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Your info</CardTitle>
                <CardDescription>Personal information</CardDescription>
              </div>
              <span className="text-green-600 font-medium">COMPLETE</span>
              {personalInfoExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>
          {personalInfoExpanded && (
            <CardContent className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium">Name</div>
                  <div className="text-sm text-muted-foreground">
                    {formData.firstName} {formData.middleInitial} {formData.lastName} {formData.suffix}
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium">Date of birth</div>
                  <div className="text-sm text-muted-foreground">{formData.dateOfBirth}</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-medium">Occupation</div>
                <div className="text-sm text-muted-foreground">{formData.occupation}</div>
              </div>
              <Button variant="outline" onClick={onBack} className="w-fit">
                Revisit
              </Button>
            </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader className="cursor-pointer" onClick={() => setAddressExpanded(!addressExpanded)}>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">SSN or ITIN</CardTitle>
                <CardDescription>Social Security Number</CardDescription>
              </div>
              <span className="text-green-600 font-medium">COMPLETE</span>
              {addressExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </CardHeader>
          {addressExpanded && (
            <CardContent className="grid gap-4">
              <div>
                <div className="text-sm font-medium">SSN</div>
                <div className="text-sm text-muted-foreground">{formData.ssn}</div>
              </div>
              <Button variant="outline" onClick={onBack} className="w-fit">
                Revisit
              </Button>
            </CardContent>
          )}
        </Card>
      </div>

      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSubmit}>Submit Application</Button>
      </div>
    </div>
  )
}

