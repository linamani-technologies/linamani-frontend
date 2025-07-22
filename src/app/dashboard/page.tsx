"use client";

import { AppSidebar } from "~/components/dashboard/app-sidebar";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "~/components/ui/sidebar";

import { TimelineSection } from "~/components/dashboard/TimelineSection";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="space-y-6 px-6 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">
        Welcome to your Application Timeline
      </h1>
      <p className="mb-4 text-muted-foreground">
        Complete each section step by step.
      </p>

      <TimelineSection
        title="Personal Information"
        status="complete"
        description="Name, DOB, Gender"
      >
        <p>Your personal details have been submitted.</p>
        <Button variant="outline">Edit</Button>
      </TimelineSection>

      <TimelineSection title="Travel History" status="incomplete">
        <p>You have 2 out of 3 trips recorded.</p>
        <Button>Continue</Button>
      </TimelineSection>

      <TimelineSection title="Passport Details" status="incomplete">
        <p>This section is required to proceed.</p>
        <Button>Start</Button>
      </TimelineSection>
    </div>
  );
}
