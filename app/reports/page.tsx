"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Download, Search, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Report {
  id: string
  patientName: string
  patientId: string
  date: string
  diagnosis: string
  type: "Report" | "Prescription"
}

export default function ReportsPage() {
  const [reports, setReports] = useState<Report[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    // In a real app, fetch reports from API
    setTimeout(() => {
      setReports([
        {
          id: "1",
          patientName: "Rahul",
          patientId: "1",
          date: "30 Apr 2025",
          diagnosis: "Common Cold",
          type: "Report",
        },
        {
          id: "2",
          patientName: "Dinanath Kumar",
          patientId: "2",
          date: "29 Apr 2025",
          diagnosis: "Hypertension",
          type: "Prescription",
        },
        {
          id: "3",
          patientName: "Priya Sharma",
          patientId: "4",
          date: "28 Apr 2025",
          diagnosis: "Migraine",
          type: "Report",
        },
        {
          id: "4",
          patientName: "Amit Patel",
          patientId: "5",
          date: "27 Apr 2025",
          diagnosis: "Diabetes Type 2",
          type: "Prescription",
        },
      ])
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredReports = reports.filter(
    (report) =>
      report.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewReport = (id: string) => {
    // In a real app, navigate to report details
    alert(`View report ${id}`)
  }

  const handleDownloadReport = (id: string) => {
    // In a real app, download report
    alert(`Download report ${id}`)
  }

  const handleCreateReport = () => {
    router.push("/reports/create/1")
  }

  if (isLoading) {
    return (
      <DashboardLayout title="Reports">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout title="Reports & Prescriptions">
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search reports..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button onClick={handleCreateReport}>
          <FileText className="mr-2 h-4 w-4" />
          Create New Report
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Patient</TableHead>
              <TableHead>Diagnosis</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.patientName}</TableCell>
                  <TableCell>{report.diagnosis}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewReport(report.id)}>
                        <FileText className="mr-2 h-4 w-4" />
                        View
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDownloadReport(report.id)}>
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No reports found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DashboardLayout>
  )
}
