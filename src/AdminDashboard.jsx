import { useState } from 'react';
import toast from 'react-hot-toast';
import { CheckCircle, Clock, AlertCircle, Check, Ticket, User, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

const dummyTickets = [
  {
    id: 'TKT-001',
    title: 'Cannot connect to company VPN',
    category: 'Network',
    requester: 'John Doe',
    date: '2023-10-25',
    status: 'Raised',
  },
  {
    id: 'TKT-002',
    title: 'Laptop screen freezing randomly',
    category: 'Hardware',
    requester: 'Jane Smith',
    date: '2023-10-26',
    status: 'Processing',
  },
  {
    id: 'TKT-003',
    title: 'Need access to AWS staging environment',
    category: 'Access',
    requester: 'Alice Johnson',
    date: '2023-10-27',
    status: 'Resolved',
  },
];

export default function AdminDashboard() {
  const [tickets, setTickets] = useState(dummyTickets);

  const handleResolve = (id) => {
    setTickets((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: 'Resolved' } : ticket
      )
    );
    toast.success(`Ticket ${id} marked as resolved!`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <CheckCircle size={14} />
            Resolved
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20">
            <Clock size={14} />
            Processing
          </span>
        );
      case 'Raised':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 ring-1 ring-inset ring-rose-600/20">
            <AlertCircle size={14} />
            Raised
          </span>
        );
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-100 via-gray-50 to-white">
      <Navbar />
      
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-10"
        >
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">Agent Dashboard</h1>
          <p className="mt-2 text-lg text-gray-500">Manage and resolve incoming employee IT support tickets.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {tickets.map((ticket) => (
              <motion.div 
                key={ticket.id}
                variants={cardVariants}
                layout
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-white p-6 shadow-xl shadow-gray-200/40 ring-1 ring-gray-900/5 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-500/10 hover:ring-indigo-500/20"
              >
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-bold tracking-wide text-gray-700">
                      <Ticket size={14} />
                      {ticket.id}
                    </span>
                    {getStatusBadge(ticket.status)}
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-gray-900 leading-tight">{ticket.title}</h3>
                  <div className="mb-6 space-y-2 text-sm font-medium text-gray-500">
                    <div className="flex items-center gap-2"><User size={16} /> {ticket.requester}</div>
                    <div className="flex items-center gap-2"><Calendar size={16} /> {ticket.date}</div>
                    <div className="inline-flex items-center mt-1 rounded-md bg-indigo-50 px-2 py-0.5 text-xs font-bold text-indigo-600 uppercase tracking-wider">{ticket.category}</div>
                  </div>
                </div>

                <button
                  onClick={() => handleResolve(ticket.id)}
                  disabled={ticket.status === 'Resolved'}
                  className={`mt-4 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all active:scale-95 ${
                    ticket.status === 'Resolved'
                      ? 'cursor-not-allowed bg-gray-50 text-gray-400 ring-1 ring-inset ring-gray-200'
                      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-xl'
                  }`}
                >
                  <Check size={18} strokeWidth={3} />
                  {ticket.status === 'Resolved' ? 'Resolved' : 'Mark as Resolved'}
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}