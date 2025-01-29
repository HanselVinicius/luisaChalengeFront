"use client";
import purgeSession from "./actions/purgeSession";

export default function Navbar() {
  const handleLogout = () => {
    purgeSession();
  };

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Produtos Favoritos</h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-all"
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
