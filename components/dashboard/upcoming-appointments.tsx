"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Appointment {
  id: string
  patientName: string
  patientImage?: string
  time: string
  date: string
  reason: string
}

export function UpcomingAppointments() {
  const router = useRouter()

  // Mock data - in a real app, this would come from an API
  const appointments: Appointment[] = [
    {
      id: "1",
      patientName: "Rahul",
      time: "11:00 AM",
      date: "Today",
      reason: "Follow-up consultation",
    },
    {
      id: "4",
      patientName: "Priya Sharma",
      time: "09:00 AM",
      date: "Tomorrow",
      reason: "Headache and fever",
    },
    {
      id: "5",
      patientName: "Amit Patel",
      time: "02:30 PM",
      date: "Tomorrow",
      reason: "Diabetes check-up",
    },
  ]

  const handleViewAppointment = (id: string) => {
    router.push(`/appointments?id=${id}`)
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted">
          <Avatar>
            <AvatarImage src={appointment.patientImage || "/placeholder.svg"} alt={appointment.patientName} />
            <AvatarFallback>{appointment.patientName[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{appointment.patientName}</h4>
              <Badge variant="outline" className="text-xs">
                {appointment.date}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate">{appointment.reason}</p>
            <p className="text-xs text-muted-foreground">{appointment.time}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={() => handleViewAppointment(appointment.id)}>
            View
          </Button>
        </div>
      ))}

      {appointments.length === 0 && (
        <div className="text-center py-4 text-muted-foreground">No upcoming appointments</div>
      )}
    </div>
  )
}
