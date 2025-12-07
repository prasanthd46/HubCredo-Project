import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, { 
        method: 'POST',
        credentials: 'include'
      });
      const data = await response.json();
      if(response.ok){
          navigate("/login");
      }else{
            toast.error(data.error || "Logout failed");
      }
    } catch (error) {
        toast.error("Network error. Please try again.");
    } 
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 font-sans ">
      
      
      <nav className="flex items-center justify-between mb-16 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <span className=" text-3xl tracking-wider font-bold  ">HubScript.IO</span>
        </div>
        <div className={`border border-white/20 px-10 py-2 md:flex  text-white/70 justify-between items-center rounded-full hidden `}>
            <div className='px-4 hover:bg-white/5 py-1 rounded-full hover:text-white '>
                Home
            </div >
            <div className='px-4 hover:bg-white/5 py-1 rounded-full hover:text-white  '>
                About
            </div>
            <div className='px-4 hover:bg-white/5 hover:text-white  py-1 rounded-full '>
                Product
            </div>
            <div className='px-4 hover:bg-white/5 hover:text-white py-1 rounded-full '>
                Services
            </div>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/5 hover:border-white/10"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign out</span>
        </button>
      </nav>

      
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Welcome back, <span className="bg-linear-to-r from-indigo-200 to-indigo-600 bg-clip-text text-transparent">User</span>
          </h1>
          <p className="text-white/40 text-lg max-w-2xl ">
            You are in HubScript Dashboard
          </p>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-48 rounded-3xl bg-white/5 border border-white/10 p-6 relative hover:bg-linear-to-br">
              <div className="absolute inset-0 bg-linear-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="h-8 w-8 rounded-full bg-white/10 mb-4" />
              <div className="h-4 w-3/4 bg-white/10 rounded mb-2" />
              <div className="h-4 w-3/4 bg-white/10 rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}