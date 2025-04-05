import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OnboardingLayout from "@/components/layouts/onboarding-layout"

export default function OnboardingTwo() {
  return (
    <OnboardingLayout currentStep={2} totalSteps={3}>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-8 relative w-64 h-64">
          <Image src="/images/here-for-you-always.png" alt="DNA illustration" fill className="object-contain" />
        </div>

        <div className="flex space-x-2 mb-6">
          <div className="w-6 h-1 bg-gray-300 rounded-full"></div>
          <div className="w-6 h-1 bg-primary rounded-full"></div>
        </div>

        <h1 className="text-2xl font-bold mb-4">Here for You, Always</h1>
        <p className="text-gray-600 mb-8 max-w-xs">
          Save your test results, access prescriptions, get medication delivered, manage appointments — all in one
          place.
        </p>

        <Link href="/onboarding/3" className="w-full">
          <Button className="w-full btn-primary">Get started</Button>
        </Link>
      </div>
    </OnboardingLayout>
  )
}

