'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRight, FileText, Zap, Users } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SignInButton, useUser } from '@clerk/nextjs'
// import ErrorBoundary from '@/components/ErrorBoundary'

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
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Elevate Your Career
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8">Transform your resume with the power of AI</p>
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
              <Button
                onClick={handleTryForFree}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300 flex items-center justify-center"
              >
                Try for free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-6 py-3 text-lg">
                Request Demo
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-16"
          >
            <div className="flex flex-wrap justify-center space-x-4 md:space-x-12">
              {['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook'].map((company, index) => (
                <motion.div
                  key={company}
                  className="text-gray-400 text-lg mb-4 md:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">How AI Resume Enhancer Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: FileText, title: "Upload Your Resume", description: "Simply paste your existing resume content or upload a file." },
                { icon: Zap, title: "AI Enhancement", description: "Our AI analyzes and optimizes your resume for maximum impact." },
                { icon: Users, title: "Stand Out to Employers", description: "Get noticed with a professionally enhanced resume tailored to your industry." }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 + index * 0.2, duration: 0.5 }}
                >
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader>
                      <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                      <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

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