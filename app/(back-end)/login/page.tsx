import React from 'react'
import LoginForm from '@/components/Auth/LoginForm'
import { getServerUser } from '@/actions/auth'
import { redirect } from 'next/navigation'

export default async function LoginUser() {
  const session = await getServerUser()
  if (session) {
   redirect('/')
  }
  return <LoginForm />
}
