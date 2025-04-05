"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { supabase } from "@/lib/supabase/client"
import {
  Search,
  Calendar,
  MessageSquare,
  User,
  Home,
  Star,
  ChevronRight,
  Scan,
  FileText,
  Bell,
  Folder,
  PlusCircle,
  Pill,
  Stethoscope,
  Activity,
  BarChart,
  Brain,
} from "lucide-react"

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<any[]>([])
  const [specializations, setSpecializations] = useState<any[]>([])
  const [doctors, setDoctors] = useState<any[]>([])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user) {
          setUser(user)

          // Fetch user's upcoming appointments
          const { data: appointmentsData } = await supabase
            .from("appointments")
            .select("*")
            .eq("user_id", user.id)
            .gte("appointment_date", new Date().toISOString())
            .order("appointment_date", { ascending: true })
            .limit(3)

          if (appointmentsData) {
            setAppointments(appointmentsData)
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      } finally {
        setLoading(false)
      }
    }

    const fetchSpecializations = async () => {
      try {
        const { data } = await supabase.from("specializations").select("*").limit(4)

        if (data) {
          setSpecializations(data)
        } else {
          // Fallback data if no specializations in database
          setSpecializations([
            { id: 1, name: "Dentist", wait_time: "10 minutes" },
            { id: 2, name: "Pulmonologist", wait_time: "15 minutes" },
            { id: 3, name: "Gastroenterologist", wait_time: "20 minutes" },
            { id: 4, name: "Cardiologist", wait_time: "15 minutes" },
          ])
        }
      } catch (error) {
        console.error("Error fetching specializations:", error)
      }
    }

    const fetchDoctors = async () => {
      try {
        const { data } = await supabase.from("doctors").select("*").limit(4)

        if (data) {
          setDoctors(data)
        } else {
          // Fallback data if no doctors in database
          setDoctors([
            { id: 1, full_name: "Dr. Mia Miller", specialty: "Cardiologist", rating: 4.8, avatar_url: null },
            { id: 2, full_name: "Dr. Sophia Patel", specialty: "Pediatrician", rating: 4.9, avatar_url: null },
            { id: 3, full_name: "Dr. Helena Fox", specialty: "Neurologist", rating: 4.7, avatar_url: null },
            { id: 4, full_name: "Dr. Andrew Miller", specialty: "Dermatologist", rating: 4.6, avatar_url: null },
          ])
        }
      } catch (error) {
        console.error("Error fetching doctors:", error)
      }
    }

    fetchUserData()
    fetchSpecializations()
    fetchDoctors()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Feature cards data
  const features = [
    {
      title: "Medicine Scanner",
      description: "Scan medicine barcodes for information and interactions",
      icon: <Scan className="h-6 w-6 text-primary" />,
      link: "/medicine-scanner",
      color: "from-green-50 to-green-100",
    },
    {
      title: "Medical Report Analysis",
      description: "AI-powered interpretation of your lab results",
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: "/report-analysis",
      color: "from-teal-50 to-teal-100",
    },
    {
      title: "AI Health Assistant",
      description: "Chat with our AI for health advice and symptom assessment",
      icon: <Brain className="h-6 w-6 text-primary" />,
      link: "/ai-assistant",
      color: "from-cyan-50 to-cyan-100",
    },
    {
      title: "Smart Reminders",
      description: "Never miss medications or appointments",
      icon: <Bell className="h-6 w-6 text-primary" />,
      link: "/reminders",
      color: "from-emerald-50 to-emerald-100",
    },
    {
      title: "Health Records",
      description: "Securely store and access all your medical documents",
      icon: <Folder className="h-6 w-6 text-primary" />,
      link: "/health-records",
      color: "from-green-50 to-green-100",
    },
    {
      title: "Health Trends",
      description: "Track your health metrics and visualize progress",
      icon: <BarChart className="h-6 w-6 text-primary" />,
      link: "/health-trends",
      color: "from-teal-50 to-teal-100",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen pb-16">
      <div className="p-4 space-y-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Image src="/images/icon.png" alt="MedGenius Logo" width={32} height={32} className="mr-2" />
            <div>
              <h1 className="text-xl font-bold">Hello, {user?.email?.split("@")[0] || "User"}!</h1>
              <p className="text-sm text-gray-500">How are you feeling today?</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 8L22 12L18 16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search for doctors, medicines, or services"
            className="pl-10 h-12 rounded-xl input-shadow"
          />
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="font-semibold mb-3">Quick Actions</h2>
          <div className="grid grid-cols-4 gap-2">
            <Link href="/appointments/new">
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl card-shadow text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs">Book Appointment</span>
              </div>
            </Link>
            <Link href="/medicine-scanner">
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl card-shadow text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs">Scan Medicine</span>
              </div>
            </Link>
            <Link href="/ai-assistant">
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl card-shadow text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs">AI Chat</span>
              </div>
            </Link>
            <Link href="/health-records/upload">
              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-xl card-shadow text-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xs">Upload Report</span>
              </div>
            </Link>
          </div>
        </div>

        {/* App Features */}
        <div>
          <h2 className="font-semibold mb-3">MedGenius Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <Link href={feature.link} key={index}>
                <Card className={`card-shadow overflow-hidden h-full hover:shadow-xl transition-shadow duration-300`}>
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-50`}></div>
                  <CardHeader className="relative">
                    <div className="flex items-center">
                      <div className="mr-3 p-2 bg-white rounded-lg shadow-md">{feature.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <CardDescription>{feature.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="relative pt-0 flex justify-end">
                    <Button variant="ghost" size="sm" className="text-primary">
                      Explore <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {appointments.length > 0 && (
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-semibold">Coming consultations</h2>
              <Link href="/appointments" className="text-sm text-primary">
                See all
              </Link>
            </div>

            <Card className="card-shadow">
              <CardContent className="p-3">
                {appointments.map((appointment, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Stethoscope className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{appointment.doctor_name || "Dr. John Smith"}</p>
                        <p className="text-xs text-gray-500">{appointment.doctor_specialty || "Cardiologist"}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-right mr-3">
                        <p className="text-xs">{new Date(appointment.appointment_date).toLocaleDateString()}</p>
                        <p className="text-xs">
                          {new Date(appointment.appointment_date).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <Button size="sm" className="h-8 rounded-full bg-primary text-white">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Health Insights</h2>
            <Link href="/health-insights" className="text-sm text-primary">
              See all
            </Link>
          </div>

          <Card className="card-shadow overflow-hidden">
            <div className="bg-gradient-to-r from-green-500/20 to-teal-500/20 p-4">
              <div className="flex items-center mb-2">
                <Activity className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-medium">Your Health Summary</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Based on your recent data, here are some insights about your health.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-2">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-500">Blood Pressure</p>
                  <p className="font-medium">120/80 mmHg</p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <p className="text-xs text-gray-500">Heart Rate</p>
                  <p className="font-medium">72 bpm</p>
                  <p className="text-xs text-green-600">Normal</p>
                </div>
              </div>

              <Button variant="outline" size="sm" className="w-full bg-white">
                View Complete Health Report
              </Button>
            </div>
          </Card>
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Doctors near you</h2>
            <Link href="/doctors" className="text-sm text-primary">
              See all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {doctors.map((doctor, index) => (
              <Card key={index} className="card-shadow">
                <CardContent className="p-3 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gray-200 mb-2 overflow-hidden">
                    {doctor.avatar_url ? (
                      <Image
                        src={doctor.avatar_url || "/placeholder.svg"}
                        alt={doctor.full_name}
                        width={64}
                        height={64}
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                        <User className="h-8 w-8" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center mb-1">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" />
                    <span className="text-xs">{doctor.rating || "4.8"}</span>
                  </div>
                  <h3 className="text-sm font-medium">{doctor.full_name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{doctor.specialty}</p>
                  <Button size="sm" variant="outline" className="w-8 h-8 rounded-full p-0">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
        <div className="flex justify-around">
          <Button variant="ghost" className="flex flex-col items-center h-auto py-1">
            <Home className="h-5 w-5 text-primary" />
            <span className="text-xs mt-1">Home</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-auto py-1">
            <Calendar className="h-5 w-5 text-gray-400" />
            <span className="text-xs mt-1">Calendar</span>
          </Button>
          <Button variant="ghost" className="flex flex-col items-center h-auto py-1">
            <MessageSquare className="h-5 w-5 text-gray-400" />
            <span className="text-xs mt-1">Chat</span>
          </Button>
          <Link href="/profile">
            <Button variant="ghost" className="flex flex-col items-center h-auto py-1">
              <User className="h-5 w-5 text-gray-400" />
              <span className="text-xs mt-1">Profile</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

