"use client"

import MainLayout from "@/components/layout/main-layout"
import ProjectForm from "@/components/project/project-form"
import ProtectedRoute from "@/components/auth/protected-route"

export default function SubmitProjectPage() {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto py-8">
          <ProjectForm />
        </div>
      </MainLayout>
    </ProtectedRoute>
  )
}

