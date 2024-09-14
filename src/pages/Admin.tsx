import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";
interface AdminFormValues {
  adminName: string;
  email: string;
  password: string;
}
const API_URL = "http://localhost:5000";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${API_URL}/admins`);
      console.log(response.data);
      setAdmins(response.data);
    } catch (error) {
      notification.error({
        message: "Failed to fetch admins",
      });
    }
  };

  const handleCreate = async (values: AdminFormValues) => {
    try {
      await axios.post(`${API_URL}/admins`, values);
      notification.success({
        message: "Admin created successfully",
      });
      fetchAdmins();
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Failed to create admin",
      });
    }
  };

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)}>
        Create Admin
      </Button>
      <Table dataSource={admins} rowKey="id" style={{ marginTop: 20 }}>
        <Table.Column title="Admin Name" dataIndex="username" key="username" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Password" dataIndex="password" key="password" />
      </Table>
      <Modal
        title="Create Admin"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            label="Admin Name"
            name="adminName"
            rules={[{ required: true, message: "Please input admin name!" }]}
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
              Create Admin
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Admin;
