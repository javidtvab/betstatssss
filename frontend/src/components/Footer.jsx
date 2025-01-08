import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-6">
      <div className="container mx-auto px-4">
        {/* Secciones del Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección 1: Información */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Sobre Nosotros</h3>
            <p className="text-sm">
              Plataforma de pronósticos deportivos diseñada para ofrecer
              estadísticas y servicios avanzados a tipsters y usuarios
              apasionados.
            </p>
          </div>

          {/* Sección 2: Enlaces */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/services"
                  className="hover:text-white transition duration-200"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className="hover:text-white transition duration-200"
                >
                  Preguntas Frecuentes
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-white transition duration-200"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-white transition duration-200"
                >
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección 3: Redes Sociales */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">
              Conéctate con Nosotros
            </h3>
            <ul className="flex space-x-4">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition duration-200"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition duration-200"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://telegram.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition duration-200"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Plataforma Pronósticos. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
