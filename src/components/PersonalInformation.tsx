import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Button } from "~/components/ui/button"

export default function PersonalInformation() {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

      <form className="space-y-8">
        {/* Name Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Name</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="familyName">Family Name</Label>
              <Input id="familyName" placeholder="Family Name" />
            </div>
            <div>
              <Label htmlFor="givenName">Given Name</Label>
              <Input id="givenName" placeholder="Given Name" />
            </div>
            <div>
              <Label htmlFor="middleName">Middle Name</Label>
              <Input id="middleName" placeholder="Middle Name (if any)" />
            </div>
          </div>
        </div>

        {/* Mailing Address Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Mailing Address</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="inCareOf">In Care Of Name</Label>
              <Input id="inCareOf" placeholder="In Care Of Name (if any)" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="streetName">Street Name and Number</Label>
                <Input id="streetName" placeholder="Street Name and Number" />
              </div>
              <div>
                <Label htmlFor="apartment">Apartment/Suite/Unit</Label>
                <Input id="apartment" placeholder="Apartment/Suite/Unit" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="City" />
              </div>
              <div>
                <Label htmlFor="stateProvince">State/Province</Label>
                <Input id="stateProvince" placeholder="State/Province" />
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" placeholder="Postal Code" />
              </div>
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input id="country" placeholder="Country" />
            </div>
          </div>
        </div>

        {/* US SSN Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">US Social Security Number</h3>
          <div>
            <Label htmlFor="ssn">US SSN (if any)</Label>
            <Input id="ssn" placeholder="XXX-XX-XXXX" />
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="outline">Previous</Button>
          <Button>Next: Travel History</Button>
        </div>
      </form>
    </div>
  )
}

