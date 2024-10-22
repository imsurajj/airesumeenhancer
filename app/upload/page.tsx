'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader, Upload } from 'lucide-react'
// import { useToast } from '@/components/ui/toast'
import { useToast } from '@/hooks/use-toast'
import { useUser } from '@clerk/nextjs'
import dynamic from 'next/dynamic'
import ErrorBoundary from '@/components/ErrorBoundary'

const PDFViewer = dynamic(() => import('@/components/PDFViewer'), { ssr: false })

export default function UploadPage() {
  const { user } = useUser()
  const router = useRouter()
  const { toast } = useToast()
  const [file, setFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [enhancedResume, setEnhancedResume] = useState('')

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setIsLoading(true)
      try {
        if (selectedFile.type === 'application/pdf') {
          // Handle PDF file
          const text = await extractTextFromPdf(selectedFile)
          setResumeText(text)
        } else {
          // Handle other file types
          const text = await selectedFile.text()
          setResumeText(text)
        }
      } catch (error) {
        console.error('Error processing file:', error)
        toast({
          title: 'Error',
          description: 'Failed to process the file. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setIsLoading(false)
      }
    }
  }, [toast])

  const extractTextFromPdf = async (file: File): Promise<string> => {
    // This is a placeholder function. In a real application, you'd use a library like pdf.js to extract text.
    return 'Extracted text from PDF would go here.'
  }

  const enhanceResume = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!user) {
      router.push('/sign-in')
      return
    }

    if (!resumeText.trim()) {
      toast({
        title: 'Error',
        description: 'Please upload a resume or paste resume content before enhancing.',
        variant: 'destructive',
      })
      return
    }

    setIsLoading(true)

    try {
      const enhanceResponse = await fetch('/api/enhance-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: resumeText }),
      })

      if (!enhanceResponse.ok) {
        throw new Error('Failed to enhance resume')
      }

      const enhancedData = await enhanceResponse.json()
      setEnhancedResume(enhancedData.result)
      toast({
        title: 'Success',
        description: 'Your resume has been enhanced!',
      })
    } catch (error) {
      console.error('Error enhancing resume:', error)
      toast({
        title: 'Error',
        description: 'Failed to enhance resume. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-white shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-800">Upload Your Resume</CardTitle>
              <CardDescription className="text-gray-600">
                Upload your resume or paste your content to get started
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={enhanceResume} className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-10 h-10 mb-3 text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                    </div>
                    <Input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
                  </label>
                </div>
                {file && file.type === 'application/pdf' && (
                  <div className="mt-4">
                    <PDFViewer file={file} />
                  </div>
                )}
                <Textarea
                  placeholder="Or paste your resume content here..."
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
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
              {enhancedResume && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Enhanced Resume</h3>
                  <Textarea value={enhancedResume} readOnly className="h-60 bg-gray-50" />
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </ErrorBoundary>
  )
}