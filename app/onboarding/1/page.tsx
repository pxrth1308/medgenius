import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OnboardingLayout from "@/components/layouts/onboarding-layout"

export default function OnboardingOne() {
  return (
    <OnboardingLayout currentStep={1} totalSteps={3}>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-8 relative w-64 h-64">
          <Image src="/images/healthcare-made-easy.png" alt="Healthcare illustration" fill className="object-contain" />
        </div>

        <div className="w-12 h-1 bg-primary rounded-full mb-6"></div>

        <h1 className="text-2xl font-bold mb-4">Healthcare Made Easy</h1>
        <p className="text-gray-600 mb-8 max-w-xs">
          Choose from a wide range of specialists and book appointments with ease. Personalized care is just a click
          away.
        </p>

        <Link href="/onboarding/2" className="w-full">
          <Button className="w-full btn-primary">Next</Button>
        </Link>
      </div>
    </OnboardingLayout>
  )
}

