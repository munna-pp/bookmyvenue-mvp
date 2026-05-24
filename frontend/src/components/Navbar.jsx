import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black text-white p-4 flex justify-between">

      <h1 className="text-2xl font-bold">
        BookMyVenue
      </h1>

      <div className="flex gap-6">

        <Link to="/">Home</Link>

        <Link to="/venues">Venues</Link>

        <Link to="/login">Login</Link>

        <Link to="/dashboard">Dashboard</Link>

      </div>

    </nav>
  );
}

export default Navbar;