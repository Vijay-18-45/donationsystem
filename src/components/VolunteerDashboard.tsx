import React, { useState } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Package, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  LogOut, 
  LayoutDashboard, 
  Truck, 
  ArrowRight,
  Building,
  Navigation,
  User,
  ClipboardCheck
} from 'lucide-react';
import { AssignedTask, RequestedItem } from '../types';

interface VolunteerDashboardProps {
  onLogout: () => void;
  requests: RequestedItem[];
  setRequests: React.Dispatch<React.SetStateAction<RequestedItem[]>>;
  assignedTasks: AssignedTask[];
  setAssignedTasks: React.Dispatch<React.SetStateAction<AssignedTask[]>>;
}

const VolunteerDashboard: React.FC<VolunteerDashboardProps> = ({ 
  onLogout, 
  requests, 
  setRequests, 
  assignedTasks, 
  setAssignedTasks 
}) => {
  const handleAccept = (request: RequestedItem) => {
    const newTask: AssignedTask = {
      id: Date.now().toString(),
      name: request.name,
      pickup: 'Bhimavaram Distribution Hub',
      delivery: request.location,
      route: `Distribution Hub → Main Road → ${request.location}`,
      status: 'Pending Pickup'
    } as any; // Using any because status is not in AssignedTask interface but used in UI
    setAssignedTasks([newTask, ...assignedTasks]);
    setRequests(requests.filter(r => r.id !== request.id));
    toast.success(`Request Accepted: ${request.name}`);
  };

  const handleReject = (requestId: string) => {
    setRequests(requests.filter(r => r.id !== requestId));
    toast.error('Request Rejected');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Volunteer Dashboard</span>
          </div>
          <button onClick={onLogout} className="flex items-center text-slate-600 hover:text-red-600 transition-colors font-semibold">
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto space-y-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Request Management */}
          <section className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Request Management</h2>
            </div>

            <div className="space-y-6">
              {requests.length === 0 ? (
                <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                  <p className="text-slate-400 font-medium italic">No pending requests.</p>
                </div>
              ) : (
                requests.map((request) => (
                  <motion.div 
                    key={request.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-start">
                        <h3 className="text-2xl font-bold text-slate-900">{request.name}</h3>
                        <div className="flex items-center text-amber-600 bg-amber-50 px-3 py-1 rounded-full text-xs font-bold">
                          <Clock className="w-3 h-3 mr-1.5" />
                          {request.status}
                        </div>
                      </div>

                      <div className="flex items-center text-slate-600 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        {request.location}
                      </div>

                      <div className="flex gap-4">
                        <button 
                          onClick={() => handleAccept(request)}
                          className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                        >
                          Accept
                        </button>
                        <button 
                          onClick={() => handleReject(request.id)}
                          className="flex-1 bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>

          {/* Assigned Tasks */}
          <section className="space-y-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-2xl text-green-600">
                <Truck className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Assigned Tasks</h2>
            </div>

            <div className="space-y-6">
              {assignedTasks.length === 0 ? (
                <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                  <p className="text-slate-400 font-medium italic">No active tasks. Accept a request to get started.</p>
                </div>
              ) : (
                assignedTasks.map((task) => (
                  <motion.div 
                    key={task.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
                  >
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-slate-900">{task.name}</h3>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          task.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'
                        }`}>
                          {task.status}
                        </span>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pickup Location</p>
                          <div className="flex items-center text-slate-600">
                            <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                            {task.pickup}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivery Location</p>
                          <div className="flex items-center text-slate-600">
                            <Building className="w-4 h-4 mr-2 text-blue-500" />
                            {task.delivery}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                        <div className="flex justify-between items-center">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Route View (Prototype)</p>
                          <div className="flex items-center text-blue-600 text-[10px] font-bold">
                            <Clock className="w-3 h-3 mr-1" />
                            Est: 20 mins
                          </div>
                        </div>
                        
                        {/* Swiggy Style Map Embed */}
                        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-inner h-48 bg-slate-200 relative">
                          <iframe
                            title={`Route for ${task.name}`}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30588.42337750836!2d81.51152431083984!3d16.544893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37d2e069176311%3A0x67398b671444986e!2sBhimavaram%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1711890000000!5m2!1sen!2sin`}
                          ></iframe>
                          <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[8px] font-bold text-slate-600 border border-slate-200">
                            📍 {task.pickup.split(',')[0]} → 🎯 {task.delivery.split(',')[0]}
                          </div>
                        </div>

                        <div className="space-y-1 pt-2 border-t border-slate-200/50">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimized Path</p>
                          <p className="text-xs text-slate-600 font-medium leading-relaxed">
                            {task.route}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        {task.status === 'Pending Pickup' && (
                          <button 
                            onClick={() => setAssignedTasks(assignedTasks.map(t => t.id === task.id ? { ...t, status: 'Picked Up' } : t))}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                          >
                            Mark as Picked
                          </button>
                        )}
                        {task.status === 'Picked Up' && (
                          <button 
                            onClick={() => setAssignedTasks(assignedTasks.map(t => t.id === task.id ? { ...t, status: 'Delivered' } : t))}
                            className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                          >
                            Mark as Delivered
                          </button>
                        )}
                        {task.status === 'Delivered' && (
                          <div className="w-full py-3 bg-green-50 text-green-600 rounded-xl font-bold text-center border border-green-100 flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5 mr-2" />
                            Completed
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default VolunteerDashboard;
