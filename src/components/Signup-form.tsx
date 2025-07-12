'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import axios from 'axios'
import Link from 'next/link'
function Signupform() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', formData);
      console.log('Signup response:', response.data);
      if (response.data.success) {
        setMessage('Success! Redirecting to login...');
        toast.success('Signup successful! Redirecting to login...');
        router.push('/login');
      } else {
        setMessage('Signup failed. Please try again.');
        toast.error(response.data.message || 'Signup failed. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Signup error:', error);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'An error occurred during signup.');
        toast.error(error.response?.data?.message || 'An error occurred during signup.');
      } else {
        setMessage('An error occurred during signup.');
        toast.error('An error occurred during signup.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-black">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center">Create an Account</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your details to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSignup} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="block text-sm font-medium">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  required
                  className="mt-1"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="mt-1"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  className="mt-1"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>
            </div>

            {message && (
              <div className={`p-3 rounded-md text-sm text-center ${
                message.startsWith('Success') 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-red-100 text-red-700'
              }`}>
                {message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full py-2 bg-primary hover:bg-primary/90"
              disabled={loading}
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </Button>

            <div className="text-center text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:text-primary/90 underline underline-offset-4">
                Log in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default Signupform
