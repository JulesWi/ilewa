"use client"

import AnalyticsDashboard from "@/components/dashboard/analytics-dashboard"
import ProtectedRoute from "@/components/auth/protected-route"

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <AnalyticsDashboard />
    </ProtectedRoute>
  )
}

