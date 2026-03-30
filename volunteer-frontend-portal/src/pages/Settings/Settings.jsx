import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Bell, Lock, MapPin, Globe, Moon, Shield } from "lucide-react";

export const Settings = () => {
  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your account preferences and notifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start bg-brand-50 text-brand-700 font-semibold hover:bg-brand-100">
            <Lock size={18} className="mr-3" /> Account Security
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Bell size={18} className="mr-3" /> Notifications
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <MapPin size={18} className="mr-3" /> Location Services
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Globe size={18} className="mr-3" /> Language & Region
          </Button>
          <Button variant="ghost" className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-gray-50">
            <Moon size={18} className="mr-3" /> Appearance
          </Button>
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-3 space-y-6">
          
          <Card>
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Shield size={20} className="text-brand-500" /> Account Security
              </h3>
            </div>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Current Password</label>
                <Input type="password" placeholder="••••••••" className="bg-gray-50" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">New Password</label>
                  <Input type="password" placeholder="••••••••" className="bg-gray-50" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider pl-1">Confirm New Password</label>
                  <Input type="password" placeholder="••••••••" className="bg-gray-50" />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-gray-100 mt-6">
                <div>
                  <h4 className="font-bold text-gray-900">Two-Factor Authentication</h4>
                  <p className="text-xs text-gray-500 mt-1 max-w-[250px]">Add an extra layer of security to your account.</p>
                </div>
                <Button variant="outline" className="text-brand-600 border-brand-200 bg-brand-50 hover:bg-brand-100">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Bell size={20} className="text-brand-500" /> Notification Preferences
              </h3>
            </div>
            <CardContent className="p-6 space-y-6">
              {[
                { title: "New Task Alerts", desc: "Get notified when urgent tasks match your skills.", active: true },
                { title: "NGO Messages", desc: "Receive direct messages from NGOs you are working with.", active: true },
                { title: "Impact Reports", desc: "Monthly summary of your volunteer contributions.", active: false },
                { title: "Promotional Updates", desc: "News, events, and partnership announcements.", active: false },
              ].map((setting, idx) => (
                <div key={idx} className="flex items-center justify-between pb-4 border-b border-gray-50 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">{setting.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{setting.desc}</p>
                  </div>
                  <div className={`w-10 h-5 rounded-full transition-colors cursor-pointer relative ${setting.active ? 'bg-brand-500' : 'bg-gray-300'}`}>
                    <div className={`w-4 h-4 rounded-full absolute top-0.5 bg-white transition-all shadow-sm ${setting.active ? 'left-5' : 'left-0.5'}`}></div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="flex justify-end pt-4">
            <Button className="px-8 shadow-sm">Save Preferences</Button>
          </div>

        </div>

      </div>
    </div>
  );
};
