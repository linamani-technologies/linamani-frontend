import VisaRecommendation from "../../components/VisaRecommendation"
import { Button } from "~/components/ui/button"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { Label } from "~/components/ui/label"

export default function VisaSelection() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Visa Selection</h1>
      <VisaRecommendation />
      <form>
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Select your visa type:</h3>
            <RadioGroup defaultValue="b1b2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="b1b2" id="b1b2" />
                <Label htmlFor="b1b2">B1/B2 Visitor Visa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="f1" id="f1" />
                <Label htmlFor="f1">F1 Student Visa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="h1b" id="h1b" />
                <Label htmlFor="h1b">H1B Work Visa</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other (specify)</Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label htmlFor="purpose">Purpose of travel:</Label>
            <textarea
              id="purpose"
              className="w-full p-2 border border-gray-300 rounded-md"
              rows={4}
              placeholder="Briefly describe the purpose of your travel..."
            ></textarea>
          </div>
          <div className="flex justify-between">
            <Button variant="outline">Previous: Travel History</Button>
            <Button>Next: Document Upload</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

