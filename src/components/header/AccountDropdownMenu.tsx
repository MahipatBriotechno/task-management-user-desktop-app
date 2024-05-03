import React, { useEffect, useRef, useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";




const AccountDropdownMenu = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen]);

  const adminlogin = localStorage.getItem("adminlogin");
  const admin = localStorage.getItem("admin");
console.log("adminlogin",)

  const handalAdminLogout = () => {
    // dispatch(logoutAdmin());
    localStorage.removeItem("adminlogin");
    localStorage.removeItem("admin");
    toast.success("Admin Logout Successfully");
    setTimeout(() => {
      navigate("/admin");
    }, 2000);
  };
  const handalUserLogout = () => {
    // dispatch(logoutUser());
    localStorage.removeItem("user");
    localStorage.removeItem("userLogin");

    toast.success("Logout Successfully");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };


  const data: any = localStorage.getItem("user");
  const db = JSON.parse(data);
  console.log("data", db?.userData?.name);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      <ToastContainer position="top-right" />
      <div className="flex items-center gap-3">
        <h3 className="capitalize text-white text-base font-light">Welcome <span className="font-semibold">{db?.userData?.name}</span></h3>
        <button
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <AccountCircleIcon
            className=""
            style={{ fill: "white", width: 26, height: 26 }}
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 min-w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            
              <div
                onClick={toggleMenu}
                className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm cursor-pointer hover:bg-blueExtraLight"
              >
                <Person2OutlinedIcon style={{ width: 20, height: 20 }} />{" "}
                {db?.userData?.email}
              </div>
            
            {/* <div
              onClick={toggleMenu}
              className="text-gray-700 block px-4 py-2 text-sm cursor-pointer"
            >
              <Person2OutlinedIcon /> User
            </div> */}
          </div>
          <div className="py-1" role="none">
            <div
              onClick={
                adminlogin == "true" ? handalAdminLogout : handalUserLogout
              }
              className="text-gray-700 flex gap-2 items-center px-4 py-2 text-sm cursor-pointer hover:bg-blueExtraLight"
            >
              <LogoutOutlinedIcon style={{ width: 20, height: 20 }} /> Logout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountDropdownMenu;
