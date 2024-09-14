import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import axios from "axios";

interface SuperUserFormValues {
  superuserName: string;
  email: string;
  password: string;
}

const API_URL = "http://localhost:5000";

const SuperUser = () => {
  const [superUsers, setSuperUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const adminId = localStorage.getItem("adminId");
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchSuperUsers();
  }, []);

  const fetchSuperUsers = async () => {
    console.log("vv", role);
    try {
      const response = await axios.get(`${API_URL}/superusers`, {
        params: { adminId, role },
      });
      setSuperUsers(response.data);
    } catch (error) {
      notification.error({
        message: "Failed to fetch superusers",
      });
    }
  };

  const handleCreate = async (values: SuperUserFormValues) => {
    try {
      await axios.post(`${API_URL}/superusers`, { ...values, adminId });
      notification.success({
        message: "SuperUser created successfully",
      });
      fetchSuperUsers();
      setIsModalVisible(false);
    } catch (error) {
      notification.error({
        message: "Failed to create superuser",
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
          Create SuperUser
        </Button>
      )}

      <Table dataSource={superUsers} rowKey="id" style={{ marginTop: 20 }}>
        <Table.Column
          title="SuperUser Name"
          dataIndex="username"
          key="username"
        />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Password" dataIndex="password" key="password" />
      </Table>
      <Modal
        title="Create SuperUser"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Form form={form} onFinish={handleCreate} layout="vertical">
          <Form.Item
            label="SuperUser Name"
            name="superuserName"
            rules={[
              { required: true, message: "Please input superuser name!" },
            ]}
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
              Create SuperUser
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SuperUser;
