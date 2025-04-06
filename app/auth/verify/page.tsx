"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { toast } from "sonner"

export default function VerifyEmail() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [countdown, setCountdown] = useState(59)
  const [canResend, setCanResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [errorState, setErrorState] = useState<string | null>(null)
  const [isLocalhost, setIsLocalhost] = useState(false)

  // Check if running on localhost
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsLocalhost(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    }
  }, [])

  // Get email from session storage
  useEffect(() => {
    try {
      const storedEmail = sessionStorage.getItem('verificationEmail')
      if (storedEmail) {
        setEmail(storedEmail)
        // Check if user is already verified
        checkUserVerificationStatus(storedEmail)
      } else {
        console.log("No verification email found in session storage")
        toast.error("No email address found. Redirecting to signup.")
        // Redirect after a short delay to ensure the toast is seen
        setTimeout(() => router.push('/auth/signup'), 1500)
      }
    } catch (error) {
      console.error("Error accessing session storage:", error)
      toast.error("Unable to access browser storage. Please enable cookies.")
    }
  }, [router])

  // Check if user is already verified to redirect appropriately
  const checkUserVerificationStatus = async (userEmail: string) => {
    try {
      const { data, error } = await supabase.auth.getSession()
      
      if (error) {
        console.error("Session check error:", error.message)
        return
      }
      
      if (data?.session) {
        const { data: userData } = await supabase.auth.getUser()
        if (userData?.user?.email_confirmed_at) {
          console.log("User already verified, redirecting to dashboard")
          toast.success("Your email is already verified!")
          setTimeout(() => router.push('/dashboard'), 1500)
        }
      }
    } catch (error) {
      console.error("Error checking verification status:", error)
    }
  }

  // Countdown timer for resend button
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

  // Handle resend verification link
  const handleResendVerification = async () => {
    if (!canResend || !email) return
    
    setLoading(true)
    setErrorState(null)
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email
      })
      
      if (error) {
        console.error("Resend verification error:", error)
        throw error
      }

      console.log("Verification email resent successfully to:", email)
      toast.success("Verification link resent. Please check your email.")
      setCountdown(59)
      setCanResend(false)
    } catch (error: any) {
      console.error("Failed to resend verification email:", error)
      
      // Handle specific error cases
      if (error.message?.includes('rate limit')) {
        setErrorState("Too many attempts. Please try again later.")
        toast.error("Rate limit exceeded. Please wait before trying again.")
      } else if (error.message?.includes('network')) {
        setErrorState("Network error. Please check your connection.")
        toast.error("Network error. Please check your connection and try again.")
      } else {
        setErrorState(error.message || "Failed to resend verification link")
        toast.error(error.message || "Failed to resend verification link")
      }
    } finally {
      setLoading(false)
    }
  }

  // Handle manual navigation to login
  const goToLogin = () => {
    console.log("User navigating to login")
    router.push('/auth/login')
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

          <h1 className="text-2xl font-bold mb-3 text-center">Verify your email</h1>
          
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
            <p className="text-gray-700 text-center">
              We've sent a verification link to <span className="font-medium">{email}</span>.
              <br />Please check your inbox and click the link to verify your account.
            </p>
          </div>
          
          {errorState && (
            <div className="bg-red-50 border border-red-100 rounded-lg p-3 mb-6">
              <p className="text-red-600 text-sm text-center">{errorState}</p>
            </div>
          )}
          
          <p className="text-sm text-gray-500 mb-8 text-center">
            After verification, you'll be able to access all features of the application.
          </p>
          
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full h-12 rounded-xl"
              disabled={!canResend || loading}
              onClick={handleResendVerification}
            >
              {loading ? "Sending..." : !canResend 
                ? `Resend link (${countdown.toString().padStart(2, "0")}s)` 
                : "Resend verification link"
              }
            </Button>
            
            <div className="flex justify-center">
              <Button
                variant="ghost"
                className="text-primary"
                onClick={goToLogin}
              >
                Already verified? Log in here
              </Button>
            </div>
            
            <div className="border-t border-gray-200 pt-4 mt-4">
              <p className="text-sm text-center text-gray-500">
                Didn't receive an email? Check your spam folder or try resending the verification link.
              </p>
              
              <p className="text-xs text-center text-gray-400 mt-2">
                If you continue to experience issues, please contact our support team.
              </p>
              
              {isLocalhost && searchParams.has('token') && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-100 rounded-lg">
                  <h3 className="font-medium text-amber-800 mb-2">Redirecting from local environment</h3>
                  <p className="text-sm text-amber-700 mb-3">
                    It looks like you clicked a verification link that points to a local environment. 
                    Click the button below to complete verification on our production site.
                  </p>
                  <a 
                    href={`https://medgenius-demo.vercel.app/auth/verify?${searchParams.toString()}`}
                    className="flex items-center justify-center w-full p-2 rounded-lg bg-amber-100 text-amber-800 hover:bg-amber-200"
                  >
                    Complete verification <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

