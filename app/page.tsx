'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, FileText, Zap, Users, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInButton, useUser } from '@clerk/nextjs'

export default function HomePage() {
  const router = useRouter()
  const { isSignedIn } = useUser()

  const handleTryForFree = () => {
    if (isSignedIn) {
      router.push('/upload')
    } else {
      router.push('/sign-in?redirect=/upload')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Elevate Your Career
          </h1>
          <p className="text-2xl text-gray-600 mb-8">Transform your resume with the power of AI</p>
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleTryForFree}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center"
            >
              Try for free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              Request Demo
            </Button>
          </div>
        </motion.div>

        {/* ... (rest of the content remains the same) ... */}

        {/* New CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="mt-16 bg-blue-600 text-white rounded-lg p-8 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Take Your Career to the Next Level?</h2>
          <p className="text-xl mb-6">Join thousands of professionals who have already enhanced their resumes with AI.</p>
          <Button
            onClick={handleTryForFree}
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50"
          >
            Get Started Now
          </Button>
        </motion.div>

        {/* Footer */}
        <footer className="mt-16 border-t pt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link href="/features">Features</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about">About Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
                <li><Link href="/contact">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/blog">Blog</Link></li>
                <li><Link href="/guides">Guides</Link></li>
                <li><Link href="/support">Support</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/cookies">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-600">
            © 2023 AI Resume Enhancer. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  )
}