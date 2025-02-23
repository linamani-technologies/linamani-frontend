import Image from "next/image"
import { UserCircle } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image src="/placeholder.svg?height=40&width=40" alt="Visygo Logo" width={40} height={40} />
          <span className="ml-2 text-xl font-semibold">Visygo</span>
        </div>
        <div className="flex items-center">
          <UserCircle className="w-6 h-6 mr-2" />
          <span>John Doe</span>
        </div>
      </div>
    </header>
  )
}

