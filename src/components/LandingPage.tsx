import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { 
  Heart, 
  Users, 
  MapPin, 
  Package, 
  ArrowRight, 
  CheckCircle2, 
  Truck, 
  ShieldCheck, 
  Search, 
  Clock,
  Building,
  Menu,
  X,
  ClipboardList,
  CheckCircle,
  XCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { RequestedItem, Donation } from '../types';

interface LandingPageProps {
  onVolunteerLogin: () => void;
  onRegister: () => void;
  onStartDonating: () => void;
  requests: RequestedItem[];
  setRequests: React.Dispatch<React.SetStateAction<RequestedItem[]>>;
  donations: Donation[];
}

const LandingPage: React.FC<LandingPageProps> = ({ 
  onVolunteerLogin, 
  onRegister, 
  onStartDonating,
  requests,
  setRequests,
  donations
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    donorName: '',
    itemName: '',
    category: 'Food',
    location: 'Bhimavaram'
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Donation Request Submitted!', {
      description: 'Thank you for your contribution. Our team will verify and contact you soon.',
    });
    setFormData({ donorName: '', itemName: '', category: 'Food', location: 'Bhimavaram' });
  };

  const handleRequestItem = (item: Donation) => {
    const newRequest: RequestedItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: item.item,
      donor: item.donorName,
      location: item.location,
      status: 'Pending'
    };
    
    setRequests(prev => [newRequest, ...prev]);
    
    toast.info(`Request Sent for ${item.item}`, {
      description: 'Your request has been received. Approval is in progress.',
    });
  };

  const availableItems = donations.filter(d => d.status === 'Available');

  return (
    <div className="min-h-screen bg-white selection:bg-blue-100">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-blue-600 p-2 rounded-lg">
              <Heart className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Helping Hands</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
            <button onClick={() => scrollToSection('home')} className="hover:text-blue-600 transition-colors flex items-center">
              <Heart className="w-4 h-4 mr-1.5" /> Home
            </button>
            <button onClick={onStartDonating} className="hover:text-blue-600 transition-colors flex items-center">
              <Package className="w-4 h-4 mr-1.5" /> Donate
            </button>
            <button onClick={onVolunteerLogin} className="hover:text-blue-600 transition-colors flex items-center">
              <Users className="w-4 h-4 mr-1.5" /> Volunteer Login
            </button>
            <button onClick={onRegister} className="hover:text-blue-600 transition-colors flex items-center">
              <ShieldCheck className="w-4 h-4 mr-1.5" /> Register
            </button>
          </div>

          <button className="md:hidden text-slate-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-b border-gray-100 px-6 py-6 space-y-4"
          >
            <button onClick={() => { scrollToSection('home'); setIsMenuOpen(false); }} className="block w-full text-left text-slate-600 font-medium">Home</button>
            <button onClick={onStartDonating} className="block w-full text-left text-slate-600 font-medium">Donate</button>
            <button onClick={onVolunteerLogin} className="block w-full text-left text-slate-600 font-medium">Volunteer Login</button>
            <button onClick={onRegister} className="block w-full text-left text-slate-600 font-medium">Register</button>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-40 pb-24 px-6 hero-gradient">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-tight tracking-tight mb-6">
              Helping Hands Donation System
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-10">
              Connecting donors, volunteers, and people in need
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onStartDonating}
                className="bg-blue-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 inline-flex items-center group"
              >
                Start Donating 🚀
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: 'Easy Donation', icon: Heart },
              { title: 'Request System', icon: ClipboardList },
              { title: 'Volunteer Delivery', icon: Truck },
              { title: 'Fast Distribution', icon: ShieldCheck }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center space-y-4">
                <div className="bg-blue-50 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-blue-600">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900">{feature.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Donations */}
      <section id="items" className="py-24 bg-white px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Available Donations</h2>
            <p className="text-slate-600">Items currently available for those in need in Bhimavaram.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {availableItems.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-slate-50/50 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all group overflow-hidden"
              >
                {item.image && (
                  <div className="h-48 w-full overflow-hidden">
                    <img src={item.image} alt={item.item} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                )}
                <div className="p-8">
                  <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-blue-600">
                    <Package className="w-7 h-7" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-2xl font-bold text-slate-900">{item.item}</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-slate-500 text-sm">
                        <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                        {item.location}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleRequestItem(item)}
                      className="w-full py-3.5 rounded-xl border-2 border-blue-600 text-blue-600 font-bold hover:bg-blue-600 hover:text-white transition-all mt-4"
                    >
                      Request Item
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requested Items Section */}
      <section id="requests" className="py-24 bg-slate-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Requested Items</h2>
            <p className="text-slate-600">Track the status of items requested by the community.</p>
          </div>
          
          {requests.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-[2rem] border border-dashed border-slate-300">
              <ClipboardList className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-400 font-medium">No requests received yet. Click "Request Item" above to see them here.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {requests.map((request) => (
                  <motion.div 
                    key={request.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: -20 }}
                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4">
                      <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                        Pending
                      </span>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Request Received</p>
                        <h3 className="text-2xl font-bold text-slate-900">{request.name}</h3>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center text-slate-500 text-sm">
                          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                          {request.location}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                          <Clock className="w-4 h-4 mr-2 text-blue-500" />
                          Status: <span className="text-amber-600 font-bold ml-1">Pending</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
      <footer className="bg-slate-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Heart className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight">Helping Hands Donation System</span>
            </div>
            <p className="text-blue-400 font-bold text-lg tracking-wide uppercase">Connecting donors, volunteers, and people in need</p>
          </div>
          <div className="w-full h-px bg-white/10" />
          <p className="text-slate-500 text-sm">© 2026 Helping Hands Donation System</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
