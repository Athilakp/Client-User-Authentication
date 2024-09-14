import React, { useEffect, useState } from "react";
import { Card, Col, Row, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useUserRole from "../useUserRole";

const API_URL = "http://localhost:5000";

const Dashboard = () => {
  const [stats, setStats] = useState({
    adminCount: 0,
    superuserCount: 0,
    userCount: 0,
  });
  const role = useUserRole();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/dashboard-stats`);
      setStats(response.data);
    } catch (error) {
      notification.error({
        message: "Failed to fetch dashboard stats",
      });
    }
  };

  return (
    <>
      {role == "admin" || role == "superadmin" ? (
        <div className="dashboard-wrapper">
          <Row gutter={16}>
            {role === "superadmin" && (
              <Col span={8}>
                <Card
                  title="Admin"
                  bordered={false}
                  className="admin"
                  onClick={() => navigate("/admin")}
                >
                  <p>Count: {stats.adminCount}</p>
                </Card>
              </Col>
            )}
            <Col span={8}>
              <Card
                title="SuperUser"
                bordered={false}
                className="superUser"
                onClick={() => navigate("/superuser")}
              >
                <p>Count: {stats.superuserCount}</p>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                title="User"
                bordered={false}
                className="user"
                onClick={() => navigate("/user")}
              >
                <p>Count: {stats.userCount}</p>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <>Welcome to Home Page</>
      )}
    </>
  );
};

export default Dashboard;
