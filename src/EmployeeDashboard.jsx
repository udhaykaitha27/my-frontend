import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, Send, Ticket } from 'lucide-react';
import toast from 'react-hot-toast';
import Navbar from './Navbar';

export default function EmployeeDashboard() {
  const initialFormState = {
    category: '',
    title: '',
    description: '',
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mock API call or Redux dispatch would go here
    console.log('Ticket Submitted:', formData);
    
    // Show success message and clear form
    toast.success('Ticket submitted successfully!');
    setFormData(initialFormState);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-50 via-gray-50 to-white">
      <Navbar />
      
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8 flex items-center gap-4"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-600/30">
            <Ticket size={28} strokeWidth={2} />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Submit a Ticket</h1>
            <p className="mt-1 text-gray-500">Need help? Fill out the form below to request IT support.</p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="overflow-hidden rounded-3xl bg-white/70 p-8 shadow-2xl shadow-gray-200/50 ring-1 ring-gray-900/5 backdrop-blur-xl"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              {/* Category Dropdown */}
              <motion.div variants={itemVariants}>
                <label htmlFor="category" className="mb-2 block text-sm font-bold text-gray-700">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-0 bg-gray-50/50 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 transition-all hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option value="" disabled>Select a category...</option>
                  <option value="Network">Network</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                  <option value="Access">Access</option>
                </select>
              </motion.div>

              {/* Title Input */}
              <motion.div variants={itemVariants}>
                <label htmlFor="title" className="mb-2 block text-sm font-bold text-gray-700">
                  Issue Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="Brief summary of the issue"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full rounded-xl border-0 bg-gray-50/50 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 transition-all hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </motion.div>

              {/* Description Textarea */}
              <motion.div variants={itemVariants}>
                <label htmlFor="description" className="mb-2 block text-sm font-bold text-gray-700">
                  Detailed Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={5}
                  required
                  placeholder="Please provide as many details as possible..."
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full resize-y rounded-xl border-0 bg-gray-50/50 p-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 transition-all hover:bg-gray-50 focus:bg-white focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </motion.div>

              {/* Dummy File Upload */}
              <motion.div variants={itemVariants}>
                <span className="mb-2 block text-sm font-bold text-gray-700">Attachments (Optional)</span>
                <div className="flex w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/30 p-8 transition-colors hover:border-indigo-500 hover:bg-indigo-50/50">
                  <label htmlFor="file-upload" className="flex cursor-pointer flex-col items-center justify-center text-gray-500 hover:text-indigo-600">
                    <div className="rounded-full bg-white p-3 shadow-sm ring-1 ring-gray-900/5 mb-3">
                      <UploadCloud size={24} className="text-indigo-500" />
                    </div>
                    <span className="text-sm font-medium">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-400">PNG, JPG, PDF up to 10MB</span>
                    <input id="file-upload" type="file" className="hidden" />
                  </label>
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div variants={itemVariants} className="mt-8 flex justify-end">
              <button
                type="submit"
                className="group flex items-center gap-2 rounded-xl bg-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 active:scale-95"
              >
                <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                Submit Ticket
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}