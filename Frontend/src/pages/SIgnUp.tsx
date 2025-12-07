import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const apiUrl = import.meta.env.VITE_API_URL; 

    try {
      console.log(formData)
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      console.log(response)
      if (response.ok) {
        toast.success("Signup successful.An Email is Sent to your gmail account");
        navigate('/login'); 
      } else {
        const errorData = await response.json();
        console.log(errorData)
        toast.error("Signup failed: " + (errorData.error || "Unknown error"));
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("Network error. Please try again.");
    }
  };


  return (
    <div className="relative min-h-screen w-full bg-[#050505] flex items-center justify-center  text-white">
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-500/30 rounded-full blur-[150px]" />
      <div className="relative z-10 w-full max-w-[420px] p-6 sm:p-10 ">
        <div className="flex justify-center text-6xl mb-6">
          <div className="bg-linear-to-r from-indigo-200 to-indigo-600 bg-clip-text text-transparent">
            HubScript.IO
          </div>
        </div>
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight mb-3 bg-linear-to-b from-white to-white/70 bg-clip-text text-transparent">
            Create an account
          </h1>
        </div>

        <div className="relative flex items-center py-2 mb-6">
          <div className="h-px bg-linear-to-r from-transparent via-white/10 to-transparent flex-1" />
        </div>

        <form className="space-y-5" onSubmit={handleSignup}>
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 ml-1">
              Email
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30  ">
                <Mail className="w-4 h-4" />
              </div>
              <input
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10  rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder-white/20 outline-none transition-all duration-300  "
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-white/60 ml-1">
              Password
            </label>
            <div className="relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">
                <Lock className="w-4 h-4" />
              </div>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="* * * * * *"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10  rounded-xl py-3.5 pl-11 pr-10 text-sm text-white [&::-ms-reveal]:hidden placeholder-white/20 outline-none transition-all duration-300 hover:bg-white/[0.07] focus:outline-amber-900-300 "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md text-white/30 hover:text-white hover:bg-white/10 transition-all"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <Button text={"Create Account"} />
        </form>

        <p className="text-center text-xs text-white/40 mt-8">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-white hover:text-indigo-400 font-medium"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
