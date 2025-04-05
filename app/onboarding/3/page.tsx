import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import OnboardingLayout from "@/components/layouts/onboarding-layout"
import { DeveloperLogin } from "@/components/developer-login"

export default function OnboardingThree() {
  return (
    <OnboardingLayout currentStep={3} totalSteps={3}>
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-8 relative w-64 h-64">
          <Image src="/images/welcome-to-medgenius.png" alt="Medical illustration" fill className="object-contain" />
        </div>

        <h1 className="text-2xl font-bold mb-4">Welcome to MedGenius!</h1>
        <p className="text-gray-600 mb-8 max-w-xs">
          Connect with doctors, manage appointments, access care whenever you need it.
        </p>

        <div className="w-full space-y-4">
          <Link href="/auth/signup" className="w-full block">
            <Button className="w-full btn-primary">Create an account</Button>
          </Link>
          <Link href="/auth/login" className="w-full block">
            <Button variant="outline" className="w-full btn-secondary">
              Log in
            </Button>
          </Link>
          <DeveloperLogin />
        </div>
      </div>
    </OnboardingLayout>
  )
}

