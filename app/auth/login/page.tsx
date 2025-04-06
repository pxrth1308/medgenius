"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { supabase } from "@/lib/supabase/client"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { DeveloperLogin } from "@/components/developer-login"
import { toast } from "sonner"

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      // Check if email is confirmed
      if (!data.user?.email_confirmed_at) {
        // Store email in session storage for verification page
        sessionStorage.setItem('verificationEmail', email)
        
        // Send a new verification email
        await supabase.auth.resend({
          type: 'signup',
          email
        })
        
        toast.warning("Your email is not verified. A new verification email has been sent.")
        router.push("/auth/verify")
        return
      }

      toast.success("Login successful!")
      router.push("/dashboard")
    } catch (error: any) {
      toast.error(error.message || "Failed to log in")
      setError(error.message || "Failed to log in")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <Link href="/onboarding/3" className="inline-block">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="flex-1 p-6">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-1">Log in</h1>
          <p className="text-gray-600 mb-6">Nice to have you back!</p>

          <form onSubmit={handleLogin} className="space-y-6">
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

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 rounded-xl pr-10 input-shadow"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember" className="text-sm font-normal">
                Keep me signed in
              </Label>
            </div>

            {error && <div className="text-destructive text-sm">{error}</div>}

            <Button type="submit" className="w-full h-12 rounded-xl btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Log in"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Are you new here?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Create account
              </Link>
            </p>
            <DeveloperLogin />
          </div>
        </div>
      </div>
    </div>
  )
}

