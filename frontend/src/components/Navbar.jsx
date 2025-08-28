import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-white shadow p-4 flex justify-between items-center">
    <h1 className="font-bold text-xl">Jain Sangam</h1>
    <div className="space-x-4">
      <Link to="/" className="hover:text-primary">Home</Link>
      <Link to="/gurus" className="hover:text-primary">Gurus</Link>
      <Link to="/temples" className="hover:text-primary">Temples</Link>
      <Link to="/users" className="hover:text-primary">Users</Link>
      <Link to="/ai" className="hover:text-primary">AI Chat</Link>
      <Link to="/login" className="hover:text-primary">Login</Link>
      <Link to="/signup" className="hover:text-primary">Signup</Link>
    </div>
  </nav>
);

export default Navbar;
