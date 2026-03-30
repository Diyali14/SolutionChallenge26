import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_TASKS } from "../../data/mockData";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Progress } from "../../components/ui/Progress";
import { Clock, ShieldCheck, PlayCircle, CheckCircle2 } from "lucide-react";

export const MyTasks = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("active");

  // Filter tasks based on "assigned" state and tab status
  const acceptedTasks = MOCK_TASKS.filter(t => t.isAccepted);
  const activeTasks = acceptedTasks.filter(t => t.status === "Active");
  const pendingTasks = acceptedTasks.filter(t => t.status === "Pending");
  const completedTasks = acceptedTasks.filter(t => t.status === "Completed");

  const getFilteredTasks = () => {
    switch (activeTab) {
      case "active": return activeTasks;
      case "pending": return pendingTasks;
      case "completed": return completedTasks;
      default: return activeTasks;
    }
  };

  const tasksToDisplay = getFilteredTasks();

  return (
    <div className="space-y-8 animate-in fade-in pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">My Tasks</h1>
        <p className="text-gray-500 mt-1">Track your commitments and review past impact.</p>
      </div>

      <div className="border-b border-gray-200">
        <nav className="flex gap-8" aria-label="Tabs">
          {[
            { id: "active", name: "Active", count: activeTasks.length },
            { id: "pending", name: "Pending", count: pendingTasks.length },
            { id: "completed", name: "Completed", count: completedTasks.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group inline-flex items-center gap-2 border-b-2 py-4 px-1 text-sm font-medium transition-all
                ${activeTab === tab.id
                  ? 'border-brand-500 text-brand-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                }
              `}
            >
              {tab.name}
              <span className={`
                hidden md:inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold
                ${activeTab === tab.id ? 'bg-brand-100 text-brand-700' : 'bg-gray-100 text-gray-900 group-hover:bg-gray-200'}
              `}>
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-6">
        {tasksToDisplay.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mt-4">No tasks found</h3>
            <p className="text-gray-500 mt-2 mb-6 max-w-sm mx-auto">
              You don't have any tasks in this category. Head over to the Explore page to find new opportunities to help out!
            </p>
            <Button onClick={() => navigate("/explore")}>Explore Tasks</Button>
          </div>
        ) : (
          tasksToDisplay.map(task => (
            <Card key={task.id} className="hover:border-brand-200 transition-colors cursor-pointer rounded-3xl" onClick={() => activeTab === 'active' ? navigate('/tracking') : navigate(`/tasks/${task.id}`)}>
              <CardContent className="p-0 sm:p-2">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 p-4 sm:p-6 bg-white rounded-[1.25rem]">
                  
                  <div className="flex-1 space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{task.title}</h3>
                        <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm font-medium">
                          <ShieldCheck size={16} className="text-brand-500" />
                          {task.ngoName}
                        </div>
                      </div>
                      <Badge variant={task.status === "Completed" ? "completed" : task.status === "Active" ? "progress" : "pending"}>
                        {task.status}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-sm">
                      <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Due</p>
                        <p className="font-semibold text-gray-900 flex items-center gap-1.5 whitespace-nowrap"><Clock size={14} className="text-brand-500 shrink-0"/> {task.deadline}</p>
                      </div>
                      <div className={`col-span-2 md:col-span-3 rounded-xl p-3 border ${activeTab === 'active' ? 'bg-brand-50 border-brand-100/50' : 'bg-gray-50 border-gray-100'}`}>
                         <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                          <span>Progress</span>
                          <span className={activeTab === 'active' ? 'text-brand-600' : 'text-gray-900'}>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className={`h-2 ${activeTab === 'active' ? 'bg-white' : 'bg-gray-200'}`} indicatorClassName={activeTab === 'active' ? 'bg-brand-500' : 'bg-gray-400'} />
                      </div>
                    </div>
                  </div>

                  {activeTab === 'active' && (
                    <div className="shrink-0 flex items-center justify-center pt-2 sm:pt-0 sm:pl-4 sm:border-l border-gray-100">
                      <Button className="w-full sm:w-auto h-12 px-6 rounded-2xl group transition-all" onClick={(e) => { e.stopPropagation(); navigate('/tracking'); }}>
                        <PlayCircle size={20} className="mr-2 group-hover:scale-110 transition-transform" /> Track
                      </Button>
                    </div>
                  )}
                  {activeTab === 'completed' && (
                     <div className="shrink-0 flex items-center justify-center pr-4">
                       <CheckCircle2 size={40} className="text-green-500 opacity-20" />
                     </div>
                  )}

                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
