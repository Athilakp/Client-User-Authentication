import React, { ReactNode } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Refine } from "@refinedev/core";
import { Layout } from "antd";
import Sidebar from "./sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import SuperUser from "./pages/SuperUser";
import User from "./pages/User";
import LogoutButton from "./pages/LogoutButton";
import dataProvider from "@refinedev/simple-rest";
import "./index.css";
const API_URL = "http://localhost:5000";

interface AppLayoutProps {
  children: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const role = localStorage.getItem("role");

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {location.pathname !== "/" &&
        (role === "admin" || role === "superadmin") && <Sidebar />}
      <Layout>
        {location.pathname !== "/" && <LogoutButton />}
        {children}
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Refine dataProvider={dataProvider(API_URL)}>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/superuser" element={<SuperUser />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </AppLayout>
      </Refine>
    </Router>
  );
};

export default App;
