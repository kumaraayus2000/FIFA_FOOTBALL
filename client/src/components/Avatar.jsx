import React from "react";
import "styles/components/avatar.css";

const Avatar = ({ name, src }) => {
  return (
    <div className="avatar">
      <img src={src} alt={name} />
      <p>{name}</p>
    </div>
  );
};

export default Avatar;
