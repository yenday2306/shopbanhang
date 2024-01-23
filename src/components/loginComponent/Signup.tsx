import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate  } from "react-router-dom";
import { useEffect, useState } from "react";
import { Form, Input, Button } from 'antd';
import { instance } from "../../axios-instance";

type Inputs = {
  firstname: string;
  password: string;
  lastname: string;
  email: string;
  repassword: string;
  phonenumber: string;
};
 export type User = {
    [x: string]: any;
    email: string;
    phonenumber: string;
    password:string;
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
export default function Sigunup() {
    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        // Lấy danh sách người dùng từ mock API khi component được tải
        instance.get('/users').then((response) => {
          setUsers(response.data);
        });
      }, []);
  const {
    // register,
    // handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onFinish: SubmitHandler<Inputs> = (data: Inputs) => {
    console.log(data);
    
    const isEmailExists = users.some((user) => user.email === data.email);
    const isPhoneNumberExists = users.some((user) => user.phonenumber === data.phonenumber);

    if (isEmailExists) {
      alert("Email đã được đăng ký!");
      return;
    }

    if (isPhoneNumberExists) {
      alert("Số điện thoại đã được đăng ký!");
      return;
    }
  
    instance.post('/user', data).then(() => {
      reset();
      setUsers([...users, data]);
      // Lấy danh sách người dùng sau khi đăng ký
      instance.get('/user').then((response) => {
        setUsers(response.data);
      });
      alert("Đăng ký thành công!"); // Hiển thị cảnh báo đăng ký thành công
      navigate("/login"); // Chuyển hướng đến trang "/login"
    });
  };
  type FieldType = {
    email?: string;
    phonenumber?:number;
    password?: string;
    remember?: string;
    repassword?:string;
    firstname?:string;
    lastname?:string
  };
  return (
    <Form
      className='ml-[300px] mt-[100px]'
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Họ"
        name="firstname"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Tên"
        name="lastname"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Số điện thoại"
        name="phonenumber"
        rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Mật khẩu"
        name="password"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item<FieldType>
        label="Nhập lại mật khẩu"
        name="repassword"
        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
      >
        <Input.Password />
      </Form.Item>
      {/* <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Ghi nhớ</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        
        <Button className='bg-red-200' type="primary" htmlType="submit">
          Đăng ký
        </Button>
        
        <Link to="/signup">
          <Button className='bg-yellow-100' >Đăng nhập</Button>
        </Link>
       
      </Form.Item>
    </Form>
  );
};