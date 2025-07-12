'use client'
import React from 'react'
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Image from 'next/image';
function Profile() {
  const router = useRouter();
  const [data, setData] = useState({
    _id: "",
    username: "",
    email: ""
  });

  const getUserData = async () => {
    try {
      const response = await axios.post('/api/users/me')
      console.log("User data fetched successfully:", response.data);
      setData(response.data);
    } catch (error: unknown) {
      console.error("Error fetching user data:", error);
      toast.error("Failed to fetch user data");
    }
  }

  // Automatically fetch user data when component loads
  useEffect(() => {
    getUserData();
  }, []);

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success("Logged out successfully");
      router.push('/login');
    } catch (error: unknown) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white/90 backdrop-blur-sm border rounded-lg shadow-lg p-8 w-96">
      <div className="text-center">
      <h1 className="text-2xl font-semibold tracking-tight mb-4">Profile Page</h1>
      <div className="mb-4">
      <p className="text-sm text-muted-foreground">User ID: {data._id || "Loading..."}</p>
      </div>
      <div className="space-y-3">
      <div className="flex flex-col items-center space-y-4 mb-6">
        <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden">
        <Image
        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data._id || 'default'}`}
        alt="User Avatar"
        width={128}
        height={128}
        priority
        className="w-full h-full object-cover rounded-full"
        style={{ objectFit: 'cover' }}
        />
        </div>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium">Welcome, {data.username || "User"}</p>
        <p className="text-sm text-gray-500">Email: {data.email || "Loading..."}</p>
      </div>
      </div>
      <button
      onClick={getUserData}
      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 px-4 rounded-md transition-colors transform hover:-translate-y-0.5 duration-200"
      >
      Get User Data
      </button>
      <button
      onClick={logout}
      className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground py-2 px-4 rounded-md transition-colors mt-2"
      >
      Logout
      </button>
      </div>
      </div>
    </div>
  )
}
export default Profile
