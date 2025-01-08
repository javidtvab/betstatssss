import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true); // Estado para colapsar/expandir el sidebar

  return (
    <div
      className={`bg-gray-800 text-gray-200 h-screen ${
        isOpen ? "w-64" : "w-16"
      } transition-all duration-300 flex flex-col`}
    >
      {/* Botón de Colapsar */}
      <div className="p-4 flex justify-between items-center">
        <h2 className={`${isOpen ? "block" : "hidden"} text-lg font-bold`}>
          Menú
        </h2>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-200 hover:text-white focus:outline-none"
        >
          {isOpen ? "←" : "→"}
        </button>
      </div>

      {/* Navegación */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          <li>
            <Link
              to="/user/profile"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <span className="material-icons">account_circle</span>
              <span className={`${isOpen ? "ml-2" : "hidden"}`}>
                Mi Perfil
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/user/picks"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <span className="material-icons">sports</span>
              <span className={`${isOpen ? "ml-2" : "hidden"}`}>
                Mis Picks
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <span className="material-icons">build</span>
              <span className={`${isOpen ? "ml-2" : "hidden"}`}>
                Servicios
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <span className="material-icons">help</span>
              <span className={`${isOpen ? "ml-2" : "hidden"}`}>
                FAQ
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/blog"
              className="flex items-center p-2 hover:bg-gray-700 rounded"
            >
              <span className="material-icons">article</span>
              <span className={`${isOpen ? "ml-2" : "hidden"}`}>Blog</span>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Información en el Footer del Sidebar */}
      <div className="p-4">
        {isOpen ? (
          <p className="text-sm">© {new Date().getFullYear()} Plataforma Pronósticos</p>
        ) : (
          <span className="material-icons text-sm">copyright</span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
