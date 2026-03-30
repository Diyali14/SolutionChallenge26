import { Link } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Activity, Users, CheckCircle, Target, AlertCircle, PlusCircle, ArrowRight } from "lucide-react";
import { MOCK_TASKS, MOCK_NOTIFICATIONS } from "../../data/mockData";

export const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header & Quick Action */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Overview</h2>
          <p className="text-sm text-gray-500 font-medium">Here's what is happening with your operations today.</p>
        </div>
        <Link to="/tasks/new">
          <Button className="font-bold gap-2">
            <PlusCircle className="h-5 w-5" />
            Add Task
          </Button>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Active Tasks" value="12" icon={Target} change="+2 from yesterday" changeType="positive" iconColor="text-brand-500" bgColor="bg-brand-50" />
        <KPICard title="Completed Tasks" value="84" icon={CheckCircle} change="+12 this week" changeType="positive" iconColor="text-green-500" bgColor="bg-green-50" />
        <KPICard title="Volunteers Engaged" value="38" icon={Users} change="Active now" changeType="neutral" iconColor="text-blue-500" bgColor="bg-blue-50" />
        <KPICard title="People Impacted" value="1,240" icon={Activity} change="+340 this month" changeType="positive" iconColor="text-purple-500" bgColor="bg-purple-50" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Recent Activity Feed */}
        <Card className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Activity Feed</h3>
            <Button variant="ghost" size="sm" className="text-brand-600 font-semibold gap-1 pr-1">
              View all <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-6">
            {MOCK_TASKS.slice(0, 4).map((task) => (
              <div key={task.id} className="flex gap-4 group">
                <div className="relative mt-1">
                  <div className="absolute top-8 left-1/2 -ml-px h-full w-0.5 bg-gray-100 group-last:hidden" aria-hidden="true" />
                  <div className={`h-10 w-10 flex items-center justify-center rounded-full ring-4 ring-white ${task.status === "Completed" ? 'bg-green-100 text-green-600' : 'bg-brand-100 text-brand-600'}`}>
                    {task.status === "Completed" ? <CheckCircle className="h-5 w-5" /> : <Activity className="h-5 w-5" />}
                  </div>
                </div>
                <div className="flex-1 pb-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {task.title}
                    </p>
                    <span className="text-xs font-medium text-gray-500">2h ago</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {task.status === 'Completed' ? 'Task was fully completed' : 'Status updated to'} <Badge status={task.status} className="ml-1 px-1.5">{task.status}</Badge>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Alert Panel */}
        <div className="flex flex-col gap-6">
          <Card className="border-red-100 bg-gradient-to-br from-red-50 to-white shadow-sm ring-1 ring-red-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="rounded-full bg-red-100 p-2 text-red-600">
                <AlertCircle className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-extrabold text-red-900">Action Required</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm font-medium text-red-800">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                2 tasks urgently need volunteers by today.
              </li>
              <li className="flex items-start gap-2 text-sm font-medium text-red-800">
                <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-500" />
                1 task delayed: Senior Care Visit
              </li>
            </ul>
            <Button variant="danger" className="w-full mt-6 gap-2">
              <Activity className="h-4 w-4" /> Resolve Issues
            </Button>
          </Card>

          <Card>
            <h3 className="text-lg font-bold text-gray-900 mb-4">System Alerts</h3>
            <div className="space-y-4">
              {MOCK_NOTIFICATIONS.slice(0,3).map(n => (
                <div key={n.id} className="flex gap-3 text-sm border-b border-gray-50 pb-4 last:border-0 last:pb-0">
                  <div className={`h-2 w-2 mt-1.5 rounded-full ${n.read ? 'bg-gray-300' : 'bg-brand-500'}`} />
                  <div>
                    <p className={`font-medium ${n.read ? 'text-gray-600' : 'text-gray-900'}`}>{n.content}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const KPICard = ({ title, value, icon: Icon, change, changeType, iconColor, bgColor }) => {
  return (
    <Card className="group hover:border-brand-200 transition-colors">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className={`p-3 rounded-2xl ${bgColor} ${iconColor} transition-transform group-hover:scale-110`}>
            <Icon className="h-6 w-6 stroke-[2.5]" />
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
            changeType === 'positive' ? 'bg-green-100 text-green-700' : 
            changeType === 'negative' ? 'bg-red-100 text-red-700' : 
            'bg-gray-100 text-gray-700'
          }`}>
            {change}
          </span>
        </div>
        <div>
          <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{title}</h4>
          <p className="mt-1 text-3xl font-black text-gray-900 tracking-tight">{value}</p>
        </div>
      </div>
    </Card>
  );
};
