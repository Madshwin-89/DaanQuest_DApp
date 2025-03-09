import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format ether value for display
export function formatEther(value: number): string {
  return value.toFixed(3)
}

// Check if window.ethereum is available
export function isMetaMaskAvailable(): boolean {
  return typeof window !== "undefined" && window.ethereum !== undefined
}

// Declare ethereum global for TypeScript
declare global {
  interface Window {
    ethereum?: any
  }
}

