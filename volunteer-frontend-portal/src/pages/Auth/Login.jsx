import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Heart } from "lucide-react";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login();
    navigate("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA] p-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12 border border-gray-100">
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 shadow-inner">
            <Heart className="h-7 w-7 text-brand-500 fill-brand-500/20" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Volunteer Portal</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to start making an impact</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 pl-1">Email</label>
            <Input type="email" placeholder="volunteer@example.com" defaultValue="volunteer@example.com" required />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-600 pl-1">Password</label>
            <Input type="password" placeholder="••••••••" defaultValue="password" required />
          </div>
          
          <div className="flex items-center justify-between py-2">
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="rounded text-brand-500 focus:ring-brand-500 h-4 w-4 bg-gray-50 border-gray-300" />
              Remember me
            </label>
            <a href="#" className="font-medium text-brand-600 text-sm hover:underline">Forgot password?</a>
          </div>

          <Button type="submit" className="w-full h-12 text-sm mt-4">
            Sign in as Volunteer
          </Button>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            Don't have an account? <a href="#" className="font-semibold text-brand-600 hover:text-brand-500">Sign up</a>
          </div>
        </form>
      </div>
    </div>
  );
};
