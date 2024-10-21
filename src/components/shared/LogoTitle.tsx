import Link from "next/link"

export const LogoTitle = () => {
  return (
    <div className="flex items-center">
        <Link href="/" className="flex items-center space-x-2">
            <div className="h-6 w-6 bg-blue-600 rounded"></div>
            <span className="text-2xl font-primary text-brand-blue-50">BJJ<b>Link</b></span>
        </Link>
    </div>
  )
}