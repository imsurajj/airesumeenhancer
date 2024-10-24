import HomePage from '@/components/HomePage'
import ErrorBoundary from '@/components/ErrorBoundary'
import Navbar from '@/components/Navbar'

export default function Page() {
  return (
    <ErrorBoundary>
      <Navbar />
      <HomePage />
    </ErrorBoundary>
  )
}