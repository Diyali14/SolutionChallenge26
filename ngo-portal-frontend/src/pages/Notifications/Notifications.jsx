import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Check, CheckCircle2, Clock } from "lucide-react";
import { MOCK_NOTIFICATIONS } from "../../data/mockData";

export const Notifications = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Notifications</h2>
          <p className="text-sm font-medium text-gray-500 mt-1">Stay updated on portal activities and alerts.</p>
        </div>
        <Button variant="ghost" className="text-brand-600 font-bold gap-2 hover:bg-brand-50">
          <Check className="h-4 w-4" /> Mark all as read
        </Button>
      </div>

      <div className="space-y-4">
        {MOCK_NOTIFICATIONS.map(notification => (
          <Card 
            key={notification.id} 
            className={`p-5 transition-all outline outline-1 flex gap-4 ${
              notification.read 
                ? 'bg-white outline-transparent hover:outline-gray-200' 
                : 'bg-brand-50/50 outline-brand-200 shadow-md shadow-brand-500/5'
            }`}
          >
            <div className={`mt-1 h-3 w-3 shrink-0 rounded-full shadow-inner ${notification.read ? 'bg-gray-200' : 'bg-brand-500 animate-pulse'}`} />
            
            <div className="flex-1 space-y-1">
              <div className="flex justify-between items-start gap-4">
                <p className={`text-base font-semibold leading-snug ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                  {notification.content}
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 uppercase tracking-widest shrink-0">
                  <Clock className="h-3 w-3" /> {notification.time}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-500 capitalize tracking-wide">{notification.type}</p>
            </div>
            
            {!notification.read && (
              <div className="flex shrink-0 items-center justify-center pl-4 border-l border-brand-100">
                <Button variant="ghost" className="h-9 w-9 p-0 rounded-full hover:bg-brand-100 text-brand-600 focus:ring-brand-500" title="Mark as read">
                  <CheckCircle2 className="h-5 w-5" />
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};
