'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { toast } from "react-hot-toast"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post('/api/users/login', formData);
      console.log('Login response:', response.data);
      if (response.data.success) {
        setMessage('Success! Redirecting...');
        toast.success('Login successful!');
        router.push('/profile');
      } else {
        setMessage('Login failed. Please try again.');
        toast.error(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error: unknown) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        setMessage(error.response?.data?.message || 'An error occurred during login.');
        toast.error(error.response?.data?.message || 'An error occurred during login.');
      } else {
        setMessage('An error occurred during login.');
        toast.error('An error occurred during login.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Login your account</CardTitle>
          <CardDescription>
            {message && <p className="text-center text-sm">{message}</p>}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder=""
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Logging in...' : 'Login'}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              <div className="mt-4 text-center text-sm text-gray-400">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="font-medium text-primary hover:text-primary/90 underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
