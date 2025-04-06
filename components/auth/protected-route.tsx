"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { isAuthenticated, isEmailVerified } from "@/lib/auth-utils"
import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

type ProtectedRouteProps = {
  children: React.ReactNode
  requireVerified?: boolean
}

export default function ProtectedRoute({ 
  children, 
  requireVerified = true 
}: ProtectedRouteProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated()
      
      if (!authenticated) {
        router.push("/auth/login")
        return
      }
      
      if (requireVerified) {
        const verified = await isEmailVerified()
        if (!verified) {
          const email = (await supabase.auth.getUser()).data.user?.email
          if (email) {
            sessionStorage.setItem('verificationEmail', email)
          }
          router.push("/auth/verify")
          return
        }
      }
      
      setLoading(false)
    }
    
    checkAuth()
  }, [router, requireVerified])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return <>{children}</>
}
