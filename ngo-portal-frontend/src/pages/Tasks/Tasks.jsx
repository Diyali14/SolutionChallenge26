import { useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { PlusCircle, Search, Filter } from "lucide-react";
import { MOCK_TASKS } from "../../data/mockData";

const tabs = ["All", "Active", "Assigned", "Completed", "Pending"];

export const Tasks = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const filteredTasks = MOCK_TASKS.filter(task => {
    const matchesTab = activeTab === "All" || task.status === activeTab;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Task Management</h2>
          <p className="text-sm text-gray-500 font-medium">View and manage ongoing operations.</p>
        </div>
        <Link to="/tasks/new">
          <Button className="font-bold gap-2">
            <PlusCircle className="h-5 w-5" /> Add Task
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
        <div className="flex space-x-1 bg-gray-200/50 p-1.5 rounded-2xl w-full md:w-auto overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab 
                ? "bg-white text-gray-900 shadow-sm" 
                : "text-gray-500 hover:text-gray-900 hover:bg-white/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white shadow-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 outline-none transition-all font-medium"
            />
          </div>
          <Button variant="outline" className="h-11 w-11 p-0 shrink-0">
            <Filter className="h-5 w-5 text-gray-600" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map(task => (
          <Link to={`/tasks/${task.id}`} key={task.id} className="block group">
            <Card className="h-full hover:border-brand-300 hover:shadow-md transition-all group-hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <Badge status={task.status}>{task.status}</Badge>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest block">Score</span>
                  <span className={`text-lg font-black ${task.priorityScore > 80 ? 'text-red-500' : 'text-brand-600'}`}>{task.priorityScore}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-black text-gray-900 mb-2 leading-tight group-hover:text-brand-600 transition-colors line-clamp-2">
                {task.title}
              </h3>
              
              <div className="flex items-center gap-2 mb-6 text-sm font-medium text-gray-500">
                <span className="inline-block h-2 w-2 rounded-full bg-gray-300"></span>
                {task.assignedVolunteer || "Unassigned"}
              </div>
              
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-gray-500 tracking-wide uppercase">Progress</span>
                  <span className="text-gray-900">{task.progress}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ${
                      task.progress === 100 ? 'bg-green-500' : 'bg-brand-500'
                    }`}
                    style={{ width: `${task.progress}%` }}
                  />
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {filteredTasks.length === 0 && (
          <div className="col-span-full py-20 text-center text-gray-500 font-medium">
            No tasks found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};
