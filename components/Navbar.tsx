'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { Menu, X, Upload, CreditCard } from 'lucide-react'
import { UserButton, SignInButton, useUser } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isSignedIn, user } = useUser()
  const [credits, setCredits] = useState(5) // Assume 5 free credits

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/about', label: 'About' },
    { href: '/pricing', label: 'Pricing' },
  ]

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">AI Resume Enhancer</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden md:block">
            {isSignedIn ? (
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2">
                      <Upload className="w-4 h-4" />
                      <span>Upload</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <label htmlFor="file-upload" className="cursor-pointer flex items-center">
                        <Upload className="w-4 h-4 mr-2" />
                        <span>Upload File</span>
                      </label>
                      <input id="file-upload" type="file" className="hidden" />
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/dashboard" className="flex items-center">
                        <CreditCard className="w-4 h-4 mr-2" />
                        <span>Paste Resume</span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="text-sm text-gray-600">
                  Credits: {credits}/10
                  <Progress value={(credits / 10) * 100} className="w-20 h-2 ml-2" />
                </div>
                <Button variant="outline" asChild>
                  <Link href="/pricing">Upgrade</Link>
                </Button>
                <UserButton afterSignOutUrl="/" />
              </div>
            ) : (
              <SignInButton mode="modal">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">Sign In</Button>
              </SignInButton>
            )}
          </div>
          <div className="md:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {isSignedIn ? (
              <>
                <div className="px-3 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Credits: {credits}/10</span>
                    <Progress value={(credits / 10) * 100} className="w-20 h-2" />
                  </div>
                </div>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/pricing">Upgrade</Link>
                </Button>
                <div className="px-3 py-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </>
            ) : (
              <SignInButton mode="modal">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">Sign In</Button>
              </SignInButton>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}