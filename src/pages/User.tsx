import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";

interface UserFormValues {
  userName: string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:5000";

const User = () => {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const role = localStorage.getItem("role");
  const adminId = localStorage.getItem("adminId");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/users`, {
        params: { adminId, role },
      });
      setUsers(response.data);
    } catch (error) {
      notification.error({
        message: "Failed to fetch users",
      });
    }
  };

  const handleCreate = async (values: UserFormValues) => {
    try {
      await axios.post(`${API_URL}/users`, { ...values, adminId });
      notification.success({
        message: "User created successfully",
      });
      fetchUsers();
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Failed to create user",
      });
    }
  };

  if (role !== "admin" && role !== "superadmin") {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      {role === "admin" && (
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Create User
        </Button>
      )}

      <Table dataSource={users} rowKey="id" style={{ marginTop: 20 }}>
        <Table.Column title="User Name" dataIndex="username" key="username" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Password" dataIndex="password" key="password" />
      </Table>
      <Modal
        title="Create User"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            label="User Name"
            name="userName"
            rules={[{ required: true, message: "Please input user name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create User
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default User;
