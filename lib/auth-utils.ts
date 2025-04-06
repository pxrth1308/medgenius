import { supabase } from "@/lib/supabase/client"
import { toast } from "sonner"

// Check if a user is authenticated
export async function isAuthenticated() {
  const { data, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Error checking authentication status:', error)
    return false
  }
  return !!data.session
}

// Check if a user's email is verified
export async function isEmailVerified() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error checking verification status:', error)
    return false
  }
  return !!data.user?.email_confirmed_at
}

// Sign out the current user
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    toast.error(error.message || "Failed to sign out")
    return false
  }
  return true
}

// Resend verification email
export async function resendVerificationEmail(email: string) {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email
    })
    if (error) throw error
    return true
  } catch (error: any) {
    toast.error(error.message || "Failed to resend verification email")
    return false
  }
}

// Get current user
export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting current user:', error)
    return null
  }
  return data.user
}
