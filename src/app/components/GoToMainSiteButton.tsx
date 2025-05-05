// components/GoToMainSiteButton.tsx
'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export function GoToMainSiteButton() {
  const router = useRouter()

  const handleNavigate = () => {
    if (typeof window !== 'undefined') {
      // Switch to main domain
      window.location.href = process.env.NEXT_PUBLIC_MAIN_SITE_URL || 'http://localhost:3000'
    }
  }

  return (
    <Button onClick={handleNavigate}>
      Go to Main Site
    </Button>
  )
}