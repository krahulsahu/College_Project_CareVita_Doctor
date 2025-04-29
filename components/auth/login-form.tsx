"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Stethoscope, PlusCircle, Clipboard, AmbulanceIcon as FirstAid } from "lucide-react"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, you would authenticate with a backend
    // const response = await signIn(email, password)

    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1000)
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-50 items-center justify-center p-12">
        <div className="relative w-full max-w-lg">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center justify-center p-8 rounded-xl bg-white shadow-xl">
                <Shield className="h-16 w-16 text-blue-500" />
                <PlusCircle className="absolute h-8 w-8 text-green-500 top-4 right-4" />
              </div>
              <div className="flex items-center justify-center p-8 rounded-xl bg-white shadow-xl">
                <Stethoscope className="h-16 w-16 text-blue-500" />
              </div>
              <div className="flex items-center justify-center p-8 rounded-xl bg-white shadow-xl">
                <Clipboard className="h-16 w-16 text-blue-500" />
              </div>
              <div className="flex items-center justify-center p-8 rounded-xl bg-white shadow-xl">
                <FirstAid className="h-16 w-16 text-blue-500" />
              </div>
            </div>
            <h1 className="mt-12 text-3xl font-bold text-center text-gray-800">CareVita</h1>
            <p className="mt-4 text-center text-gray-600">Your trusted healthcare management platform</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8 lg:hidden">
            <Shield className="h-10 w-10 text-blue-500 mr-2" />
            <h1 className="text-2xl font-bold">CareVita</h1>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Welcome Back Doctor</CardTitle>
              <CardDescription>Welcome back! Please enter your details.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="doctor@carevita.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" />
                    <label
                      htmlFor="remember"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember for 30 days
                    </label>
                  </div>
                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col items-center gap-2">
              <Link href="/forgot-password" className="text-sm text-blue-500 hover:underline">
                Forgot password
              </Link>
              <div className="text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href="/signup" className="text-blue-500 hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
