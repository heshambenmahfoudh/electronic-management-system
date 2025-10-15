import { getServerUser } from '@/actions/auth'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import NavbarLayout from '@/components/NavbarLayout'
import { redirect } from 'next/navigation'
export default async function RootHome() {
  const session = await getServerUser()
  if (!session) {
    redirect('/login')
  }
  return (
    <div>
      <NavbarLayout />
      <Hero />
      <Footer />
    </div>
  )
}
