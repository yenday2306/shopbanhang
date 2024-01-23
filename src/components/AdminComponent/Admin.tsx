
import React, { useEffect, useState } from 'react';
import {
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useDispatch } from 'react-redux';
import ProductForm from './ProductForm';
import { useNavigate } from 'react-router-dom';
import { useCheckLogin } from '../../hook/useCheckLogin';
import ProductAdmin from './ProductAdmin';
import UserAdmin from './UserAdmin';
import { getListProduct } from '../../slice/productSlice';

const { Header, Sider, Content } = Layout;

const Admin: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [adding, setAdding] = useState(false);
  const [changeMenu,setChange] = useState(true);
  const [changeUser,setChangeUser] = useState(false);
  const navigate = useNavigate();
      // function editProduct(product) {
      //   setAdding(true)
      //   console.log(product)
      //   setEdit(product)
    
      // }
    // console.log('editting la cai gi o trang admin',editing)
      function handleQuanLyTaiKhoanClick(){
        setChangeUser(true)
        setChange(false)
      }
      function handleQuanLySanPhamClick (){
        setChange(true)
        setChangeUser(false)
      }
      function logout(){
        localStorage.removeItem('email');
        navigate('/login')
      }
      
      useCheckLogin;
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // const { mainProduct } = useSelector((state: RootState) => state.products)
   const dispatch = useDispatch()

  useEffect(() => {
        dispatch(getListProduct())
      }, [dispatch])
  return (
    <Layout style={{margin:'0',height:'100vh'}}>
      
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
        >
          <Menu.Item key="1" icon={<FormOutlined />} onClick={handleQuanLySanPhamClick}>
            Quản lý sản phẩm
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />} onClick={handleQuanLyTaiKhoanClick}>
            Quản lý tài khoản
          </Menu.Item>
          
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <button className=' bg-red-400 h-[60px] w-[80px] text-white text-center rounded-[10px]' onClick={logout}>Đăng xuất</button>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow:'auto'
          }}
        >
          {changeMenu && <ProductAdmin/>}
      {adding && <ProductForm  setAdding={setAdding} />}
        {changeUser && <UserAdmin/>}
        
        </Content>
      </Layout>
    </Layout>
  );
};


export default Admin;