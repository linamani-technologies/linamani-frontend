import { AlertCircle } from "lucide-react"

export default function VisaRecommendation() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2 text-blue-500" />
        AI-Powered Visa Recommendation
      </h3>
      <p className="mb-2">Based on your profile and travel history, we recommend:</p>
      <div className="font-semibold text-blue-700">B1/B2 Visitor Visa</div>
      <p className="text-sm text-gray-600 mt-2">
        This recommendation is based on your purpose of travel and duration of stay. Please review the details to ensure
        this is the correct visa type for your situation.
      </p>
    </div>
  )
}

