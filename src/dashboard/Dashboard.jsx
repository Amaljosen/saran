import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Nav from "./navbar/Nav";

const Dashboard = () => {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("Orders");

  useEffect(() => {
    if (location.pathname.includes("my-orders")) {
      setActiveButton("My Orders");
    } else if (location.pathname.includes("products")) {
      setActiveButton("Products");
    } else if (location.pathname.includes("sessions")) {
      setActiveButton("Sessions");
    } else if (location.pathname.includes("reviews")) {
      setActiveButton("Reviews");
    } else if (location.pathname.includes("dashboard")) {
      setActiveButton("My Orders");
    }
  }, [location]);
  return (
    <div>
      <div>
        {/* Navigation Component */}
        <Nav activeButton={activeButton} setActiveButton={setActiveButton} />

        {/* Outlet for nested routes */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
