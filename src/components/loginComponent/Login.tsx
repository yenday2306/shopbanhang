import { Form, Input, Button, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { instance } from '../../axios-instance';
import { saveUser } from '../../slice/accountSlice';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values: FieldType) => {
    const { username: email, password } = values;
    console.log(values);
    // @ts-ignore
    localStorage.setItem('email', email);
    // @ts-ignore
    localStorage.setItem('password', password);
    try {
      const response = await instance.get('/user');
      const usersData = response.data;

      const findUser = usersData.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (findUser) {
        if (findUser.role === 'admin') {
          dispatch(saveUser(email));
          navigate('/admin');
        } else {
          navigate('/');
        }
      } else {
        alert('Email hoặc mật khẩu không đúng');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
        name="username"
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
        name="remember"
        valuePropName="checked"
        wrapperCol={{ offset: 8, span: 16 }}
      >
        <Checkbox>Ghi nhớ</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        
        <Button className='bg-red-200' type="primary" htmlType="submit">
          Đăng nhập
        </Button>
        
        <Link to="/signup">
          <Button className='bg-yellow-100' >Đăng ký</Button>
        </Link>
       
      </Form.Item>
    </Form>
  );
};

export default Login;