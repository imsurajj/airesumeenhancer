'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader, Copy, Download, Bell, BarChart } from 'lucide-react'
// import { useToast } from "@/components/ui/use-toast"
import { useToast } from "@/hooks/use-toast"
import { useCompletion } from 'ai/react'
import { useUser } from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function DashboardContent() {
  const { user } = useUser()
  const [activeTab, setActiveTab] = useState('profile')
  const { toast } = useToast()

  const {
    completion,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/enhance-resume',
  })

  // ... (rest of the component logic remains the same) ...

  

  return (
    <div className="container mx-auto px-4 py-8">
      {/* ... (rest of the component JSX remains the same) ... */}
    </div>
  )
}