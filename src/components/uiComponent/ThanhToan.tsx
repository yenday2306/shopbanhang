import React from 'react';
import { Steps } from 'antd';

const ThanhToan: React.FC = () => {
  const items = [
    { title: 'Finished', description: 'Bạn đã đặt hàng thành công' },
    { title: 'In Progress', description: 'Chờ thanh toán' },
    { title: 'Waiting', description: 'Chờ giao hàng' },
  ];

  return (
    <Steps className='flex justify-center items-center' direction="vertical" size="small" current={1} items={items} />
  );
};

export default ThanhToan;