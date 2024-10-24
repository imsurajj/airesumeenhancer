import Navbar from '@/components/Navbar'
import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('@/components/HomePage'), {
  loading: () => <p>Loading...</p>,
})

export default function Page() {
  return 
  <>
  <Navbar />
  <HomePage />
  </>
}