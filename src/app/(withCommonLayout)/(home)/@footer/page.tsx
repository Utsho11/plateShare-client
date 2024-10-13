import React from "react";
import Link from "next/link";

import {
  FacebookIcon,
  InstagramIcon,
  Logo,
  TwitterIcon,
} from "@/src/components/icons";

const Footer: React.FC = () => {
  return (
    <footer
      className="relative text-center bg-cover bg-center bg-no-repeat my-8"
      style={{
        backgroundImage:
          'url("https://www.shutterstock.com/image-photo/board-tasty-smoked-mackerel-fish-260nw-2150796019.jpg")',
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-black opacity-70" />

      {/* Footer Content */}
      <div className="relative mx-auto max-w-7xl px-6 py-16 text-white">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between items-center mb-8">
          {/* Logo and Description */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <div className="flex gap-3 justify-center items-center">
              <Logo size={44} />
              <h2 className="text-4xl font-bold">PlateShare</h2>
            </div>
            <p className="mt-4 text-gray-400">
              Discover, create, and share your favorite recipes with the world.
              PlateShare is your platform to inspire and get inspired.
            </p>
          </div>

          {/* Links */}
          <div className="w-full md:w-1/3 flex justify-around text-left">
            <div>
              <h3 className="text-xl font-bold mb-4">Explore</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link className="hover:text-white" href="/all-recipe">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/about">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Account</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link className="hover:text-white" href="/login">
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="hover:text-white" href="/register">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div className="w-full md:w-1/3 text-center md:text-right">
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                aria-label="Facebook"
                className="hover:text-gray-400"
                href="https://facebook.com"
              >
                <FacebookIcon />
              </a>
              <a
                aria-label="Twitter"
                className="hover:text-gray-400"
                href="https://twitter.com"
              >
                <TwitterIcon />
              </a>
              <a
                aria-label="Instagram"
                className="hover:text-gray-400"
                href="https://instagram.com"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-500">
            © {new Date().getFullYear()} PlateShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
