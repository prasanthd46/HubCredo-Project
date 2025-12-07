import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  
   const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });
      console.log(response)
      const data = await response.json();
      console.log(data)
      if (response.ok) {
        toast.success("Login Successful");
        navigate('/dashboard'); 
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("Network error. Please try again.");
      
    }
  };



  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center overflow-hidden font-sans text-white selection:bg-purple-500/30">
      
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/30 rounded-full blur-[120px] " />

      <div className="relative z-10 w-full max-w-[420px] p-6 sm:p-10">
        
        <div className='flex justify-center text-6xl mb-6'>
            <div className="bg-linear-to-r from-indigo-200 to-indigo-600 bg-clip-text text-transparent">HubScript.IO</div>
        </div>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-1 bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-white/40 text-sm">
            Sign in to your account to continue
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleLogin}>
          
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 ml-1">Email</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 ">
                <Mail className="w-4 h-4" />
              </div>
              <input 
                name="email"
                type="email" 
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/1 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all duration-300 hover:bg-white/[0.07] "
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 ml-1">Password</label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30  transition-colors pointer-events-none">
                <Lock className="w-4 h-4" />
              </div>
              <input 
                name="password"
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10  rounded-xl py-3.5 pl-11 pr-10 text-sm text-white placeholder-white/20 [&::-ms-reveal]:hidden outline-none transition-all duration-300 hover:bg-white/[0.07]"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/30 hover:text-white hover:bg-white/10 transition-all"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button text={"Sign In"}/>

        </form>

        <p className="text-center text-xs text-white/40 mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-white hover:text-indigo-400 font-medium duration-300 ">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}