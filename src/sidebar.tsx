import React from "react";
import { Link } from "react-router-dom";
import { Layout } from "antd";
import useUserRole from "./useUserRole";
const { Sider } = Layout;

const Sidebar = () => {
  const role = useUserRole();
  return (
    <Sider width={200} className="site-layout-background">
      <div className="sidebar">
        <ul>
          {(role === "admin" || role === "superadmin") && (
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
          )}

          {role !== "admin" && (
            <li>
              <Link to="/admin">Admin</Link>
            </li>
          )}
          <li>
            <Link to="/superuser">SuperUser</Link>
          </li>
          <li>
            <Link to="/user">User</Link>
          </li>
        </ul>
      </div>
    </Sider>
  );
};

export default Sidebar;
