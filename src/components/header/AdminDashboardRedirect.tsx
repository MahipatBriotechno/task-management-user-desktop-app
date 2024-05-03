import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AdminDashboardRedirect = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const adminlogin = localStorage.getItem("adminlogin");

  // console.log("adminlogin", adminlogin);
  // console.log("location.pathname", location.pathname);

  const containsAdmin = location.pathname.includes("admin");
  const containsUser = location.pathname.includes("user");
  // console.log("location.pathname containsAdmin", containsAdmin);
  // console.log("location.pathname containsUser", containsUser);

  // useEffect(() => {
  //   if (adminlogin == "true") {
  //     if (containsAdmin === true) {
  //       const newPath = `${location.pathname}?tab=task`;
  //       // const newPath = `/admin/dashboard?tab=task`;
  //       navigate(newPath, { replace: true });
  //     } else if (containsUser === true) {
  //       const newPath = `/admin/dashboard?tab=task`;
  //       navigate(newPath, { replace: true });
  //     }
  //   } else if (userlogin == "true") {
  //     if (containsUser === true) {
  //       const newPath = `${location.pathname}?tab=active`;
  //       // const newPath = `/user/dashboard?tab=active`;
  //       navigate(newPath, { replace: true });
  //     } else if (containsAdmin === true) {
  //       const newPath = `/user/dashboard?tab=active`;
  //       navigate(newPath, { replace: true });
  //     }
  //   } else {
  //     const newPath = `/`;
  //     navigate(newPath, { replace: true });
  //   }
  // }, [location.pathname, navigate]);

  return null;
};

export default AdminDashboardRedirect;
