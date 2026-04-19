import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { User, Headset } from 'lucide-react';
import toast from 'react-hot-toast';
import { login } from './authSlice';

export default function Login() {
  const dispatch = useDispatch();

  const handleLogin = (role) => {
    // Dispatching a mock user payload to Redux
    dispatch(
      login({
        user: { name: `${role} User`, email: `${role.toLowerCase()}@example.com` },
        role: role,
      })
    );
    
    toast.success(`Successfully logged in as ${role}`);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">IT Desk</h1>
          <p className="mt-2 text-gray-500">Select your portal to continue</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {/* Employee Login Card */}
          <button
            onClick={() => handleLogin('Employee')}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-100 bg-gray-50 p-6 transition-all hover:border-blue-500 hover:bg-blue-50 hover:shadow-md"
          >
            <div className="mb-4 rounded-full bg-blue-100 p-3 text-blue-600 transition-transform group-hover:scale-110">
              <User size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Employee</h3>
            <p className="mt-1 text-center text-xs text-gray-500">Submit & track tickets</p>
          </button>

          {/* Agent (Admin) Login Card */}
          <button
            onClick={() => handleLogin('Admin')}
            className="group flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-gray-100 bg-gray-50 p-6 transition-all hover:border-purple-500 hover:bg-purple-50 hover:shadow-md"
          >
            <div className="mb-4 rounded-full bg-purple-100 p-3 text-purple-600 transition-transform group-hover:scale-110">
              <Headset size={32} strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">Agent</h3>
            <p className="mt-1 text-center text-xs text-gray-500">Manage support requests</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
}