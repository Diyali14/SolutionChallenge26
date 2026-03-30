import { useParams, useNavigate } from "react-router-dom";
import { MOCK_TASKS } from "../../data/mockData";
import { Card, CardContent } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";
import { ArrowLeft, MapPin, Calendar, Users, Target, CheckCircle, ShieldCheck } from "lucide-react";

export const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = MOCK_TASKS.find(t => t.id === id) || MOCK_TASKS[0];

  return (
    <div className="space-y-8 animate-in fade-in pb-12 max-w-4xl mx-auto">
      
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors">
        <ArrowLeft size={16} /> Back to Tasks
      </button>

      <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Badge variant={task.urgency === "urgent" ? "urgent" : "secondary"}>
              {task.urgency === "urgent" ? "Urgent Needs" : "Normal Priority"}
            </Badge>
            <span className="text-sm font-semibold text-brand-600 px-3 py-1 bg-brand-50 rounded-full border border-brand-100">
              Score: {task.priorityScore}/100
            </span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">{task.title}</h1>
          <div className="text-gray-500 font-medium flex items-center gap-2">
            Organized by <span className="text-gray-900 font-bold">{task.ngoName}</span> <ShieldCheck size={16} className="text-blue-500" />
          </div>
        </div>

        {!task.isAccepted && (
          <Button size="lg" className="w-full md:w-auto px-10 text-base shadow-lg shadow-brand-500/20 mt-4 md:mt-0">
            Accept Task
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="md:col-span-2 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {task.description}
            </p>
          </section>

          <Card className="bg-gradient-to-br from-brand-50 to-white border-brand-100 ring-1 ring-brand-500/10">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-brand-600" size={24} />
                <h3 className="text-lg font-bold text-gray-900">Why this task suits you</h3>
              </div>
              <p className="text-gray-700 font-medium leading-relaxed">
                {task.matchReason}
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm font-bold text-brand-700 bg-white inline-flex px-3 py-1.5 rounded-lg border border-brand-100 shadow-sm">
                <CheckCircle size={16} className="text-green-500"/>
                {task.matchScore}% Match
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Location</h4>
                <div className="flex items-start gap-3 text-gray-900 font-medium">
                  <MapPin className="text-brand-500 mt-0.5 shrink-0" size={18} />
                  <span>{task.location} <span className="block text-sm text-gray-500 font-normal mt-0.5">{task.distance} away</span></span>
                </div>
              </div>
              
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Schedule</h4>
                <div className="flex items-center gap-3 text-gray-900 font-medium">
                  <Calendar className="text-brand-500 shrink-0" size={18} />
                  <span>Complete by <span className="block text-sm text-gray-500 font-normal mt-0.5">{task.deadline}</span></span>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Impact</h4>
                <div className="flex items-center gap-3 text-gray-900 font-medium">
                  <Users className="text-brand-500 shrink-0" size={18} />
                  <span>Helps ~{task.peopleHelpedTarget} people</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Required Skills</h4>
              <div className="flex flex-wrap gap-2">
                {task.skills.map((skill, i) => (
                  <Badge variant="outline" key={i} className="bg-gray-50 text-gray-700 font-semibold px-3 py-1 text-sm border-gray-200">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

      </div>

    </div>
  );
};
