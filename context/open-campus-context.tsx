"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
}

interface OpenCampusContextType {
  isConnected: boolean
  isConnecting: boolean
  user: User | null
  connect: () => Promise<void>
  disconnect: () => void
}

const OpenCampusContext = createContext<OpenCampusContextType | undefined>(undefined)

export function OpenCampusProvider({ children }: { children: ReactNode }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  // Check if user is already logged in on mount
  useEffect(() => {
    const checkSession = () => {
      const storedUser = localStorage.getItem("openCampusUser")
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser)
          setUser(userData)
          setIsConnected(true)
        } catch (error) {
          console.error("Error parsing stored user data:", error)
          localStorage.removeItem("openCampusUser")
        }
      }
    }

    checkSession()
  }, [])

  const connect = async () => {
    setIsConnecting(true)
    try {
      // Simulate API call to Open Campus authentication service
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock successful login
      const mockUser = {
        id: "oc_" + Math.random().toString(36).substring(2, 10),
        name: "Demo User",
        email: "demo@opencampus.edu",
      }

      setUser(mockUser)
      setIsConnected(true)
      localStorage.setItem("openCampusUser", JSON.stringify(mockUser))
    } catch (error) {
      console.error("Error connecting to Open Campus:", error)
      throw error
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = () => {
    setIsConnected(false)
    setUser(null)
    localStorage.removeItem("openCampusUser")
  }

  return (
    <OpenCampusContext.Provider
      value={{
        isConnected,
        isConnecting,
        user,
        connect,
        disconnect,
      }}
    >
      {children}
    </OpenCampusContext.Provider>
  )
}

export function useOpenCampus() {
  const context = useContext(OpenCampusContext)
  if (context === undefined) {
    throw new Error("useOpenCampus must be used within an OpenCampusProvider")
  }
  return context
}

