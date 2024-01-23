import  { useState, useEffect } from "react";
import { Table } from "antd";
import { instance } from "../../axios-instance";

interface User {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
  role: string;
  id: number;
}

const UserAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    instance.get("/user").then((response) => {
      setUsers(response.data);
    });
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phonenumber",
      key: "phonenumber",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <Table
      dataSource={users}
      columns={columns}
      pagination={false}
      rowKey="id"
    />
  );
};

export default UserAdmin;