import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DarkMode from '../DarkMode/DarkModeToggle';
import './Header.css';

function Header() {
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
        <nav className='flex items-center'>
          {/* Logo wrapper with size adjustments */}
          <div className='mr-4 flex items-center justify-center'>
            <Link to='/'>
              {/* Add a wrapper around the logo to control its size */}
              <div className='logo-container'>
                <Logo width='100px' /> {/* Increased width of the logo */}
              </div>
            </Link>
          </div>

          {/* Navigation items */}
          <ul className='flex ml-auto space-x-4'>
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
        </nav>
      </Container>
    </header>
  );
}

export default Header;
