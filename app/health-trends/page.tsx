import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Activity, Heart, Weight, Droplets, Plus } from "lucide-react"

export default function HealthTrends() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" className="h-8 w-8 mr-2">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Health Trends</h1>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          <Card className="card-shadow">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Heart className="h-4 w-4 text-red-500 mr-1" />
                  <span className="text-sm font-medium">Heart Rate</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Normal</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">72</span>
                <span className="text-xs text-gray-500 ml-1">bpm</span>
              </div>
              <div className="h-10 bg-gray-100 rounded-md mt-2">{/* Placeholder for chart */}</div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 text-primary mr-1" />
                  <span className="text-sm font-medium">Blood Pressure</span>
                </div>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Normal</span>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">120/80</span>
                <span className="text-xs text-gray-500 ml-1">mmHg</span>
              </div>
              <div className="h-10 bg-gray-100 rounded-md mt-2">{/* Placeholder for chart */}</div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Weight className="h-4 w-4 text-orange-500 mr-1" />
                  <span className="text-sm font-medium">Weight</span>
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">68</span>
                <span className="text-xs text-gray-500 ml-1">kg</span>
              </div>
              <div className="h-10 bg-gray-100 rounded-md mt-2">{/* Placeholder for chart */}</div>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center">
                  <Droplets className="h-4 w-4 text-blue-500 mr-1" />
                  <span className="text-sm font-medium">Hydration</span>
                </div>
              </div>
              <div className="flex items-baseline">
                <span className="text-2xl font-bold">1.8</span>
                <span className="text-xs text-gray-500 ml-1">L / 2.5L</span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full mt-2 overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: "72%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Health Insights</h2>
          <Button size="sm" className="rounded-full h-8">
            <Plus className="h-4 w-4 mr-1" /> Add Metric
          </Button>
        </div>

        <Card className="card-shadow mb-4">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Weekly Activity Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">Steps</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">8,432</span>
                  <span className="text-xs text-green-600 ml-1">+12%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "75%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Sleep</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">7.2 hrs</span>
                  <span className="text-xs text-red-600 ml-1">-5%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "65%" }}></div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm">Calories</span>
                <div className="flex items-center">
                  <span className="text-sm font-medium">1,850</span>
                  <span className="text-xs text-gray-500 ml-1">/ 2,200</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "84%" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base">Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                  <Droplets className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Increase water intake</p>
                  <p className="text-xs text-gray-500">Try to drink at least 2.5L of water daily</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2 flex-shrink-0">
                  <Activity className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">Monitor blood pressure</p>
                  <p className="text-xs text-gray-500">Take readings at the same time each day</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

