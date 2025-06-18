import { BirthInfoForm } from "./BirthInfoForm";
import { MailingAddressForm } from "./MailingAddressForm";
import NameForm from "./NameForm";
import { PDFForm } from "./PDFForm";
import PersonForm from "./PersonForm";
import { SSNForm } from "./SsnForm";

import {
  User,
  Mail,
  MapPin,
  Calendar,
  ShieldCheck,
  FileText,
} from "lucide-react";

export const steps = [
  // { label: "Person Info", icon: User, component: PersonForm },
  { label: "Name", icon: Mail, component: NameForm },
  { label: "Mailing Address", icon: MapPin, component: MailingAddressForm },
  { label: "Birth Info", icon: Calendar, component: BirthInfoForm },
  { label: "SSN", icon: ShieldCheck, component: SSNForm },
  { label: "Generate PDF", icon: FileText, component: PDFForm },
];
