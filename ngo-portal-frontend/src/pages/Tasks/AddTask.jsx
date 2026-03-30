import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, Save, Send, AlertTriangle } from "lucide-react";

const SKILLS = ["Logistics", "Medical", "Education", "Driving", "Heavy Lifting", "Communication", "Cleaning", "Construction"];

export const AddTask = () => {
  const navigate = useNavigate();
  const [urgency, setUrgency] = useState(50);
  const [selectedSkills, setSelectedSkills] = useState([]);
  
  const score = Math.min(100, Math.round(urgency * 0.7 + selectedSkills.length * 10));

  const toggleSkill = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" className="h-10 w-10 p-0 rounded-full bg-white shadow-sm border border-gray-100" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Create New Task</h2>
          <p className="text-sm font-medium text-gray-500">Define requirements and assign resources.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100">Task Details</h3>
            <div className="space-y-5">
              <Input label="Mission Title" placeholder="e.g. Flood Relief Distribution" />
              
              <div className="flex flex-col gap-1.5 break-inside-avoid">
                <label className="text-sm font-bold text-gray-700">Description</label>
                <textarea 
                  className="w-full rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm focus:bg-white focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 transition-all min-h-[120px]"
                  placeholder="Elaborate on the task requirements..."
                />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <Input label="Location" placeholder="Coordinates / Address" />
                <Input label="Deadline" type="date" />
              </div>
              
              <Input label="Number of People Needed" type="number" min="1" placeholder="1" />
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-5 pb-4 border-b border-gray-100">Requirements & Priority</h3>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <label className="text-sm font-bold text-gray-700">Urgency Level</label>
                  <span className={`text-xs font-black uppercase tracking-widest px-2.5 py-1 rounded-full ${urgency > 75 ? 'bg-red-100 text-red-600' : 'bg-brand-100 text-brand-600'}`}>
                    {urgency > 75 ? 'Critical' : urgency > 40 ? 'Moderate' : 'Low'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" 
                  value={urgency}
                  onChange={(e) => setUrgency(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-600 focus:outline-none focus:ring-4 focus:ring-brand-500/20" 
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-700 block mb-3">Required Skills</label>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map(skill => (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleSkill(skill)}
                      className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                        selectedSkills.includes(skill)
                        ? "bg-brand-600 border-brand-600 text-white shadow-md shadow-brand-500/30 scale-105"
                        : "bg-white border-gray-200 text-gray-600 hover:border-brand-300 hover:text-brand-600"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-brand-900 to-brand-700 text-white border-none shadow-lg shadow-brand-900/20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-brand-200 mb-1">Estimated</h3>
            <h2 className="text-lg font-black text-white mb-6">Priority Score</h2>
            
            <div className="flex items-end gap-2 mb-2">
              <span className="text-6xl font-black">{score}</span>
              <span className="text-xl font-bold text-brand-300 pb-1">/ 100</span>
            </div>
            
            <div className="h-2 w-full bg-brand-950/50 rounded-full mt-4 overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-500 ${score > 80 ? 'bg-red-400 shadow-[0_0_10px_rgba(248,113,113,0.5)]' : 'bg-brand-300'}`}
                style={{ width: `${score}%` }} 
              />
            </div>
            <p className="mt-4 text-xs font-medium text-brand-200 opacity-80 flex items-center gap-1.5">
              <AlertTriangle className="h-3 w-3" />
              Calculated based on urgency & skills.
            </p>
          </Card>

          <div className="flex flex-col gap-3">
            <Button className="h-14 text-base font-bold shadow-md shadow-brand-500/20 gap-2">
              <Send className="h-5 w-5" /> Submit Task
            </Button>
            <Button variant="outline" className="h-14 font-bold gap-2 bg-white text-gray-600">
              <Save className="h-5 w-5 text-gray-400" /> Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
