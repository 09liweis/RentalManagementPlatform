import { motion } from "framer-motion";

interface LoadingSectionProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function LoadingSection({
  loading,
  children,
}: LoadingSectionProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-gray-200 rounded-lg h-24"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 1 }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.8,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
