import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ArrowLeft, Camera, Search, Pill } from "lucide-react"

export default function MedicineScanner() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Medicine Scanner</h1>
        </div>

        <Card className="card-shadow mb-6">
          <CardHeader>
            <CardTitle>Scan Medicine</CardTitle>
            <CardDescription>Scan a medicine barcode or QR code to get detailed information</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <Camera className="h-12 w-12 text-gray-400" />
            </div>
            <Button className="w-full btn-primary mb-2">
              <Camera className="mr-2 h-4 w-4" /> Scan Barcode
            </Button>
            <Button variant="outline" className="w-full">
              <Search className="mr-2 h-4 w-4" /> Search Manually
            </Button>
          </CardContent>
        </Card>

        <h2 className="font-semibold mb-3">Recently Scanned</h2>
        <div className="space-y-3">
          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Amoxicillin</h3>
                  <p className="text-xs text-gray-500">500mg Capsule</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <Pill className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Lisinopril</h3>
                  <p className="text-xs text-gray-500">10mg Tablet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

