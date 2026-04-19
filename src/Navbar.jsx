import { useDispatch, useSelector } from 'react-redux';
import { LogOut, UserCircle, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';
import { logout } from './authSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const { user, role } = useSelector((state) => state.auth);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="sticky top-0 z-50 w-full border-b border-white/40 bg-white/60 backdrop-blur-xl shadow-sm"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 text-indigo-600">
          <div className="rounded-lg bg-indigo-600 p-2 text-white shadow-lg shadow-indigo-600/20">
            <Monitor className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">IT Desk</span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
            <UserCircle className="h-5 w-5" />
            <span className="hidden sm:inline">{user?.name || 'User'} </span>
            <span className="opacity-75">({role})</span>
          </div>
          <button
            onClick={() => dispatch(logout())}
            className="group flex items-center gap-2 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 active:scale-95"
          >
            <LogOut className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </motion.nav>
  );
}