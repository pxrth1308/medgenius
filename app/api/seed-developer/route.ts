import { createServerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createServerSupabaseClient()

    // Check if developer user exists
    const { data: existingUser } = await supabase.from("users").select("*").eq("email", "dev@example.com").single()

    if (!existingUser) {
      // Create developer user in the users table
      await supabase.from("users").insert({
        email: "dev@example.com",
        full_name: "Developer User",
      })

      // Create health profile for developer
      await supabase.from("health_profiles").insert({
        user_id: (await supabase.from("users").select("id").eq("email", "dev@example.com").single()).data?.id,
        gender: "Not specified",
        blood_type: "O+",
        allergies: ["None"],
        chronic_conditions: ["None"],
      })

      // Add sample appointments
      await supabase.from("appointments").insert([
        {
          user_id: (await supabase.from("users").select("id").eq("email", "dev@example.com").single()).data?.id,
          doctor_name: "Dr. John Smith",
          doctor_specialty: "Cardiologist",
          appointment_date: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
          location: "Main Hospital, Room 302",
          status: "scheduled",
        },
        {
          user_id: (await supabase.from("users").select("id").eq("email", "dev@example.com").single()).data?.id,
          doctor_name: "Dr. Sarah Johnson",
          doctor_specialty: "Neurologist",
          appointment_date: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
          location: "Medical Center, Room 105",
          status: "scheduled",
        },
      ])
    }

    return NextResponse.json({ success: true, message: "Developer account ready" })
  } catch (error) {
    console.error("Error seeding developer account:", error)
    return NextResponse.json({ success: false, error: "Failed to seed developer account" }, { status: 500 })
  }
}

