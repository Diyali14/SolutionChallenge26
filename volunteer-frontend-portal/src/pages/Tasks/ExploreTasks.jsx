import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MOCK_TASKS } from "../../data/mockData";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import { Search, MapPin, Target, CheckCircle2 } from "lucide-react";

export const ExploreTasks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = MOCK_TASKS.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in pb-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Explore Tasks</h1>
          <p className="text-gray-500 mt-1">Find opportunities where your skills are most needed.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white">Filters</Button>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <Input 
              placeholder="Search by title or location..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {filteredTasks.map(task => (
          <Card key={task.id} className="hover:border-brand-200 hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col" onClick={() => navigate(`/tasks/${task.id}`)}>
            <CardContent className="p-6 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <Badge variant={task.urgency === "urgent" ? "urgent" : "secondary"}>
                  {task.urgency === "urgent" ? "Urgent Needs" : "Normal Priority"}
                </Badge>
                <div className="text-right">
                  <span className="text-2xl font-bold text-brand-600 block">{task.priorityScore}</span>
                  <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase">Priority</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{task.title}</h3>
              
              <div className="space-y-2 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-brand-500" />
                  <span>{task.location} <span className="text-gray-400 ml-1">({task.distance})</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Target size={16} className="text-brand-500" />
                  <span className="truncate">Needs: {task.skills.join(", ")}</span>
                </div>
              </div>

              <div className="mt-auto pt-6 flex gap-3 border-t border-gray-50">
                {task.isAccepted ? (
                  <Button variant="secondary" className="w-full text-brand-700 font-semibold opacity-80 cursor-default" onClick={(e) => e.stopPropagation()}>
                    <CheckCircle2 size={16} className="mr-2" /> Assigned
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-1/2 bg-white" onClick={(e) => { e.stopPropagation(); navigate(`/tasks/${task.id}`); }}>View Details</Button>
                    <Button className="w-1/2 shadow-sm shadow-brand-500/20" onClick={(e) => { e.stopPropagation(); navigate(`/tasks/${task.id}`); }}>Accept Task</Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
