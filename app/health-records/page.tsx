import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, FileText, FilePlus, FolderPlus, Search, Download } from "lucide-react"

export default function HealthRecords() {
  // Sample records data
  const records = [
    {
      id: 1,
      title: "Blood Test Results",
      date: "May 15, 2023",
      doctor: "Dr. Johnson",
      category: "Lab Results",
    },
    {
      id: 2,
      title: "Chest X-Ray",
      date: "April 3, 2023",
      doctor: "Dr. Smith",
      category: "Imaging",
    },
    {
      id: 3,
      title: "Annual Physical",
      date: "March 10, 2023",
      doctor: "Dr. Williams",
      category: "Examination",
    },
    {
      id: 4,
      title: "Vaccination Record",
      date: "January 22, 2023",
      doctor: "Dr. Brown",
      category: "Immunization",
    },
  ]

  // Sample categories
  const categories = [
    { name: "Lab Results", count: 12 },
    { name: "Imaging", count: 5 },
    { name: "Prescriptions", count: 8 },
    { name: "Examinations", count: 4 },
    { name: "Immunizations", count: 3 },
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
          <h1 className="text-xl font-bold">Health Records</h1>
        </div>

        <div className="flex space-x-2 mb-4">
          <Button className="flex-1 h-10 rounded-xl" variant="outline">
            <Search className="h-4 w-4 mr-2" /> Search Records
          </Button>
          <Button className="h-10 w-10 rounded-xl p-0" variant="outline">
            <FolderPlus className="h-4 w-4" />
          </Button>
          <Button className="h-10 w-10 rounded-xl p-0" variant="outline">
            <FilePlus className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex overflow-x-auto pb-2 mb-4 -mx-4 px-4">
          <Button className="whitespace-nowrap mr-2 rounded-full" variant="secondary">
            All Records
          </Button>
          {categories.map((category, index) => (
            <Button key={index} className="whitespace-nowrap mr-2 rounded-full" variant="outline">
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        <div className="space-y-3 mb-6">
          {records.map((record) => (
            <Card key={record.id} className="card-shadow">
              <CardContent className="p-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{record.title}</h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{record.date}</span>
                      <span className="mx-1">•</span>
                      <span>{record.doctor}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                    <Download className="h-4 w-4 text-gray-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Recent Uploads</h2>
          <Link href="/health-records/recent" className="text-sm text-primary">
            See all
          </Link>
        </div>

        <Card className="card-shadow">
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">Thyroid Function Test</h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>Today</span>
                  <span className="mx-1">•</span>
                  <span>Dr. Miller</span>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0">
                <Download className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

