import { LoginForm } from "@/components/auth/login-form"

export default function Home() {
  // In a real app, check if user is already authenticated
  // const isAuthenticated = checkAuth()
  // if (isAuthenticated) redirect('/dashboard')

  return <LoginForm />
}
