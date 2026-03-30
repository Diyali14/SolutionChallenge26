import { useState } from "react";
import { MOCK_NOTIFICATIONS } from "../../data/mockData";
import { Card, CardContent } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Navigation, MessageCircle, Clock, CheckCircle } from "lucide-react";

export const Notifications = () => {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type) => {
    switch (type) {
      case 'assigned': return <Navigation className="text-blue-500" size={20} />;
      case 'message': return <MessageCircle className="text-brand-500" size={20} />;
      case 'reminder': return <Clock className="text-red-500" size={20} />;
      case 'completed': return <CheckCircle className="text-green-500" size={20} />;
      default: return <MessageCircle className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-3xl mx-auto pb-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Stay updated with tasks and messages.</p>
        </div>
        <Button variant="ghost" onClick={markAllRead} className="text-brand-600 font-semibold bg-brand-50 hover:bg-brand-100">
          Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {notifs.map(notif => (
          <Card key={notif.id} className={`transition-colors border-2 ${notif.read ? 'border-transparent' : 'border-brand-100 bg-brand-50/20'}`}>
            <CardContent className="p-5">
              <div className="flex gap-4 items-start">
                <div className={`p-3 rounded-2xl shrink-0 ${notif.read ? 'bg-gray-100' : 'bg-white shadow-sm shadow-brand-500/10 ring-1 ring-brand-100'}`}>
                  {getIcon(notif.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className={`text-base font-bold truncate pr-4 ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</h4>
                    <span className="text-xs font-semibold text-gray-400 whitespace-nowrap pt-1 shrink-0">{notif.time}</span>
                  </div>
                  <p className={`text-sm ${notif.read ? 'text-gray-500' : 'text-gray-800'}`}>{notif.content}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
