"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from "@/components/ui/dialog"

const DEVELOPER_CODE = process.env.NEXT_PUBLIC_DEVELOPER_CODE || "dev123"

export function DeveloperLogin() {
  const [isOpen, setIsOpen] = useState(false)
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDeveloperLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (code !== DEVELOPER_CODE) {
        throw new Error("Invalid developer code")
      }

      // Call the seed API to ensure developer data exists
      const response = await fetch("/api/seed-developer")
      if (!response.ok) {
        throw new Error("Failed to seed developer account")
      }

      // Close the dialog and redirect
      setIsOpen(false)
      router.push("/dashboard")
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-4">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" className="text-sm text-primary">
            Developer Login
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Developer Login</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleDeveloperLogin}>
            {error && <div className="text-destructive text-sm mb-4">{error}</div>}
            <Input
              placeholder="Developer Code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="input-shadow mb-4"
            />
            <DialogFooter>
              <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

