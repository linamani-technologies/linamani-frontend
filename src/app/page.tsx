"use client";

import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { steps } from "./Steps";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import LoginPage from "./login/page";
import I589FormPage from "./form/page";
import { useRouter } from "next/navigation";

export default function ImmigrationForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const CurrentForm = steps[step]?.component as React.ComponentType<{
    onNext: () => void;
  }>;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/form");
    } else {
      router.push("/login");
    }
  }, []);
  // return (

  //   <main className="flex flex-col items-center justify-center p-6">
  //     <div className="w-full max-w-6xl rounded-lg border bg-white p-6 shadow-sm">
  //       {/* <CurrentForm onNext={handleNext} /> */}
  //     </div>
  //   </main>
  //   // <SidebarProvider>
  //   //   <SidebarInset>
  //   //     <header className="flex h-16 items-center justify-between border-b bg-background px-4">
  //   //       <div className="flex items-center gap-2">
  //   //         <SidebarTrigger />
  //   //         <h1 className="text-lg font-semibold tracking-tight">
  //   //           {`Step ${step + 1} of ${steps.length}: ${steps[step]?.label}`}
  //   //         </h1>
  //   //       </div>
  //   //       <Button variant="ghost" onClick={() => setStep(0)}>
  //   //         Start Over
  //   //       </Button>
  //   //     </header>

  //   //   </SidebarInset>
  //   // </SidebarProvider>
  // );
}

// <div className="min-h-screen bg-gray-50 p-4 md:p-8">
//   <div className="mx-auto max-w-3xl space-y-8">
//     <Card className="p-6">
//       {step === 0 && <PersonForm onNext={handleNext} />}
//       {step === 1 && <NameForm onNext={handleNext} />}
//       {step === 2 && <MailingAddressForm onNext={handleNext} />}
//       {step === 3 && <BirthInfoForm onNext={handleNext} />}
//       {step === 4 && <SSNForm onNext={handleNext} />}
//       {step === 5 && <PDFForm />}
//     </Card>
//   </div>
// </div>
