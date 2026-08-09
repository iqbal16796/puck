"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteId: string; // CRITICAL FIX: We now receive the URL from the editor
  onPublish: (data: { email: string; siteName: string }) => void;
}

export function PublishModal({ isOpen, onClose, siteId, onPublish }: PublishModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Pass the locked siteId back up!
    onPublish({ email, siteName: siteId });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center px-4">
          {/* Dark Blurred Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-md p-8 bg-zinc-900 border shadow-2xl border-zinc-800 rounded-3xl"
          >
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-rose-500/20 text-rose-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white font-serif tracking-tight">
                Your masterpiece is ready.
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Claim your live URL and save your progress. We will create a secure account for you automatically.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-300">
                  Live Website URL <span className="text-xs text-zinc-500">(Locked)</span>
                </label>
                <div className="flex items-center bg-zinc-950/50 border border-zinc-800/50 rounded-xl overflow-hidden cursor-not-allowed">
                  <span className="pl-4 pr-1 text-zinc-600 text-sm">builtby.com/</span>
                  <input
                    type="text"
                    disabled // CRITICAL FIX: Lock the input so they can't orphan the database row!
                    value={siteId}
                    className="w-full py-3 pr-4 text-zinc-500 bg-transparent border-none outline-none text-sm cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-zinc-300">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hello@example.com"
                  className="w-full px-4 py-3 text-white transition-all bg-zinc-950 border border-zinc-800 rounded-xl outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 placeholder:text-zinc-700 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 mt-2 text-sm font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-lg shadow-rose-900/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100"
              >
                {isLoading ? "Saving..." : "Save & Continue"}
              </button>
            </form>
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
