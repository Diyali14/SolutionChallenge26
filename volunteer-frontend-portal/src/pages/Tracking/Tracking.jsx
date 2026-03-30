import { useState } from "react";
import { MOCK_TASKS } from "../../data/mockData";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Map, Navigation, CheckCircle2, MessageSquare, AlertCircle, Phone, MapPin, Truck, Check } from "lucide-react";

export const Tracking = () => {
  const activeTask = MOCK_TASKS.find(t => t.status === "Active") || MOCK_TASKS[0];
  
  // Steps: 0 = Accepted, 1 = Traveling, 2 = Arrived, 3 = Working, 4 = Completed
  const [currentStep, setCurrentStep] = useState(1); 
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, sender: "NGO", text: "Thanks for accepting! Let us know if you need directions.", time: "10:00 AM" }
  ]);
  const [checklist, setChecklist] = useState([
    { id: 1, text: "Pick up food boxes from Main Hub", done: true },
    { id: 2, text: "Drive to Downtown Grid", done: false },
    { id: 3, text: "Distribute 50 boxes at Sector 4", done: false },
    { id: 4, text: "Confirm final count", done: false }
  ]);

  const toggleChecklist = (id) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "You", text: chatInput, time: "Now" }]);
    setChatInput("");
  };

  const steps = ["Accepted", "Traveling", "Arrived", "Working", "Completed"];

  return (
    <div className="space-y-6 animate-in fade-in pb-8 max-w-5xl mx-auto">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Active Task Tracking</h1>
          <p className="text-gray-500 mt-1">{activeTask.title} • {activeTask.ngoName}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100"><AlertCircle size={16} className="mr-2"/> Report Issue</Button>
          <Button variant="outline" className="bg-white"><Phone size={16} className="mr-2"/> Contact NGO</Button>
        </div>
      </div>

      {/* Map Placeholder for Google Maps API */}
      <Card className="overflow-hidden border-2 border-brand-100 ring-4 ring-brand-50 shadow-sm relative h-64 md:h-80 bg-brand-50 flex items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%233b82f6\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="relative z-10 flex flex-col items-center p-6 bg-white/90 backdrop-blur-md rounded-3xl shadow-xl text-center border p border-brand-100">
          <div className="p-3 bg-brand-100 text-brand-600 rounded-full mb-3">
             <Map size={32} />
          </div>
          <h3 className="font-bold text-gray-900 text-lg">Map View</h3>
          <p className="text-sm text-gray-500 mb-4 max-w-xs">Ready for Google Maps API Integration. Location tracked in real-time.</p>
          <Button size="sm" variant="secondary">Simulate Movement</Button>
        </div>
      </Card>

      {/* Progress Timeline UI */}
      <Card className="px-6 py-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1.5 bg-gray-100 rounded-full z-0"></div>
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-brand-500 rounded-full z-0 transition-all duration-500" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}></div>
          
          {steps.map((step, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            
            return (
              <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${isCompleted ? 'bg-brand-500 border-white text-white' : isCurrent ? 'bg-white border-brand-500 text-brand-600' : 'bg-gray-100 border-white text-gray-400'}`}>
                  {isCompleted ? <Check size={18} /> : 
                   isCurrent && step === "Traveling" ? <Truck size={18} /> :
                   isCurrent && step === "Arrived" ? <MapPin size={18} /> :
                   <div className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-brand-600' : isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>{step}</span>
              </div>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          
          {/* Status Control Panel */}
          <Card className="border-t-4 border-t-brand-500">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Status Update</h3>
              <p className="text-sm text-gray-500 mb-6 font-medium">Update your status so the NGO knows your progress.</p>
              
              <div className="space-y-3">
                <Button 
                  onClick={() => setCurrentStep(1)} 
                  variant={currentStep === 1 ? 'default' : 'outline'} 
                  className={`w-full justify-start py-6 text-base ${currentStep !== 1 && 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <Navigation size={20} className="mr-3 text-brand-300" /> Start Journey
                </Button>
                <Button 
                  onClick={() => setCurrentStep(2)} 
                  variant={currentStep === 2 ? 'default' : 'outline'} 
                  className={`w-full justify-start py-6 text-base ${currentStep !== 2 && 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <MapPin size={20} className="mr-3 text-brand-300" /> Reached Location
                </Button>
                <Button 
                  onClick={() => setCurrentStep(3)} 
                  variant={currentStep === 3 ? 'default' : 'outline'} 
                  className={`w-full justify-start py-6 text-base ${currentStep !== 3 && 'bg-white text-gray-600 hover:bg-gray-50'}`}
                >
                  <AlertCircle size={20} className="mr-3 text-brand-300" /> Start Working
                </Button>
                <Button 
                  onClick={() => setCurrentStep(4)} 
                  className="w-full justify-start bg-green-500 hover:bg-green-600 py-6 text-base text-white border border-green-600"
                >
                  <CheckCircle2 size={20} className="mr-3 text-white/50" /> Mark Task Complete
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Checklist */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Task Checklist</h3>
              <div className="space-y-3">
                {checklist.map(item => (
                  <label key={item.id} className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input 
                      type="checkbox" 
                      checked={item.done} 
                      onChange={() => toggleChecklist(item.id)}
                      className="mt-1 w-5 h-5 rounded-md text-brand-500 focus:ring-brand-500 border-gray-300"
                    />
                    <span className={`text-sm font-medium ${item.done ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {item.text}
                    </span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Chat Panel */}
        <Card className="flex flex-col h-[500px] md:h-auto">
          <div className="p-4 border-b border-gray-100 bg-gray-50 rounded-t-2xl flex items-center justify-between">
            <h3 className="font-bold text-gray-900 flex items-center gap-2"><MessageSquare size={18} className="text-brand-500" /> Live Support Chat</h3>
            <span className="flex items-center gap-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Online</span>
          </div>
          
          <CardContent className="p-4 flex-1 overflow-y-auto space-y-4 bg-white">
            {messages.map(msg => (
              <div key={msg.id} className={`flex flex-col max-w-[80%] ${msg.sender === 'You' ? 'ml-auto items-end' : 'items-start'}`}>
                <div className={`p-3 rounded-2xl ${msg.sender === 'You' ? 'bg-brand-500 text-white rounded-tr-sm' : 'bg-gray-100 text-gray-800 rounded-tl-sm'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 font-medium mt-1 pr-1">{msg.time} • {msg.sender}</span>
              </div>
            ))}
          </CardContent>
          
          <div className="p-4 border-t border-gray-100">
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input 
                value={chatInput} 
                onChange={e => setChatInput(e.target.value)} 
                placeholder="Type a message..." 
                className="flex-1 bg-gray-50"
              />
              <Button type="submit" size="icon" className="shrink-0"><Navigation size={18} className="rotate-90 ml-0.5" /></Button>
            </form>
          </div>
        </Card>

      </div>
    </div>
  );
};
