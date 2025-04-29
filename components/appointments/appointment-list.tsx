"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, MessageSquare, FileText, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface Appointment {
  id: number
  patientName: string
  paymentMethod: string
  age: number
  dateTime: string
  fees: number
  status: "Pending" | "Completed" | "Cancelled"
}

// Mock data - in a real app, this would come from an API
const mockAppointments: Appointment[] = [
  {
    id: 1,
    patientName: "Rahul",
    paymentMethod: "CASH",
    age: 18,
    dateTime: "30 Apr 2025, 11:00 AM",
    fees: 31,
    status: "Completed",
  },
  {
    id: 2,
    patientName: "Dinanath Kumar",
    paymentMethod: "CASH",
    age: 18,
    dateTime: "29 Apr 2025, 05:30 PM",
    fees: 31,
    status: "Cancelled",
  },
  {
    id: 3,
    patientName: "Dinanath Kumar",
    paymentMethod: "CASH",
    age: 18,
    dateTime: "30 Apr 2025, 10:30 AM",
    fees: 31,
    status: "Completed",
  },
  {
    id: 4,
    patientName: "Priya Sharma",
    paymentMethod: "CARD",
    age: 35,
    dateTime: "01 May 2025, 09:00 AM",
    fees: 45,
    status: "Pending",
  },
  {
    id: 5,
    patientName: "Amit Patel",
    paymentMethod: "CASH",
    age: 42,
    dateTime: "01 May 2025, 02:30 PM",
    fees: 31,
    status: "Pending",
  },
  {
    id: 6,
    patientName: "Sneha Gupta",
    paymentMethod: "CARD",
    age: 28,
    dateTime: "02 May 2025, 11:30 AM",
    fees: 45,
    status: "Pending",
  },
  {
    id: 7,
    patientName: "Rajesh Singh",
    paymentMethod: "CASH",
    age: 50,
    dateTime: "02 May 2025, 04:00 PM",
    fees: 31,
    status: "Pending",
  },
]

interface AppointmentListProps {
  limit?: number
}

export function AppointmentList({ limit }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would be an API call
    // const fetchAppointments = async () => {
    //   const response = await fetch('/api/appointments')
    //   const data = await response.json()
    //   setAppointments(data)
    //   setIsLoading(false)
    // }

    // Simulate API call with mock data
    setTimeout(() => {
      setAppointments(limit ? mockAppointments.slice(0, limit) : mockAppointments)
      setIsLoading(false)
    }, 1000)
  }, [limit])

  const handleComplete = (id: number) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Completed" } : appointment,
      ),
    )
  }

  const handleCancel = (id: number) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Cancelled" } : appointment,
      ),
    )
  }

  const handleChat = (id: number) => {
    router.push(`/chat/${id}`)
  }

  const handleReport = (id: number) => {
    router.push(`/reports/create/${id}`)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "Cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      case "Pending":
        return (
          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
            Pending
          </Badge>
        )
      default:
        return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Patient</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead>Fees</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.id}</TableCell>
              <TableCell>{appointment.patientName}</TableCell>
              <TableCell>{appointment.paymentMethod}</TableCell>
              <TableCell>{appointment.age}</TableCell>
              <TableCell>{appointment.dateTime}</TableCell>
              <TableCell>${appointment.fees}</TableCell>
              <TableCell>{getStatusBadge(appointment.status)}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  {appointment.status === "Pending" && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleComplete(appointment.id)}
                        title="Complete Appointment"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleCancel(appointment.id)}
                        title="Cancel Appointment"
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleChat(appointment.id)}
                    title="Chat with Patient"
                  >
                    <MessageSquare className="h-4 w-4 text-blue-500" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleReport(appointment.id)}
                    title="Create Report"
                  >
                    <FileText className="h-4 w-4 text-purple-500" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
