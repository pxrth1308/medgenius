"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function VerifyEmail() {
  const router = useRouter()
  const [countdown, setCountdown] = useState(59)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setCanResend(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleResendCode = () => {
    // In a real app, you would call the resend verification API
    setCountdown(59)
    setCanResend(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <Link href="/auth/signup" className="inline-block">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-6">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-6 relative w-32 h-32 mx-auto">
            <Image
              src="/images/successfully-verified.png"
              alt="Verification illustration"
              fill
              className="object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold mb-1 text-center">Code sent to email</h1>
          <p className="text-gray-600 mb-8 text-center">
            A verification code has been sent to your email. Please enter it to verify your profile.
          </p>

          <div className="flex justify-center space-x-4 mb-8">
            <div className="w-12 h-12 rounded-lg border-2 border-primary flex items-center justify-center text-xl font-bold">
              8
            </div>
            <div className="w-12 h-12 rounded-lg border-2 border-primary flex items-center justify-center text-xl font-bold">
              4
            </div>
            <div className="w-12 h-12 rounded-lg border-2 border-primary flex items-center justify-center text-xl font-bold">
              3
            </div>
            <div className="w-12 h-12 rounded-lg border-2 border-primary flex items-center justify-center text-xl font-bold">
              1
            </div>
          </div>

          <p className="text-sm text-center text-gray-500 mb-6">
            This OTP will be available during 00:{countdown.toString().padStart(2, "0")}sec
          </p>

          <Button className="w-full h-12 rounded-xl btn-primary mb-4" onClick={() => router.push("/dashboard")}>
            Confirm
          </Button>

          <Button
            variant="ghost"
            className="w-full h-12 rounded-xl text-primary"
            disabled={!canResend}
            onClick={handleResendCode}
          >
            Resend code {!canResend && `(${countdown}s)`}
          </Button>
        </div>
      </div>
    </div>
  )
}

