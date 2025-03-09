"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useOpenCampus } from "@/context/open-campus-context"
import { Loader2, ArrowLeft } from "lucide-react"

export default function SignupPage() {
  const router = useRouter()
  const { connect } = useOpenCampus()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate signup process
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // After signup, connect with Open Campus ID
      await connect()

      // Redirect to create campaign page
      router.push("/create-campaign")
    } catch (error) {
      console.error("Signup failed:", error)
      setError("Failed to create account. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="gradient-bg min-h-screen">
      <div className="container mx-auto py-8 px-4">
        <Link href="/create-campaign" className="inline-flex items-center text-white/80 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>

        <div className="card-container p-8 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-white mb-6">Create an Open Campus ID</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-white font-medium">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-white font-medium">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-white font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-white font-medium">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full bg-white/10 border border-white/20 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {error && <div className="text-sm text-red-400 font-medium">{error}</div>}

            <button
              type="submit"
              className="action-button w-full py-3 flex items-center justify-center mt-6"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="text-center text-white/70 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/create-campaign" className="text-white hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}

