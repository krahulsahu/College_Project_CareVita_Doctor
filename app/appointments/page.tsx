import { DashboardLayout } from "@/components/layout/dashboard-layout"
import { AppointmentList } from "@/components/appointments/appointment-list"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AppointmentsPage() {
  return (
    <DashboardLayout title="Appointments">
      <Tabs defaultValue="all">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Appointments</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <AppointmentList />
        </TabsContent>
        <TabsContent value="pending">
          {/* In a real app, you would filter appointments by status */}
          <AppointmentList />
        </TabsContent>
        <TabsContent value="completed">
          {/* In a real app, you would filter appointments by status */}
          <AppointmentList />
        </TabsContent>
        <TabsContent value="cancelled">
          {/* In a real app, you would filter appointments by status */}
          <AppointmentList />
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  )
}
