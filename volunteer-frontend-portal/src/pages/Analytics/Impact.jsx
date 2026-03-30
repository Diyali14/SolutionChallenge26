import { MOCK_IMPACT } from "../../data/mockData";
import { Card, CardContent } from "../../components/ui/Card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from "recharts";
import { Activity, Clock, Navigation, Zap } from "lucide-react";

export const Impact = () => {
  return (
    <div className="space-y-8 animate-in fade-in pb-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Impact</h1>
        <p className="text-gray-500 mt-1">See how your contributions make a difference.</p>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card className="bg-brand-50 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-brand-900">Tasks Completed</h3>
              <div className="p-3 bg-brand-200 text-brand-700 rounded-full"><Activity size={20} /></div>
            </div>
            <p className="text-4xl font-extrabold text-brand-600 mb-1">{MOCK_IMPACT.tasksCompleted}</p>
            <p className="text-xs font-medium text-brand-800 tracking-wider uppercase">+2 this month</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-green-900">People Helped</h3>
              <div className="p-3 bg-green-200 text-green-700 rounded-full"><Navigation size={20} /></div>
            </div>
            <p className="text-4xl font-extrabold text-green-600 mb-1">{MOCK_IMPACT.peopleHelped}</p>
            <p className="text-xs font-medium text-green-800 tracking-wider uppercase">+50 this month</p>
          </CardContent>
        </Card>

        <Card className="bg-yellow-50 border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-yellow-900">Hours Given</h3>
              <div className="p-3 bg-yellow-200 text-yellow-700 rounded-full"><Clock size={20} /></div>
            </div>
            <p className="text-4xl font-extrabold text-yellow-600 mb-1">{MOCK_IMPACT.hoursContributed}</p>
            <p className="text-xs font-medium text-yellow-800 tracking-wider uppercase">+12 this month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-lg font-bold text-gray-900">Impact Over Time (People)</h3>
          </div>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={MOCK_IMPACT.monthlyImpact}>
                  <defs>
                    <linearGradient id="colorPeople" xl="0" yl="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dx={-10} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Line type="monotone" dataKey="people" stroke="#10b981" strokeWidth={4} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Skills Utilized</h3>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 bg-brand-50 px-3 py-1.5 rounded-full"><Zap size={14}/> Top Match: Logistics</span>
          </div>
          <CardContent className="p-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_IMPACT.skillsUtilized} layout="vertical" margin={{ left: 20 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#4b5563', fontSize: 14, fontWeight: 500}} width={100} />
                  <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};
