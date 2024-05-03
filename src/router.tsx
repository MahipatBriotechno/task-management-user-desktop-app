import { FC } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/auth/login";
import { SignupPage } from "./pages/auth/signup";
import { UserDashboard } from "./pages/dashboard";


export const Router: FC = () => {
  return (
    <HashRouter>
      <Routes>
     
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<UserDashboard/>}/>
       
      </Routes>
    </HashRouter>
  );
};
