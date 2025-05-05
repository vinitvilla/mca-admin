// app/not-found.tsx
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>
        
        <p className="text-2xl font-medium text-muted-foreground">
          Page not found
        </p>
        
        <p className="text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Button asChild className="mt-6 gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  )
}