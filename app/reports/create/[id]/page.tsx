"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, FileText, Download, Send } from "lucide-react"

interface PatientInfo {
  id: string
  name: string
  age: number
  gender: string
  contact: string
  email: string
}

export default function CreateReportPage() {
  const params = useParams()
  const router = useRouter()
  const patientId = params.id
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [patientInfo, setPatientInfo] = useState<PatientInfo | null>(null)

  const [reportData, setReportData] = useState({
    diagnosis: "",
    symptoms: "",
    tests: "",
    medications: "",
    advice: "",
    followUp: "",
  })

  useEffect(() => {
    // In a real app, fetch patient info from API
    setTimeout(() => {
      setPatientInfo({
        id: patientId as string,
        name:
          patientId === "1"
            ? "Rahul"
            : patientId === "2" || patientId === "3"
              ? "Dinanath Kumar"
              : patientId === "4"
                ? "Priya Sharma"
                : patientId === "5"
                  ? "Amit Patel"
                  : patientId === "6"
                    ? "Sneha Gupta"
                    : patientId === "7"
                      ? "Rajesh Singh"
                      : "Patient",
        age: 18,
        gender: "Male",
        contact: "+91 9876543210",
        email: "patient@example.com",
      })
      setIsLoading(false)
    }, 1000)
  }, [patientId])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setReportData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setReportData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSaveReport = () => {
    setIsSaving(true)

    // In a real app, save report to database
    setTimeout(() => {
      setIsSaving(false)
      router.push("/reports")
    }, 2000)
  }

  const handleGeneratePDF = () => {
    // In a real app, generate PDF
    alert("PDF generation would happen here")
  }

  const handleSendReport = () => {
    // In a real app, send report to patient
    alert("Report would be sent to patient via email")
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Create Report">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Create Medical Report">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Patient Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Name</Label>
              <Input value={patientInfo?.name} readOnly />
            </div>
            <div>
              <Label>Age</Label>
              <Input value={patientInfo?.age} readOnly />
            </div>
            <div>
              <Label>Gender</Label>
              <Input value={patientInfo?.gender} readOnly />
            </div>
            <div>
              <Label>Contact</Label>
              <Input value={patientInfo?.contact} readOnly />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={patientInfo?.email} readOnly />
            </div>
            <div>
              <Label>Date</Label>
              <Input value={new Date().toLocaleDateString()} readOnly />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="report">
        <TabsList className="mb-4">
          <TabsTrigger value="report">Report</TabsTrigger>
          <TabsTrigger value="prescription">Prescription</TabsTrigger>
        </TabsList>

        <TabsContent value="report">
          <Card>
            <CardHeader>
              <CardTitle>Medical Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="diagnosis">Diagnosis</Label>
                  <Input
                    id="diagnosis"
                    name="diagnosis"
                    value={reportData.diagnosis}
                    onChange={handleInputChange}
                    placeholder="Primary diagnosis"
                  />
                </div>

                <div>
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    value={reportData.symptoms}
                    onChange={handleInputChange}
                    placeholder="Patient's symptoms"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="tests">Tests & Results</Label>
                  <Textarea
                    id="tests"
                    name="tests"
                    value={reportData.tests}
                    onChange={handleInputChange}
                    placeholder="Tests performed and results"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="advice">Medical Advice</Label>
                  <Textarea
                    id="advice"
                    name="advice"
                    value={reportData.advice}
                    onChange={handleInputChange}
                    placeholder="Advice for the patient"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="followUp">Follow-up</Label>
                  <Select onValueChange={(value) => handleSelectChange("followUp", value)} value={reportData.followUp}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select follow-up period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1 week">1 week</SelectItem>
                      <SelectItem value="2 weeks">2 weeks</SelectItem>
                      <SelectItem value="1 month">1 month</SelectItem>
                      <SelectItem value="3 months">3 months</SelectItem>
                      <SelectItem value="none">No follow-up needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleGeneratePDF}>
                  <FileText className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button variant="outline" onClick={handleSendReport}>
                  <Send className="mr-2 h-4 w-4" />
                  Send to Patient
                </Button>
                <Button onClick={handleSaveReport} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Report"
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="prescription">
          <Card>
            <CardHeader>
              <CardTitle>Prescription</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div>
                  <Label htmlFor="medications">Medications</Label>
                  <Textarea
                    id="medications"
                    name="medications"
                    value={reportData.medications}
                    onChange={handleInputChange}
                    placeholder="Prescribed medications with dosage and duration"
                    rows={6}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleGeneratePDF}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
                <Button onClick={handleSaveReport} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Prescription"
                  )}
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
