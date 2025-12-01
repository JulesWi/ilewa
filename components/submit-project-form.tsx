"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase-client"

interface SubmitProjectFormProps {
  onClose: () => void
  onSubmit: () => void
}

export default function SubmitProjectForm({ onClose, onSubmit }: SubmitProjectFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    category: "",
    description: "",
    latitude: "",
    longitude: "",
    repository_url: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.from("projects").insert([formData])
    if (error) console.error("Error submitting project:", error)
    else {
      onSubmit()
      onClose()
    }
  }

  return (
    <Card className="absolute left-1/2 top-1/2 w-96 -translate-x-1/2 -translate-y-1/2 transform">
      <CardHeader>
        <CardTitle>Submit New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
          <Input name="author" placeholder="Author" value={formData.author} onChange={handleChange} required />
          <Select value={formData.category} onValueChange={handleSelectChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="environment">Environment</SelectItem>
              <SelectItem value="health">Health</SelectItem>
              <SelectItem value="education">Education</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            name="description"
            placeholder="Project Description"
            value={formData.description}
            onChange={handleChange}
            required
          />
          <Input
            name="latitude"
            placeholder="Latitude"
            value={formData.latitude}
            onChange={handleChange}
            required
            type="number"
            step="any"
          />
          <Input
            name="longitude"
            placeholder="Longitude"
            value={formData.longitude}
            onChange={handleChange}
            required
            type="number"
            step="any"
          />
          <Input
            name="repository_url"
            placeholder="Repository URL"
            value={formData.repository_url}
            onChange={handleChange}
            required
          />
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

