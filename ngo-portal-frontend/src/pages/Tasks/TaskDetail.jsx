import { useParams, useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, Clock, MapPin, Users, Send, CheckCircle2, Navigation } from "lucide-react";
import { MOCK_TASKS } from "../../data/mockData";

export const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = MOCK_TASKS.find(t => t.id === id) || MOCK_TASKS[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full border border-gray-200 bg-white shadow-sm hover:bg-gray-50" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            {task.title}
          </h2>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mt-0.5">{task.id}</p>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <Badge status={task.status} className="px-3 py-1 font-bold">{task.status}</Badge>
          <Button className="font-bold gap-2 bg-brand-600 hover:bg-brand-700 shadow-md shadow-brand-500/20" onClick={() => navigate('/tracking')}>
            <Navigation className="h-4 w-4" /> Track Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-4">Task Information</h3>
            <p className="text-gray-600 mb-6 leading-relaxed">{task.description}</p>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm pt-4 border-t border-gray-100">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-xs flex items-center gap-1.5"><MapPin className="h-3 w-3" /> Location</span>
                <span className="font-semibold text-gray-900">{task.location}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-xs flex items-center gap-1.5"><Clock className="h-3 w-3" /> Deadline</span>
                <span className="font-semibold text-gray-900">{new Date(task.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-gray-400 uppercase tracking-widest text-xs flex items-center gap-1.5"><Users className="h-3 w-3" /> Assigned Volunteer</span>
                <span className={`font-semibold ${task.assignedVolunteer ? 'text-gray-900' : 'text-yellow-600'}`}>{task.assignedVolunteer || "Needs assignment"}</span>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-3">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {task.skills.map(s => (
                  <span key={s} className="bg-gray-100 border border-gray-200 text-gray-600 px-3 py-1 text-xs font-bold rounded-lg uppercase tracking-wide">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-4 mb-5">Execution Checklist</h3>
            <div className="space-y-4">
              {['Pickup items', 'Arrive at destination', 'Distribute items', 'Log confirmation'].map((item, idx) => (
                <label key={idx} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group">
                  <input type="checkbox" className="h-5 w-5 rounded form-checkbox text-brand-600 focus:ring-brand-500 border-gray-300" defaultChecked={idx === 0} />
                  <span className={`text-sm font-semibold transition-colors ${idx === 0 ? "text-gray-400 line-through" : "text-gray-700 group-hover:text-gray-900"}`}>{item}</span>
                  {idx === 0 && <CheckCircle2 className="h-4 w-4 text-green-500 ml-auto" />}
                </label>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className={`${task.progress === 100 ? 'bg-green-600 border-green-700 text-white' : 'bg-brand-900 border-none shadow-xl shadow-brand-900/20 text-white'}`}>
            <h3 className="font-bold text-brand-200 text-xs tracking-widest uppercase mb-1">Completion Status</h3>
            <div className="flex justify-between items-end mb-4">
              <span className="text-5xl font-black">{task.progress}%</span>
            </div>
            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden mt-6 shadow-inner">
              <div 
                className="h-full bg-white rounded-full transition-all duration-1000"
                style={{ width: `${task.progress}%` }} 
              />
            </div>
            <p className="mt-4 text-xs font-medium opacity-80 flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> Last updated: {new Date(task.lastUpdated).toLocaleDateString()}
            </p>
          </Card>

          <Card className="flex flex-col h-[400px]">
            <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Activity & Chat</h3>
            <div className="flex-1 overflow-y-auto space-y-4 py-4 text-sm scroll-smooth">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold text-xs shrink-0">H</div>
                <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl rounded-tl-sm w-full font-medium">
                  Task created. Do we have the supplies ready?
                  <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-wider">10:00 AM</div>
                </div>
              </div>
              <div className="flex items-start gap-3 flex-row-reverse">
                <div className="h-8 w-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold text-xs shrink-0">{task.assignedVolunteer?.charAt(0) || 'V'}</div>
                <div className="bg-brand-600 text-white p-3 rounded-2xl rounded-tr-sm w-full font-medium shadow-md shadow-brand-600/20 text-right">
                  Yes, supplies picked up. Heading there now.
                  <div className="text-[10px] text-brand-200 mt-1 uppercase font-bold tracking-wider">10:15 AM</div>
                </div>
              </div>
            </div>
            <div className="mt-auto pt-4 border-t border-gray-100 relative">
              <input 
                type="text" 
                placeholder="Type a message..." 
                className="w-full text-sm rounded-xl bg-gray-50 border border-gray-200 p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500 transition-all font-medium"
              />
              <button className="absolute right-3 top-6 text-brand-600 hover:text-brand-700 transition-colors">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
