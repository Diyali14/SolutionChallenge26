import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Map, Phone, MessageSquare, MapPin, Navigation2, CheckCircle2 } from "lucide-react";

const STEPS = [
  { label: "Task Accepted", status: "completed", time: "09:00 AM" },
  { label: "Heading to Location", status: "completed", time: "09:15 AM" },
  { label: "Reached Location", status: "active", time: "09:45 AM" },
  { label: "Work Started", status: "pending", time: "--:--" },
  { label: "Work Progress", status: "pending", time: "--:--" },
  { label: "Completed", status: "pending", time: "--:--" },
];

export const Tracking = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Live Tracking</h2>
          <p className="text-sm font-medium text-gray-500">Monitor active operations in real-time.</p>
        </div>
        <Button variant="outline" className="font-bold gap-2">
          <Map className="h-4 w-4" /> Full Map View
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <Card className="p-0 overflow-hidden relative group">
            <div className="bg-gray-200 h-[400px] w-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-transparent to-transparent pointer-events-none"></div>
              
              <div className="absolute top-1/2 left-1/3 animate-pulse">
                <div className="relative">
                  <div className="absolute -inset-4 bg-brand-500/20 rounded-full animate-ping"></div>
                  <div className="h-4 w-4 bg-brand-600 rounded-full ring-4 ring-white shadow-lg relative z-10"></div>
                  <span className="absolute top-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap">
                    Volunteer: Alex
                  </span>
                </div>
              </div>

              <div className="absolute top-1/4 right-1/4">
                <div className="h-6 w-6 bg-red-500 text-white rounded-full ring-4 ring-white shadow-lg flex items-center justify-center">
                  <MapPin className="h-3 w-3" />
                </div>
                <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-white text-gray-900 font-bold text-xs px-3 py-1.5 rounded-xl shadow-xl whitespace-nowrap border border-gray-100">
                  Destination
                </span>
              </div>
              
              {/* Pseudo polyline */}
              <svg className="absolute inset-0 h-full w-full pointer-events-none stroke-brand-600 stroke-2 drop-shadow-md">
                <path d="M 33% 50% Q 50% 30% 75% 25%" fill="none" strokeDasharray="6 6" />
              </svg>

              <div className="flex flex-col items-center z-10 bg-white/90 backdrop-blur px-6 py-4 rounded-3xl shadow-2xl border border-gray-100/50 -mb-28 group-hover:mb-0 transition-all duration-500">
                <Map className="h-6 w-6 text-gray-400 mb-2" />
                <span className="text-sm font-bold text-gray-700 tracking-wide">Interactive Map Display</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-6">
            <Button className="h-14 font-black text-lg gap-3 bg-white border border-gray-200 text-brand-600 hover:bg-gray-50 shadow-sm" variant="outline">
              <Phone className="h-5 w-5" /> Call Volunteer
            </Button>
            <Button className="h-14 font-black text-lg gap-3 bg-white border border-gray-200 text-brand-600 hover:bg-gray-50 shadow-sm" variant="outline">
              <MessageSquare className="h-5 w-5" /> Live Chat
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="h-full">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-6 flex justify-between items-center">
              Mission Progress
              <span className="text-xs font-black bg-brand-100 text-brand-700 px-3 py-1 rounded-full uppercase tracking-widest">TSK-001</span>
            </h3>
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />
              
              <div className="space-y-8 relative">
                {STEPS.map((step, idx) => (
                  <div key={idx} className="flex gap-6 items-start">
                    <div className="relative">
                      <div className={`h-8 w-8 rounded-full ring-4 ring-white flex items-center justify-center shrink-0 transition-colors shadow-sm ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'active' ? 'bg-yellow-500 text-white ring-yellow-100' :
                        'bg-gray-100 border-2 border-dashed border-gray-300'
                      }`}>
                        {step.status === 'completed' && <CheckCircle2 className="h-5 w-5" />}
                        {step.status === 'active' && <Navigation2 className="h-4 w-4 animate-bounce" />}
                      </div>
                    </div>
                    <div className="pt-1.5 flex-1">
                      <p className={`font-black tracking-tight text-sm ${
                        step.status === 'completed' ? 'text-gray-900' :
                        step.status === 'active' ? 'text-yellow-700' :
                        'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                      <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
