"use client";

import { useState } from "react";
import { Card } from "~/components/ui/card";
import NameForm from "./NameForm";
import { SSNForm } from "./SsnForm";
import { MailingAddressForm } from "./MailingAddressForm";
import PersonForm from "./PersonForm";
import { BirthInfoForm } from "./BirthInfoForm";
import { PDFForm } from "./PDFForm";

export default function ImmigrationForm() {
  const [step, setStep] = useState(0);
  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <Card className="p-6">
          {step === 0 && <PersonForm onNext={handleNext} />}
          {step === 1 && <NameForm onNext={handleNext} />}
          {step === 2 && <MailingAddressForm onNext={handleNext} />}
          {step === 3 && <BirthInfoForm onNext={handleNext} />}
          {step === 4 && <SSNForm onNext={handleNext} />}
          {step === 5 && <PDFForm />}
        </Card>
      </div>
    </div>
  );
}
