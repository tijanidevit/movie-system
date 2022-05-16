import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="text-center bg-primary py-3">
      <div className="text-white">Copyright - {year}</div>
    </div>
  );
};

export default Footer;
