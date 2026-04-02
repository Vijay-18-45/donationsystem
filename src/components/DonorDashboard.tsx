import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { 
  Heart, 
  Package, 
  History, 
  LogOut, 
  Plus, 
  CheckCircle2, 
  Clock, 
  MapPin,
  LayoutDashboard,
  ClipboardList,
  User,
  Hash,
  FileText,
  Camera,
  Trash2,
  Rocket
} from 'lucide-react';
import { RequestedItem, Donation } from '../types';

interface DonorDashboardProps {
  onLogout: () => void;
  requests: RequestedItem[];
  donations: Donation[];
  setDonations: React.Dispatch<React.SetStateAction<Donation[]>>;
}

const DonorDashboard: React.FC<DonorDashboardProps> = ({ onLogout, requests, donations, setDonations }) => {
  const [newItem, setNewItem] = useState({ 
    item: '', 
    location: 'Bhimavaram' 
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    const newDonation: Donation = {
      id: Date.now(),
      item: newItem.item,
      category: 'Others', // Default category
      donorName: 'Donor', // Default donor name
      address: 'Bhimavaram', // Default address
      location: newItem.location,
      image: imagePreview || undefined,
      status: 'Available',
      date: new Date().toISOString().split('T')[0]
    };
    setDonations([newDonation, ...donations]);
    setNewItem({ 
      item: '', 
      location: 'Bhimavaram' 
    });
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    toast.success('Donation Placed Successfully ✅', {
      description: 'Thank you for your contribution.',
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dashboard Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">Donation Dashboard</span>
          </div>
          
          <button 
            onClick={onLogout}
            className="flex items-center text-slate-600 hover:text-red-600 transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </nav>

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* Donation Form */}
          <section className="lg:col-span-1 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-2xl text-blue-600">
                <Heart className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">New Donation</h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm"
            >
              <form onSubmit={handleDonate} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center">
                    <Package className="w-4 h-4 mr-2 text-blue-500" />
                    Item Name
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newItem.item}
                    onChange={(e) => setNewItem({...newItem, item: e.target.value})}
                    placeholder="e.g. School Bags, Rice Bags"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500" />
                    Location
                  </label>
                  <input 
                    type="text" 
                    required
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    placeholder="e.g. Bhimavaram"
                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50/50"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1 flex items-center">
                    <Camera className="w-4 h-4 mr-2 text-blue-500" />
                    Upload Image
                  </label>
                  <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer relative group" onClick={() => fileInputRef.current?.click()}>
                    {imagePreview ? (
                      <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={(e) => { e.stopPropagation(); setImagePreview(null); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div className="py-4 text-center">
                        <Camera className="w-8 h-8 mx-auto text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                        <p className="text-xs text-slate-500 font-medium tracking-tight">Click to upload image</p>
                      </div>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 flex items-center justify-center group"
                >
                  <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                  Submit Donation
                </button>
              </form>
            </motion.div>
          </section>

          {/* Donation History */}
          <section className="lg:col-span-2 space-y-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-slate-100 rounded-2xl text-slate-600">
                <History className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Available Donations</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {donations.map((donation) => (
                <motion.div 
                  key={donation.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group overflow-hidden"
                >
                  {donation.image && (
                    <div className="h-48 w-full overflow-hidden">
                      <img src={donation.image} alt={donation.item} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-blue-50 p-3 rounded-2xl text-blue-600">
                        <Package className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        donation.status === 'Delivered' 
                          ? 'bg-green-100 text-green-600' 
                          : donation.status === 'Picked Up'
                          ? 'bg-blue-100 text-blue-600'
                          : donation.status === 'Available'
                          ? 'bg-blue-600 text-white'
                          : 'bg-amber-100 text-amber-600'
                      }`}>
                        {donation.status}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-bold text-slate-900">{donation.item}</h3>
                        <span className="bg-slate-100 px-2 py-0.5 rounded text-[10px] font-bold text-slate-600 uppercase tracking-tight">{donation.category}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">Donor</p>
                          <p className="text-slate-700 font-semibold flex items-center">
                            <User className="w-3 h-3 mr-1 text-blue-500" />
                            {donation.donorName}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">Location</p>
                          <p className="text-slate-700 font-semibold flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-blue-500" />
                            {donation.location}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <p className="font-bold text-slate-400 uppercase tracking-widest text-[9px]">Address</p>
                        <p className="text-slate-600 text-[11px] leading-relaxed italic">
                          {donation.address}
                        </p>
                      </div>

                      <div className="flex items-center text-slate-400 text-[10px] pt-4 border-t border-slate-50">
                        <Clock className="w-3 h-3 mr-1" />
                        Posted on {donation.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Requests Received for Donor */}
          <section className="lg:col-span-3 space-y-8 mt-12">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-amber-100 rounded-2xl text-amber-600">
                <ClipboardList className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Requests Received</h2>
            </div>

            {requests.length === 0 ? (
              <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-[2rem] p-12 text-center">
                <p className="text-slate-400 font-medium italic">No requests received for your items yet.</p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-3 gap-6">
                {requests.map((request) => (
                  <motion.div 
                    key={request.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-amber-50 p-3 rounded-2xl text-amber-600">
                        <Package className="w-6 h-6" />
                      </div>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-600' : 
                        request.status === 'Rejected' ? 'bg-red-100 text-red-600' : 
                        'bg-amber-100 text-amber-600'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-900">{request.name}</h3>
                      <div className="flex items-center text-slate-500 text-sm">
                        <MapPin className="w-3 h-3 mr-1.5 text-blue-500" />
                        Bhimavaram
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-50">
                      <p className="text-xs text-slate-500 italic">
                        {request.status === 'Pending' ? 'Waiting for your approval on the main page.' : `This request has been ${request.status.toLowerCase()}.`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-6 mt-auto">
        <div className="max-w-7xl mx-auto text-center space-y-4">
          <p className="text-blue-400 font-bold tracking-wide uppercase">Give More, Waste Less</p>
          <p className="text-slate-500 text-sm">© 2026 Donation System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DonorDashboard;
