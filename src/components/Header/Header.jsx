import React, { useState } from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DarkMode from '../DarkMode/DarkModeToggle';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className='fixed top-0 left-0 w-full bg-opacity-80 backdrop-blur-lg shadow-lg z-50'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4 flex items-center justify-center'>
            <Link to='/'>
              <div className='logo-container'>
                <Logo width='100px' />
              </div>
            </Link>
          </div>

          <div className='md:hidden'>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-gray-700 focus:outline-none'
            >
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'} />
              </svg>
            </button>
          </div>

          <ul className='hidden md:flex ml-auto space-x-4'>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-full transition duration-200'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
            <li>
              <DarkMode />
            </li>
          </ul>

          {isMenuOpen && (
  <ul className='flex flex-col items-center space-y-2 mt-4 md:hidden bg-white p-4 rounded shadow-lg'>
    {navItems.map((item) =>
      item.active ? (
        <li key={item.name}>
          <button
            onClick={() => {
              navigate(item.slug);
              setIsMenuOpen(false); // Close the menu after navigation
            }}
            className='px-6 py-2 text-gray-700 hover:bg-blue-100 rounded-full transition duration-200'
          >
            {item.name}
          </button>
        </li>
      ) : null
    )}
    {authStatus && (
      <li>
        <LogoutBtn />
      </li>
    )}
    <li>
      <DarkMode />
    </li>
  </ul>
)}

        </nav>
      </Container>
    </header>
  );
}

export default Header;
