"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, EyeOff, Check } from "lucide-react"
import { toast } from "sonner"
import { DeveloperLogin } from "@/components/developer-login"

export default function Signup() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Password validation
  const hasMinLength = password.length >= 8
  const hasNumber = /\d/.test(password)
  const hasUppercase = /[A-Z]/.test(password)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!hasMinLength || !hasNumber || !hasUppercase) {
      setError("Please meet all password requirements")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
      
      // Store email in session storage to use on verification page
      sessionStorage.setItem('verificationEmail', email)
      
      toast.success("Signup successful! Check your email for verification code.")
      router.push("/auth/verify")
    } catch (error: any) {
      toast.error(error.message || "Failed to sign up")
      setError(error.message || "Failed to sign up")
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
          <h1 className="text-2xl font-bold mb-1">Create an account</h1>
          <p className="text-gray-600 mb-6">Excited to have you on board!</p>

          <form onSubmit={handleSignup} className="space-y-6">
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
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create password"
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

              <div className="space-y-1 mt-2">
                <div className="flex items-center space-x-2 text-sm">
                  <div
                    className={`w-4 h-4 flex items-center justify-center rounded-full ${hasMinLength ? "bg-green-500 text-white" : "border border-gray-300"}`}
                  >
                    {hasMinLength && <Check className="h-3 w-3" />}
                  </div>
                  <span>Min 8 characters length</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div
                    className={`w-4 h-4 flex items-center justify-center rounded-full ${hasNumber ? "bg-green-500 text-white" : "border border-gray-300"}`}
                  >
                    {hasNumber && <Check className="h-3 w-3" />}
                  </div>
                  <span>Min 1 number</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div
                    className={`w-4 h-4 flex items-center justify-center rounded-full ${hasUppercase ? "bg-green-500 text-white" : "border border-gray-300"}`}
                  >
                    {hasUppercase && <Check className="h-3 w-3" />}
                  </div>
                  <span>Min 1 uppercase letter</span>
                </div>
              </div>
            </div>

            {error && <div className="text-destructive text-sm">{error}</div>}

            <Button
              type="submit"
              className="w-full h-12 rounded-xl btn-primary"
              disabled={loading || !hasMinLength || !hasNumber || !hasUppercase}
            >
              {loading ? "Creating account..." : "Create an account"}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
            <DeveloperLogin />
          </div>
        </div>
      </div>
    </div>
  )
}

