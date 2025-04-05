"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase/client"
import { ArrowLeft } from "lucide-react"

export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error
      setSuccess(true)
    } catch (error: any) {
      setError(error.message || "Failed to send reset email")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <Link href="/auth/login" className="inline-block">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-6">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Forgot password?</h1>
          <p className="text-gray-600 mb-6">
            Please enter your email to initiate the password reset process. A 4-digit verification code will be sent to
            your email, and then you can create a new password.
          </p>

          {success ? (
            <div className="text-center">
              <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6">
                Reset link sent! Please check your email inbox.
              </div>
              <Button className="w-full h-12 rounded-xl btn-primary" onClick={() => router.push("/auth/login")}>
                Back to login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 rounded-xl input-shadow"
                  />
                </div>
              </div>

              {error && <div className="text-destructive text-sm">{error}</div>}

              <Button type="submit" className="w-full h-12 rounded-xl btn-primary" disabled={loading}>
                {loading ? "Sending..." : "Reset password"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

