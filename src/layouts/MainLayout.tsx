import Navbar from "../shared/components/navigation/Navbar";
import Footer from "../shared/components/navigation/Footer";
import ChatWidget from "../features/chatbot/components/ChatWidget";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#061224]">
      {/* Global Navigation System */}
      <Navbar />

      {/* 
          Page Content Area 
          The pt-20 matches the fixed navbar height (approx 80px) 
          This prevents overlapping and ensures every page starts at the same vertical position
      */}
      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-grow pt-[72px]" 
      >
        <div className="w-full">
          {children}
        </div>
      </motion.main>

      {/* Global Footer System */}
      <Footer />

      {/* Sticky Components */}
      <ChatWidget />
    </div>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MainLayout;
