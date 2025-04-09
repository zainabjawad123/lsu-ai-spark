
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-12 border-t">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold text-lsu-purple mb-4">LSU AI Spark</h3>
            <p className="text-gray-600 max-w-md">
              An AI learning platform for LSU students to master artificial intelligence, 
              machine learning, and data science through interactive modules and certifications.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-lsu-purple">Home</Link></li>
              <li><Link to="/modules" className="text-gray-600 hover:text-lsu-purple">Modules</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-lsu-purple">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/help" className="text-gray-600 hover:text-lsu-purple">Help Center</Link></li>
              <li><a href="#" className="text-gray-600 hover:text-lsu-purple">Contact Support</a></li>
              <li><a href="#" className="text-gray-600 hover:text-lsu-purple">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-lsu-purple">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Louisiana State University. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
