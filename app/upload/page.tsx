'use client'

import { useState } from 'react'
import PDFViewer from '@/components/PDFViewer'

export default function UploadPage() {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setPdfUrl(url)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      <input type="file" accept=".pdf" onChange={handleFileUpload} className="mb-4" />
      {pdfUrl && <PDFViewer pdfUrl={pdfUrl} />}
    </div>
  )
}