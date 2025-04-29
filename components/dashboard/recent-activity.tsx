"use client"
import { CheckCircle, XCircle, FileText, MessageSquare, Calendar } from "lucide-react"

interface Activity {
  id: string
  type:
    | "appointment_completed"
    | "appointment_cancelled"
    | "report_created"
    | "message_received"
    | "appointment_scheduled"
  patientName: string
  patientImage?: string
  time: string
  description: string
}

export function RecentActivity() {
  // Mock data - in a real app, this would come from an API
  const activities: Activity[] = [
    {
      id: "1",
      type: "appointment_completed",
      patientName: "Rahul",
      time: "1 hour ago",
      description: "Appointment completed",
    },
    {
      id: "2",
      type: "report_created",
      patientName: "Dinanath Kumar",
      time: "3 hours ago",
      description: "Medical report created",
    },
    {
      id: "3",
      type: "message_received",
      patientName: "Priya Sharma",
      time: "Yesterday",
      description: "New message received",
    },
    {
      id: "4",
      type: "appointment_cancelled",
      patientName: "Sneha Gupta",
      time: "Yesterday",
      description: "Appointment cancelled",
    },
    {
      id: "5",
      type: "appointment_scheduled",
      patientName: "Rajesh Singh",
      time: "2 days ago",
      description: "New appointment scheduled",
    },
  ]

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "appointment_completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "appointment_cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "report_created":
        return <FileText className="h-4 w-4 text-purple-500" />
      case "message_received":
        return <MessageSquare className="h-4 w-4 text-blue-500" />
      case "appointment_scheduled":
        return <Calendar className="h-4 w-4 text-yellow-500" />
    }
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start gap-3">
          <div className="mt-0.5">{getActivityIcon(activity.type)}</div>
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{activity.patientName}</h4>
              <span className="text-xs text-muted-foreground">{activity.time}</span>
            </div>
            <p className="text-sm text-muted-foreground">{activity.description}</p>
          </div>
        </div>
      ))}

      {activities.length === 0 && <div className="text-center py-4 text-muted-foreground">No recent activity</div>}
    </div>
  )
}
