import React from "react";
import "styles/components/textfield.css";

const TextField = ({ label }) => {
  return (
    <div className="text-field">
      <label>{label}</label>
      <input type="text" />
    </div>
  );
};

export default TextField;
