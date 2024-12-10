import React from "react";
import "styles/components/textfield.css";

const TextField = ({ label, value, name, handleChange }) => {
  return (
    <div className="text-field">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        name={name}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default TextField;
