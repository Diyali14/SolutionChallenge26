import { useAuth } from "../../context/AuthContext";
import { MOCK_IMPACT, MOCK_TASKS, MOCK_NOTIFICATIONS } from "../../data/mockData";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { Progress } from "../../components/ui/Progress";
import { CheckCircle2, Navigation, Clock, Activity, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Fake some dashboard state from the mock data
  const targetTasksAssigned = 4;
  const activeTask = MOCK_TASKS.find(t => t.status === "Active");
  const urgentTasks = MOCK_TASKS.filter(t => t.urgency === "urgent" || t.priorityScore > 75).slice(0,3);

  return (
    <div className="space-y-8 animate-in fade-in pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Welcome back, {user?.name.split(" ")[0]}!</h1>
        <p className="text-gray-500 mt-1">Here is what's happening today in your area.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Tasks Assigned", value: targetTasksAssigned, icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-100" },
          { title: "Tasks Completed", value: MOCK_IMPACT.tasksCompleted, icon: Activity, color: "text-green-500", bg: "bg-green-100" },
          { title: "People Helped", value: MOCK_IMPACT.peopleHelped, icon: Navigation, color: "text-brand-500", bg: "bg-brand-100" },
          { title: "Total Hours", value: MOCK_IMPACT.hoursContributed, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-100" },
        ].map((kpi, i) => (
          <Card key={i} className="border-none shadow-sm shadow-gray-200/50 hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
              <div className={`p-4 rounded-2xl ${kpi.bg}`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{kpi.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-0.5">{kpi.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 grid-cols-1 xl:grid-cols-3">
        
        {/* Main Column */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Active Task Section */}
          {activeTask && (
            <Card className="border-brand-100 ring-1 ring-brand-500/20 bg-gradient-to-br from-white to-brand-50/50">
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                    <span className="text-sm font-semibold tracking-wide text-brand-600 uppercase">Ongoing Task</span>
                  </div>
                  <Badge variant="progress">In Progress</Badge>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{activeTask.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-8">
                  <span className="flex items-center gap-1.5"><MapPin size={16} className="text-gray-400"/> {activeTask.location}</span>
                  <span className="flex items-center gap-1.5 font-medium"><Clock size={16} className="text-gray-400"/> Due Today</span>
                </div>

                <div className="space-y-2.5 mb-8">
                  <div className="flex justify-between text-sm font-medium text-gray-700">
                    <span>Task Progress</span>
                    <span>{activeTask.progress}%</span>
                  </div>
                  <Progress value={activeTask.progress} className="h-2.5 bg-brand-100" />
                </div>

                <div className="flex gap-4">
                  <Button size="lg" className="w-full sm:w-auto px-8" onClick={() => navigate("/tracking")}>
                    Continue Task
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 bg-white" onClick={() => navigate(`/tasks/${activeTask.id}`)}>
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* Activity Feed */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
              <Button variant="ghost" size="sm" className="text-brand-600">View All</Button>
            </div>
            <Card>
              <div className="divide-y divide-gray-50">
                {MOCK_NOTIFICATIONS.map((notif) => (
                  <div key={notif.id} className="p-5 flex gap-4 items-start hover:bg-gray-50/50 transition-colors">
                    <div className="mt-0.5 rounded-full p-2 bg-gray-100/80 text-gray-500">
                      {notif.type === 'assigned' ? <Navigation size={16} /> : <CheckCircle2 size={16} />}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-gray-900">{notif.title}</p>
                      <p className="text-sm text-gray-500 mt-1">{notif.content}</p>
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{notif.time}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-8">
          
          {/* Nearby Urgent Tasks */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Urgent & Nearby</h3>
              <Button variant="ghost" size="sm" className="text-brand-600" onClick={() => navigate('/explore')}>Explore</Button>
            </div>
            <div className="space-y-4">
              {urgentTasks.map(task => (
                <Card key={task.id} className="hover:border-brand-200 transition-colors cursor-pointer" onClick={() => navigate(`/tasks/${task.id}`)}>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900 line-clamp-1 pr-2">{task.title}</h4>
                      {task.urgency === 'urgent' && <Badge variant="urgent" className="shrink-0">Urgent</Badge>}
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium text-gray-500 mb-4">
                      <span className="flex items-center gap-1 text-brand-600 bg-brand-50 px-2 py-1 rounded-md">
                        <MapPin size={12} /> {task.distance}
                      </span>
                      <span>Priority: {task.priorityScore}/100</span>
                    </div>
                    <Button variant="secondary" size="sm" className="w-full">Review Task</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
        </div>

      </div>
    </div>
  );
};
