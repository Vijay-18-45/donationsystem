/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Toaster } from 'sonner';
import LandingPage from './components/LandingPage';
import Register from './components/Register';
import Login from './components/Login';
import VolunteerDashboard from './components/VolunteerDashboard';
import DonorDashboard from './components/DonorDashboard';
import { RequestedItem, AssignedTask, Donation } from './types';

type View = 'Home' | 'Register' | 'Login' | 'VolunteerDashboard' | 'DonorDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('Home');
  const [requests, setRequests] = useState<RequestedItem[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<AssignedTask[]>([]);
  const [donations, setDonations] = useState<Donation[]>([
    { 
      id: 0, 
      item: 'School Bags', 
      category: 'Bags', 
      donorName: 'Ravi Kumar', 
      address: 'Main Road, Bhimavaram, Andhra Pradesh', 
      location: 'Bhimavaram', 
      status: 'Available', 
      date: '2026-03-31' 
    },
    { 
      id: 1, 
      item: 'Rice Bags', 
      category: 'Food', 
      donorName: 'Suresh Babu', 
      address: 'Market Area, Bhimavaram, Andhra Pradesh', 
      location: 'Bhimavaram', 
      status: 'Available', 
      date: '2026-03-31' 
    },
    { 
      id: 2, 
      item: 'Books', 
      category: 'Books', 
      donorName: 'Lakshmi Devi', 
      address: 'College Road, Bhimavaram, Andhra Pradesh', 
      location: 'Bhimavaram', 
      status: 'Available', 
      date: '2026-03-31' 
    }
  ]);

  const handleLoginSuccess = (role: 'Volunteer' | 'Donor') => {
    if (role === 'Volunteer') {
      setCurrentView('VolunteerDashboard');
    } else {
      setCurrentView('DonorDashboard');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" richColors />
      
      {currentView === 'Home' && (
        <LandingPage 
          onVolunteerLogin={() => setCurrentView('Login')} 
          onRegister={() => setCurrentView('Register')}
          onStartDonating={() => setCurrentView('Login')}
          requests={requests}
          setRequests={setRequests}
          donations={donations}
        />
      )}

      {currentView === 'Register' && (
        <Register 
          onRegisterSuccess={() => setCurrentView('Login')} 
          onBack={() => setCurrentView('Home')} 
        />
      )}

      {currentView === 'Login' && (
        <Login 
          onLoginSuccess={handleLoginSuccess} 
          onBack={() => setCurrentView('Home')} 
        />
      )}

      {currentView === 'VolunteerDashboard' && (
        <VolunteerDashboard 
          onLogout={() => setCurrentView('Home')} 
          requests={requests}
          setRequests={setRequests}
          assignedTasks={assignedTasks}
          setAssignedTasks={setAssignedTasks}
        />
      )}

      {currentView === 'DonorDashboard' && (
        <DonorDashboard 
          onLogout={() => setCurrentView('Home')} 
          requests={requests}
          donations={donations}
          setDonations={setDonations}
        />
      )}
    </div>
  );
}
