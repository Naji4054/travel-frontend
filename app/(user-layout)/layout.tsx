import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@radix-ui/react-select'
import Link from 'next/link'
import React from 'react'

const UserLayout = ({children}: any) => {
  return (
    <>
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-teal-600"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span className="text-xl font-bold">Odyssey</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium">
              Home
            </Link>
            <Link href="/international" className="text-sm font-medium">
              International
            </Link>
            <Link href="/indian" className="text-sm font-medium">
              Domestic
            </Link>
            <Link href="/group" className="text-sm font-medium">
              Group
            </Link>
            <Link href="/about" className="text-sm font-medium">
              About
            </Link>
            <Link href="/allPackage" className="text-sm font-medium">
              All Packages
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/register" className="hidden md:block">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>
      {children}
      {/* <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-teal-600"
            >
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span className="text-lg font-bold">MediCare</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">© 2025 MediCare. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              <span className="sr-only">Facebook</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
              <span className="sr-only">Twitter</span>
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
              <span className="sr-only">LinkedIn</span>
            </Link>
          </div>
        </div>
      </footer> */}
      <footer className="w-full border-t bg-background py-12">
        <div className="container px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
            {/* Column 1: Company Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 h-8 mb-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-teal-600"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="text-xl font-bold leading-none">Odyssey</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">Explore the world with unforgettable journeys</p>
            </div>

            {/* Column 2: Packages */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-base h-8 mb-3 flex items-center">Packages</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/international" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                    International
                  </Link>
                </li>
                <li>
                  <Link href="/indian" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                    Domestic
                  </Link>
                </li>
                <li>
                  <Link href="/group" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                    Group
                  </Link>
                </li>
                <li>
                  <Link href="/allPackage" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                    All Packages
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Quick Links */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-base h-8 mb-3 flex items-center">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-sm text-gray-600 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Support */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-base h-8 mb-3 flex items-center">Support</h3>
              <ul className="space-y-2">
                <li className="text-sm text-gray-600 dark:text-gray-400">
                  <span className="block mb-1">Email:</span>
                  <a href="mailto:info@odyssey.com" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors">
                    info@odyssey.com
                  </a>
                </li>
                <li className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                  <span className="block mb-1">Phone:</span>
                  <a href="tel:+911234567890" className="hover:text-teal-600 dark:hover:text-teal-500 transition-colors">
                    +91 123 456 7890
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 5: Address & Social */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-base h-8 mb-3 flex items-center">Head Office</h3>
              <address className="text-sm text-gray-600 dark:text-gray-400 not-italic mb-4 leading-relaxed">
                123, Travel Street,<br />
                Mumbai, Maharashtra<br />
                India - 400001
              </address>
              <div className="flex gap-4 mt-auto">
                <Link href="#" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                    <path d="M2 12h20" />
                  </svg>
                  <span className="sr-only">Google</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-500 hover:text-teal-600 dark:text-gray-400 dark:hover:text-teal-500 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="border-t mt-8 pt-6">
            <p className="text-sm text-center text-gray-500 dark:text-gray-400">
              © 2025 Odyssey. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default UserLayout
