import HomePage from '@/components/HomePage';
import Navbar from '@/components/Navbar';

export default function Page() {
  console.log("Rendering Page Component");
  return (
    <>
      <Navbar />
      <HomePage />
    </>
  );
}
