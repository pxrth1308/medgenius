import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { ArrowLeft, Upload, FileText, AlertCircle } from "lucide-react"

export default function ReportAnalysis() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Medical Report Analysis</h1>
        </div>

        <Card className="card-shadow mb-6">
          <CardHeader>
            <CardTitle>Upload Medical Report</CardTitle>
            <CardDescription>Our AI will analyze your medical reports and provide insights</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="w-full h-40 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center mb-4 p-4">
              <Upload className="h-8 w-8 text-gray-400 mb-2" />
              <p className="text-sm text-center text-gray-500">
                Drag and drop your medical report here, or click to browse
              </p>
            </div>
            <Button className="w-full btn-primary">Upload Report</Button>
          </CardContent>
        </Card>

        <h2 className="font-semibold mb-3">Recent Analyses</h2>
        <div className="space-y-3">
          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Blood Test Results</h3>
                  <p className="text-xs text-gray-500">Analyzed on May 15, 2023</p>
                </div>
              </div>
              <div className="mt-2 p-3 bg-green-50 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <AlertCircle className="h-4 w-4 text-green-600" />
                  </div>
                  <p className="text-sm text-green-700">
                    All values are within normal range. Your cholesterol levels have improved since your last test.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="text-primary ml-auto">
                View Full Analysis
              </Button>
            </CardFooter>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-4">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium">Thyroid Function Test</h3>
                  <p className="text-xs text-gray-500">Analyzed on April 3, 2023</p>
                </div>
              </div>
              <div className="mt-2 p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-start">
                  <div className="mr-2 mt-0.5">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                  </div>
                  <p className="text-sm text-yellow-700">
                    TSH levels slightly elevated. Consider follow-up with your doctor.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" size="sm" className="text-primary ml-auto">
                View Full Analysis
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

