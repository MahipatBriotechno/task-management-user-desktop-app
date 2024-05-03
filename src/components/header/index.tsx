import React, { useEffect, useRef, useState } from "react";
import { Container } from "../shared/Container";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import AccountDropdownMenu from "./AccountDropdownMenu";

import AdminDashboardRedirect from "./AdminDashboardRedirect";

interface HeaderProps {}

const AdminMenuLink = [
  { title: "Task", link: "/admin/dashboard?tab=task" },
  { title: "Employee", link: "/admin/dashboard?tab=employee" },
];
const UserMenuLink = [
  { title: "Active", link: "/dashboard?tab=active" },
  { title: "Pending", link: "/dashboard?tab=pending" },
  { title: "Completed", link: "/dashboard?tab=completed" },
];

const HeaderUser = ({}: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { hash, pathname, search } = location;

  const extractValue = (queryString: any) => {
    const parts = queryString.split("=");
    return parts[1];
  };

  const activeTab = extractValue(location.search);

  // console.log("location.pathname", location.pathname + location.search);
  // console.log("location", location);

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  const path = location.pathname;

  if (path == "/" || path == "/signup" || path == "/admin") return null;

  return (
    <div className="11bg-blue-800 11bg-blue-800 bg-blue-default bg-primary  ">
      <AdminDashboardRedirect />
      <Container className="desktop-view">
        <div className="flex gap-20 items-center h-14">
          <div className="text-white text-4xl">LOGO</div>
          <div className="flex gap-6 items-center">
            {UserMenuLink.map((db: any, index: any) => (
                  <NavLink
                    key={index}
                    className={
                      location.pathname + location.search == db.link
                        ? "border-b-2 border-solid border-white text-white"
                        : "text-white border-b-2 border-solid border-transparent"
                    }
                    to={db.link}
                  >
                    {db.title}
                  </NavLink>
                ))}
          </div>
          <div className="ml-auto">
            <AccountDropdownMenu />
          </div>
        </div>
      </Container>

     
    </div>
  );
};

export default HeaderUser;
