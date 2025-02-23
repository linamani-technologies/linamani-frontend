import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-600">© 2023 Visygo. All rights reserved.</div>
        <nav>
          <ul className="flex space-x-4 text-sm">
            <li>
              <Link href="#" className="text-blue-600 hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-600 hover:underline">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link href="#" className="text-blue-600 hover:underline">
                Contact Support
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

