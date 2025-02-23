import { Check, ChevronRight } from "lucide-react"

const steps = [
  { name: "Personal Info", status: "complete" },
  { name: "Travel History", status: "current" },
  { name: "Visa Selection", status: "upcoming" },
  { name: "Document Upload", status: "upcoming" },
  { name: "Review", status: "upcoming" },
  { name: "Submit", status: "upcoming" },
]

export default function Sidebar() {
  return (
    <nav className="w-64 bg-gray-100 p-6">
      <h2 className="text-lg font-semibold mb-4">Your Progress</h2>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center">
            {step.status === "complete" && <Check className="w-5 h-5 text-green-500 mr-2" />}
            {step.status === "current" && <ChevronRight className="w-5 h-5 text-blue-500 mr-2" />}
            {step.status === "upcoming" && <div className="w-5 h-5 border border-gray-300 rounded-full mr-2" />}
            <span className={step.status === "current" ? "font-semibold" : ""}>{step.name}</span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

