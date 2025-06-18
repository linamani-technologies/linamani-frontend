"use client";

import React, { useState } from "react";
import { steps } from "./Steps";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function ImmigrationForm() {
  const [step, setStep] = useState(0);

  const CurrentForm = steps[step]?.component as React.ComponentType<{
    onNext: () => void;
  }>;

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep((prev) => prev + 1);
    }
  };

  return (
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
    <div className="flex min-h-screen flex-col bg-gray-50">
      <div className="flex-none">
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
          </div>
        </SidebarInset>
      </div>
    </div>
  );
}
