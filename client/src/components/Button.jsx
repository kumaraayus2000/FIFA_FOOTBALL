import React from "react";
import "styles/components/button.css";

const Button = ({ text, handleClick }) => {
  return (
    <button className="primary-button" onClick={handleClick}>
      {text}
    </button>
  );
};

export default Button;
