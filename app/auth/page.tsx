"use client"

import AuthForm from "@/components/auth/auth-form"

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">ILEWA</h1>
          <p className="mt-2 text-slate-600">Connectez-vous pour continuer</p>
        </div>
        <AuthForm />
      </div>
    </div>
  )
}
