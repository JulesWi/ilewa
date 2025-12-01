"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ModernButton } from "@/components/ui/modern-button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// Remplacer cette ligne d'importation si elle existe
import { supabase } from "@/lib/supabaseClient"

// Au lieu de
// import { supabase } from "@/lib/supabase-client";

export default function AuthForm() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      if (data.user) {
        console.log("Connexion réussie, session établie")
        console.log("Attente de l'enregistrement des cookies...")
        
        // Attendre que les cookies soient enregistrés
        setTimeout(() => {
          console.log("Redirection vers dashboard...")
          window.location.href = "/dashboard"
        }, 500)
      }
    } catch (error: any) {
      console.error("Erreur de connexion:", error)
      setError(error.message || "Une erreur est survenue lors de la connexion")
      setLoading(false)
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      // Après l'inscription, créer un enregistrement dans la table users
      const { data: user } = await supabase.auth.getUser()

      if (user) {
        await supabase.from("users").insert({
          id: user.user.id,
          email: email,
          full_name: fullName,
          role: "user",
        })
      }

      router.push("/auth/verify")
    } catch (error: any) {
      setError(error.message || "Une erreur est survenue lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border border-slate-200">
      <Tabs defaultValue="signin">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <TabsList className="grid w-full grid-cols-2 bg-white">
            <TabsTrigger value="signin" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">Connexion</TabsTrigger>
            <TabsTrigger value="signup" className="data-[state=active]:bg-slate-800 data-[state=active]:text-white">Inscription</TabsTrigger>
          </TabsList>
        </CardHeader>
        <CardContent className="pt-6">
          {error && <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-md mb-4 text-sm">{error}</div>}

          <TabsContent value="signin">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <ModernButton type="submit" variant="default" className="w-full" disabled={loading}>
                {loading ? "Connexion en cours..." : "Se connecter"}
              </ModernButton>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nom complet</Label>
                <Input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-signup">Email</Label>
                <Input
                  id="email-signup"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-signup">Mot de passe</Label>
                <Input
                  id="password-signup"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <ModernButton type="submit" variant="default" className="w-full" disabled={loading}>
                {loading ? "Inscription en cours..." : "S'inscrire"}
              </ModernButton>
            </form>
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  )
}

