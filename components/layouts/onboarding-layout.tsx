import type { ReactNode } from "react"

interface OnboardingLayoutProps {
  children: ReactNode
  currentStep: number
  totalSteps: number
}

export default function OnboardingLayout({ children, currentStep, totalSteps }: OnboardingLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md mx-auto">{children}</div>
      </div>
    </div>
  )
}

