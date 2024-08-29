import React from 'react';
import logo from '../assets/logo1.png';
function Logo({ width = '100px' }) {
  return (
    <div style={{ width }}><img src={logo}/></div>
  );
}

export default Logo;