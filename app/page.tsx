'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader, Copy, Download, FileText, Users, Zap, ArrowRight } from 'lucide-react'
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast"
import { useCompletion } from 'ai/react'
import Link from 'next/link'
import { useUser } from '@clerk/nextjs'

export default function HomePage() {
  const [step, setStep] = useState(1)
  const { toast } = useToast()
  const { isSignedIn } = useUser()

  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/enhance-resume',
  })

  const enhanceResume = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter your resume content before enhancing.",
        variant: "destructive",
      })
      return
    }
    handleSubmit(e)
    setStep(3)
  }

  const downloadResume = (content: string, filename: string) => {
    const element = document.createElement("a");
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content).then(() => {
      toast({
        title: "Copied",
        description: "Resume content copied to clipboard.",
      })
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16">
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
            <Button size="lg" onClick={() => setStep(2)} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              Try for free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">Request Demo</Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex justify-center space-x-12">
            {['Google', 'Microsoft', 'Amazon', 'Apple', 'Facebook'].map((company, index) => (
              <motion.div
                key={company}
                className="text-gray-400 text-lg"
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
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">How AI Resume Enhancer Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "Upload Your Resume", description: "Simply paste your existing resume content into our system." },
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

        {step > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-16"
          >
            <Card className="bg-white shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800">{step === 2 ? "Enhance Your Resume" : "Your Enhanced Resume"}</CardTitle>
                <CardDescription className="text-gray-600">
                  {step === 2 ? "Paste your resume below to get started" : "Compare your original and enhanced resumes"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 2 ? (
                  <form onSubmit={enhanceResume} className="space-y-4">
                    <Input
                      placeholder="Paste your resume here..."
                      value={input}
                      onChange={handleInputChange}
                      className="h-40 bg-gray-50 border-2 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                    />
                    <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                      {isLoading ? (
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Enhancing...
                        </>
                      ) : (
                        'Enhance My Resume'
                      )}
                    </Button>
                  </form>
                ) : (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-bold mb-2 text-gray-800">Original Resume</h3>
                      <Input value={input} readOnly className="h-40 mb-2 bg-gray-50" />
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(input)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => downloadResume(input, 'original_resume.txt')}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-gray-800">Enhanced Resume</h3>
                      <Input value={completion} readOnly className="h-40 mb-2 bg-gray-50" />
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => copyToClipboard(completion)}>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => downloadResume(completion, 'enhanced_resume.txt')}>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}