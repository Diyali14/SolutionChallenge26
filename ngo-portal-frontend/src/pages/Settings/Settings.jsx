import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";
import { Save, LogOut } from "lucide-react";

export const Settings = () => {
  const { user, logout } = useAuth();
  
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Organization Settings</h2>
        <p className="text-sm font-medium text-gray-500 mt-1">Manage profile, preferences, and account security.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <ul className="space-y-1sticky top-24">
            <li><button className="w-full text-left px-4 py-2 bg-brand-50 text-brand-700 font-bold rounded-xl transition-colors">Profile Details</button></li>
            <li><button className="w-full text-left px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors">Notification Preferences</button></li>
            <li><button className="w-full text-left px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-xl transition-colors">Security & Access</button></li>
          </ul>
        </div>
        
        <div className="md:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Profile Information</h3>
            <div className="space-y-4">
              <Input label="Organization / Manager Name" defaultValue={user?.name} className="max-w-md" />
              <Input label="Contact Email" type="email" defaultValue={user?.email || "admin@ngo.org"} className="max-w-md" />
              <div className="flex flex-col gap-1.5 break-inside-avoid">
                <label className="text-sm font-bold text-gray-700">Bio / Mission Statement</label>
                <textarea 
                  className="w-full max-w-lg rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all min-h-[100px]"
                  defaultValue="Dedicated to community upliftment."
                />
              </div>
            </div>
            <div className="mt-6 flex gap-3">
              <Button className="font-bold gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Preferences</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between group">
                <div>
                  <h4 className="font-bold text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive alerts when tasks change status.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600 relative outline outline-1 outline-gray-300 peer-checked:outline-brand-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between group">
                <div>
                  <h4 className="font-bold text-gray-900">SMS Alerts</h4>
                  <p className="text-sm text-gray-500">Enable for urgent priority tasks only.</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-600 relative outline outline-1 outline-gray-300 peer-checked:outline-brand-600"></div>
                </label>
              </div>
            </div>
          </Card>

          <Card className="border-red-100 bg-red-50/30">
            <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
            <p className="text-sm text-gray-600 mb-6">Log out or permanently delete your portal data.</p>
            <div className="flex items-center gap-4">
              <Button variant="danger" className="gap-2 bg-white border border-red-200 text-red-700 hover:bg-red-50 focus:ring-red-500 shadow-sm" onClick={logout}>
                <LogOut className="h-4 w-4" /> Logout Session
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
