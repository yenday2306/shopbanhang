import React, { useState } from 'react';
import { AppstoreOutlined, BgColorsOutlined, FormOutlined, MailOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('NHÓM', 'sub1', <MailOutlined />, [
    getItem('Áo nữ', '1'),
    getItem('Đầm nữ', '2'),
    getItem('Chân Váy', '3'),
    getItem('Đầm Nữ', '4'),
  ]),
  getItem('THIẾT KẾ', 'sub2', <AppstoreOutlined />, [
    getItem('Trơn', '5'),
    getItem('Phối màu', '6'),
    getItem('Kẻ sọc', '7'),
    getItem('Caro', '8'),
    getItem('Phối màu', '9'),

  ]),
  getItem('FORM', 'sub3', <FormOutlined />, [
    getItem('S', '10'),
    getItem('M', '11'),
    getItem('L', '12'),
    getItem('XS', '13'),
    getItem('XXL', '14'),
  ]),
  getItem('GIỚI TÍNH', 'sub4', <UserOutlined />, [
    getItem('Nam', '15'),
    getItem('Nữ ', '16'),
    getItem('Unisex', '17'),
    
  ]),
  getItem('NHÓM SẢN PHẨM', 'sub5', <AppstoreOutlined />, [
    getItem('Áo Thun', '18'),
    getItem('Quần Jean', '19'),
    getItem('Áo sơ mi', '20'),
    getItem('Đầm Nữ', '21'),
  ]),
  getItem('KIỂU TAY', 'sub6', <SettingOutlined />, [
    getItem('Tay lửng', '22'),
    getItem('Tay dài', '23'),
    getItem('Tay ngắn', '24'),
   
  ]),
  getItem('MÀU SẮC', 'sub7', <BgColorsOutlined />, [
    getItem('Đen', '25'),
    getItem('Trắng', '26'),
    getItem('Màu khác', '27'),
  ]),
  getItem('SIZE', 'sub8', <SettingOutlined />, [
    getItem('24', '28'),
    getItem('25', '29'),
    getItem('26', '30'),
    getItem('27', '31'),
  ]),
  
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub3','sub4','sub5','sub6','sub7','sub8'];

const ListMenu: React.FC = () => {
  const [openKeys, setOpenKeys] = useState(['']);

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      className="mt-[40px] w-[400px]"
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      
      items={items}
    />
  );
};

export default ListMenu;