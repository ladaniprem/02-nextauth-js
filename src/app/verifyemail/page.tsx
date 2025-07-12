'use client'
import React from 'react'
import { useState,useEffect, useCallback } from 'react'
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function VerifyEmailPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyEmail = useCallback(async () => {
    try {
      const response = await axios.post('/api/users/verifyemail', { token })
      setVerified(true);
      console.log("Email verified successfully:", response.data);
      router.push('/login');
      setError(false);
    } catch (error) {
      console.error("Error verifying email:", error);
      setError(true);
    }
  }, [token, router])

  useEffect(() => {
    const urlToken = searchParams.get('token');
    setToken(urlToken || "");
  },[searchParams])

  useEffect(() => {
    if (token.length > 0) {
      setError(false);
      verifyEmail()
    }
  },[token, verifyEmail])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 animate-bounce">
        Verify Email
      </h1>
      <p className="text-gray-600 mb-4">Token: {token}</p>
      {verified && (
        <div className="text-green-500 font-semibold text-lg p-4 bg-green-100 rounded-lg shadow-md transform transition-all duration-500 ease-in-out animate-pulse">
          Email verified successfully
          <Link href="/login" className="text-blue-500 hover:underline ml-2">
            Go to Login
          </Link>
        </div>
      )}
      {error && (
        <div className="text-red-500 font-semibold text-lg p-4 bg-red-100 rounded-lg shadow-md transform transition-all duration-500 ease-in-out animate-pulse">
          Error verifying email
        </div>
      )}
    </div>
  )
}

export default VerifyEmailPage;
