import React from "react";

function Navbar() {
  return (
    <nav className="bg-black text-white py-4 px-8 flex justify-between items-center w-full fixed top-0 shadow-md">
     
      <div className="text-3xl font-bold text-red-600">Snozy</div>

      <div className="flex space-x-6 text-lg">
        <a href="/" className="hover:text-red-500 transition duration-300">Home</a>
        <a href="#Projects" className="hover:text-red-500 transition duration-300">Projects</a>
        <a href="/gestion" className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300">Add Project</a>
      </div>
    </nav>
  );
}

export default Navbar;
