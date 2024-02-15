import React from 'react';

const Button = (props) => {
  const buttonStyle = {
    backgroundColor: '#4f46e5',
    color: '#fff',
    fontFamily: 'Poppins',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    marginLeft: '1.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.5s ease-in',
  };

  return (
    <button style={buttonStyle}>
      {props.children}
    </button>
  );
};

export default Button;
