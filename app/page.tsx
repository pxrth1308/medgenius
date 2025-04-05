import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-8">
            <Image src="/images/icon.png" alt="MedGenius Logo" width={80} height={80} className="text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-primary mb-2">MedGenius</h1>
          <p className="text-gray-600 mb-8">Your personal healthcare assistant</p>

          <div className="w-full space-y-4">
            <Link href="/onboarding/1" className="w-full block">
              <Button className="w-full btn-primary">Get Started</Button>
            </Link>
            <Link href="/auth/login" className="w-full block">
              <Button variant="outline" className="w-full btn-secondary">
                I already have an account
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

