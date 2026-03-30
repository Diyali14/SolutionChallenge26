import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { LayoutDashboard } from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50/50 p-4 sm:p-8">
      <div className="w-full max-w-md bg-white p-8 rounded-[32px] shadow-[0_8px_40px_-12px_rgba(0,0,0,0.1)] border border-gray-100">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/30">
            <LayoutDashboard className="h-7 w-7" />
          </div>
          <h1 className="text-3xl font-black tracking-tight text-gray-900">NGO Portal</h1>
          <p className="mt-2 text-sm font-medium text-gray-500">Sign in to manage your operations</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <Input 
            label="Organization Email" 
            type="email" 
            placeholder="admin@ngo.org" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••" 
            required 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="flex items-center justify-between text-sm w-full">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500" />
              <span className="font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Remember me</span>
            </label>
            <a href="#" className="font-semibold text-brand-600 hover:text-brand-500 pb-0.5 border-b border-transparent hover:border-brand-500 transition-all">Forgot password?</a>
          </div>

          <Button type="submit" className="w-full mt-2 h-12 text-base font-bold">
            Sign In &rarr;
          </Button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-gray-500">
          Not an NGO yet? <a href="#" className="font-bold text-brand-600 hover:underline">Apply for an account</a>
        </p>
      </div>
    </div>
  );
};
