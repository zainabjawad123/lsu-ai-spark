
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useUser();

  return (
    <nav className="border-b bg-white py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img 
            src="/lsu-logo.png" 
            alt="LSU Logo" 
            className="h-10 w-auto"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/40x40?text=LSU";
            }} 
          />
          <span className="text-xl font-bold text-lsu-purple">LSU AI Spark</span>
        </Link>
        
        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-gray-700 hover:text-lsu-purple">Home</Link>
          <Link to="/modules" className="text-gray-700 hover:text-lsu-purple">Modules</Link>
          <Link to="/about" className="text-gray-700 hover:text-lsu-purple">About</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-gray-700 hover:text-lsu-purple">My Dashboard</Link>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="text-sm hidden md:inline">Hello, {user?.name}</span>
              <Button variant="outline" onClick={logout} className="hidden md:flex">Logout</Button>
            </div>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="hidden md:flex">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-lsu-purple text-white hover:bg-lsu-purple/90">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
