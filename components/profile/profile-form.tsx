"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase/client"
import { toast } from "@/hooks/use-toast"

interface ProfileFormProps {
  user: any
  profile: any
}

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    full_name: profile?.full_name || "",
    username: profile?.username || "",
    date_of_birth: profile?.date_of_birth || "",
    gender: profile?.gender || "",
    height: profile?.height || "",
    weight: profile?.weight || "",
    blood_type: profile?.blood_type || "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Update user profile
      const { error: profileError } = await supabase
        .from("users")
        .update({
          full_name: formData.full_name,
          username: formData.username,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id)

      if (profileError) throw profileError

      // Prepare health profile data - handle empty values properly
      const healthProfileData = {
        // Only include date_of_birth if it's not empty
        ...(formData.date_of_birth ? { date_of_birth: formData.date_of_birth } : {}),
        gender: formData.gender || null,
        height: formData.height ? Number.parseFloat(formData.height) : null,
        weight: formData.weight ? Number.parseFloat(formData.weight) : null,
        blood_type: formData.blood_type || null,
        updated_at: new Date().toISOString(),
      }

      // Check if health profile exists
      const { data: healthProfile } = await supabase
        .from("health_profiles")
        .select("id")
        .eq("user_id", user.id)
        .single()

      if (healthProfile) {
        // Update health profile
        const { error: healthProfileError } = await supabase
          .from("health_profiles")
          .update(healthProfileData)
          .eq("user_id", user.id)

        if (healthProfileError) throw healthProfileError
      } else {
        // Create health profile
        const { error: healthProfileError } = await supabase.from("health_profiles").insert({
          user_id: user.id,
          ...healthProfileData,
        })

        if (healthProfileError) throw healthProfileError
      }

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })

      // Refresh the page to show updated data
      router.refresh()
    } catch (error: any) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="full_name">Full Name</Label>
        <Input
          id="full_name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="input-shadow"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your username"
          className="input-shadow"
        />
        <p className="text-xs text-gray-500">This is how your name will appear to others</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="date_of_birth">Date of Birth</Label>
        <Input
          id="date_of_birth"
          name="date_of_birth"
          type="date"
          value={formData.date_of_birth}
          onChange={handleChange}
          className="input-shadow"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="gender">Gender</Label>
        <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
          <SelectTrigger className="input-shadow">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
            <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="height">Height (cm)</Label>
          <Input
            id="height"
            name="height"
            type="number"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height in cm"
            className="input-shadow"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Weight (kg)</Label>
          <Input
            id="weight"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={handleChange}
            placeholder="Weight in kg"
            className="input-shadow"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="blood_type">Blood Type</Label>
        <Select value={formData.blood_type} onValueChange={(value) => handleSelectChange("blood_type", value)}>
          <SelectTrigger className="input-shadow">
            <SelectValue placeholder="Select blood type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
            <SelectItem value="unknown">Unknown</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit" className="w-full btn-primary" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}

