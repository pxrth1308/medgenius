import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Bell, Calendar, Clock, Pill, Plus, Check } from "lucide-react"

export default function Reminders() {
  // Sample reminders data
  const reminders = [
    {
      id: 1,
      type: "medication",
      title: "Amoxicillin",
      description: "500mg Capsule",
      time: "8:00 AM",
      completed: false,
    },
    {
      id: 2,
      type: "medication",
      title: "Lisinopril",
      description: "10mg Tablet",
      time: "9:00 AM",
      completed: true,
    },
    {
      id: 3,
      type: "appointment",
      title: "Dr. Smith",
      description: "Cardiology Appointment",
      time: "2:30 PM",
      date: "Tomorrow",
      completed: false,
    },
    {
      id: 4,
      type: "medication",
      title: "Vitamin D",
      description: "1000 IU",
      time: "8:00 PM",
      completed: false,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Smart Reminders</h1>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Today's Reminders</h2>
          <Button size="sm" className="rounded-full h-8">
            <Plus className="h-4 w-4 mr-1" /> Add New
          </Button>
        </div>

        <div className="space-y-3 mb-6">
          {reminders.map((reminder) => (
            <Card key={reminder.id} className={`card-shadow ${reminder.completed ? "opacity-60" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full ${reminder.completed ? "bg-gray-100" : "bg-primary/10"} flex items-center justify-center mr-3`}
                  >
                    {reminder.type === "medication" ? (
                      <Pill className={`h-5 w-5 ${reminder.completed ? "text-gray-400" : "text-primary"}`} />
                    ) : (
                      <Calendar className={`h-5 w-5 ${reminder.completed ? "text-gray-400" : "text-primary"}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-medium ${reminder.completed ? "line-through text-gray-500" : ""}`}>
                      {reminder.title}
                    </h3>
                    <p className="text-xs text-gray-500">{reminder.description}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center text-xs text-gray-500 mb-1">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{reminder.time}</span>
                    </div>
                    {reminder.date && <div className="text-xs text-gray-500">{reminder.date}</div>}
                  </div>
                  <Button
                    variant={reminder.completed ? "outline" : "ghost"}
                    size="sm"
                    className={`ml-2 h-8 w-8 rounded-full p-0 ${reminder.completed ? "bg-green-100 border-green-200" : ""}`}
                  >
                    <Check className={`h-4 w-4 ${reminder.completed ? "text-green-600" : "text-gray-400"}`} />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Upcoming Reminders</h2>
          <Link href="/reminders/upcoming" className="text-sm text-primary">
            See all
          </Link>
        </div>

        <Card className="card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Bell className="h-4 w-4 text-primary mr-2" />
                <h3 className="font-medium">Tomorrow</h3>
              </div>
              <span className="text-xs text-gray-500">3 reminders</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <Pill className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Amoxicillin</p>
                  <p className="text-xs text-gray-500">8:00 AM</p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Dr. Smith Appointment</p>
                  <p className="text-xs text-gray-500">2:30 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

