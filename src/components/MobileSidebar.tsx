import { motion } from "framer-motion";
import Sidebar from "./Sidebar";

type Props = {
  onClose: () => void;
};

export default function MobileSidebar({ onClose }: Props) {
  return (
    <motion.div
      initial={{ x: "-100%" }}
      animate={{ x: 0 }}
      exit={{ x: "-100%" }}
      transition={{ duration: 0.3 }}
      className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50"
    >
      <div className="flex justify-end p-4">
        <button
          onClick={onClose}
          className="text-gray-500 text-xl font-bold"
        >
          ✕
        </button>
      </div>

      <Sidebar />
    </motion.div>
  );
}
