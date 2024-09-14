import React from "react";
import { Form, Input, Button, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = "http://localhost:5000";

interface LoginFormValues {
  username: string;
  password: string;
}

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values: LoginFormValues) => {
    try {
      const response = await axios.post(`${API_URL}/login`, values);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      localStorage.setItem("adminId", response.data.id);
      notification.success({
        message: "Login successful!",
      });
      navigate("/dashboard");
    } catch (error) {
      notification.error({
        message: "Login failed!",
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ username: "", password: "" }}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input placeholder="SuperAdmin" />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="superAdmin@123" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
