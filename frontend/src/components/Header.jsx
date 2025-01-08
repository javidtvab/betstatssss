import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="text-2xl font-bold">
            Plataforma Pronósticos
          </Link>
        </div>

        {/* Menú de Navegación */}
        <nav className="hidden md:flex space-x-6">
          <Link
            to="/user/profile"
            className="hover:text-gray-200 transition duration-200"
          >
            Mi Perfil
          </Link>
          <Link
            to="/user/picks"
            className="hover:text-gray-200 transition duration-200"
          >
            Mis Picks
          </Link>
          <Link
            to="/services"
            className="hover:text-gray-200 transition duration-200"
          >
            Servicios
          </Link>
          <Link
            to="/faq"
            className="hover:text-gray-200 transition duration-200"
          >
            FAQ
          </Link>
        </nav>

        {/* Menú Usuario */}
        <div className="flex items-center space-x-4">
          <Link
            to="/user/statistics"
            className="hidden md:block bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition"
          >
            Estadísticas
          </Link>
          <button
            className="flex items-center space-x-2 hover:bg-blue-700 transition px-4 py-2 rounded-full"
            onClick={() => console.log("Abrir menú de usuario")}
          >
            <img
              src="/assets/icons/user-placeholder.png"
              alt="Usuario"
              className="w-8 h-8 rounded-full"
            />
            <span>Usuario</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
