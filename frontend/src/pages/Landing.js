import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Banner } from "../components";

export const Landing = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/movies");
  }, []);
  return (
    <div>
      <Banner />
    </div>
  );
};
