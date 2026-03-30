import { useAuth } from "../../context/AuthContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Badge } from "../../components/ui/Badge";
import { User, MapPin, Compass, Medal } from "lucide-react";

export const Profile = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in pb-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Volunteer Profile</h1>
        <p className="text-gray-500 mt-1">Manage your public identity and skills.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <Card className="md:col-span-1 text-center py-8">
          <CardContent className="flex flex-col items-center pt-6">
            <div className="w-32 h-32 rounded-full ring-4 ring-brand-50 mb-6 relative">
              <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
              <div className="absolute bottom-0 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-brand-600 font-semibold mb-6">{user.role}</p>
            
            <Badge variant="outline" className="px-4 py-1.5 mb-8 text-sm"><Medal size={16} className="mr-2 text-yellow-500" /> Top Contributor</Badge>

            <Button className="w-full" variant="outline">Edit Picture</Button>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Card>
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <User className="text-gray-400" size={20} />
              <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
            </div>
            <CardContent className="p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Full Name</label>
                  <Input defaultValue={user.name} className="bg-gray-50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Email</label>
                  <Input defaultValue="alex.johnson@example.com" type="email" className="bg-gray-50" />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 flex items-center gap-1.5"><MapPin size={12}/> Location Area</label>
                <Input defaultValue={user.location} className="bg-gray-50" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="p-6 border-b border-gray-100 flex items-center gap-3">
              <Compass className="text-gray-400" size={20} />
              <h3 className="text-lg font-bold text-gray-900">Skills & Availability</h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1 block mb-3">Your Skills</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {user.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="px-3 py-1 text-sm bg-brand-50 text-brand-700 font-semibold cursor-pointer hover:bg-brand-100">
                      {skill} ✕
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="h-7 border-dashed border-gray-300 text-gray-500 bg-gray-50 hover:bg-gray-100">+ Add Skill</Button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Normal Availability</label>
                <Input defaultValue={user.availability} className="bg-gray-50" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 mt-2">
                <div>
                  <h4 className="font-bold text-gray-900">Currently Available</h4>
                  <p className="text-xs text-gray-500 mt-0.5">Allow NGOs to send urgent requests directly to you.</p>
                </div>
                <div className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${user.isAvailable ? 'bg-brand-500' : 'bg-gray-300'}`}>
                  <div className={`w-5 h-5 rounded-full absolute top-0.5 bg-white transition-all shadow-sm ${user.isAvailable ? 'left-6' : 'left-0.5'}`}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3 pt-2">
            <Button variant="outline" className="bg-white">Discard Changes</Button>
            <Button className="px-8 shadow-sm shadow-brand-500/20">Save Profile</Button>
          </div>
        </div>

      </div>
    </div>
  );
};
