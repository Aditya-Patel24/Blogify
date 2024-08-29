import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children, type = 'button', bgColor = 'bg-[#5ce1e6]', textColor = 'text-white', className = '', ...props }) => (
  <button
    type={type}
    className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
    {...props}
  >
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  className: PropTypes.string,
};

export default Button;
