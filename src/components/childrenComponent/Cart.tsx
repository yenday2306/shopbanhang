import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from "@ant-design/icons";
import { instance } from "../../axios-instance";
import { RootState } from "../../store";
import { removeProduct } from "../../slice/cartSlice";

const Cart = ({ confirmBuying, setBuying }: { confirmBuying(): void, setBuying: any, quantity: number }) => {
  const params = useParams();
  const dispatch = useDispatch();
  // const product = useSelector((state) => state.cart.products.find((product) => product.id === params.id));
      // @ts-ignore

  const [product, setProduct] = useState<TypeProduct>()
  useEffect(() => {
    instance.get(`/listproducts/${params.id}`).then(res => {
      setProduct(res.data)
    })
  }, [])
  const { products } = useSelector((state: RootState) => state.cart)  // useEffect(() => {
  //   instance.get(`/listproducts/${params.id}`).then((res) => {
  //     dispatch(addProduct(res.data)); // Thêm sản phẩm vào giỏ hàng khi tải dữ liệu thành công
  //   });
  // }, []);
  const totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  const navigate = useNavigate();
  const totalAmount = products.reduce(
    (total, product) => total + parseFloat(product.price) * product.quantity,
    0
  );
  function buying() {
    navigate('/thanhtoan')
  }
  function muatiep() {
    setBuying(false)
    navigate('/');
  }
  
  function deleteProduct (productId) {
    dispatch(removeProduct(productId));
  }
  return (<Overlay>

<CartModal>
  <h4 className="font-thin mt-[30px]" style={{fontWeight:'bold',fontSize:'17px'}}><ShoppingCartOutlined style={{ fontSize: '24px', color: '#08c' }}/>Giỏ hàng: {totalQuantity} sản phẩm</h4>
  <div className="one-item">
  {totalQuantity !== 0 && <table>
  <thead>
    <tr>
      <th>Ảnh</th>
      <th>Tên sản phẩm</th>
      <th>Số lượng</th>
      <th>Size</th>
      <th>Giá</th>
      <th>Xóa</th>
    </tr>
  </thead>
  <tbody>
    
    {products.map((product, index) => (
      <tr key={index}>
        <td><img className="w-[120px] h-[80px]"  src={product?.img} alt="" /></td>
        <td className="text-left pl-2">{product?.content}</td>
        <td>{product.quantity}</td>
        <td>{product.size}</td>
        <td>{(parseFloat(product?.price) * product.quantity).toLocaleString()}.000đ</td>
        <td>
          <button style={{ width: '50px', height: '50px' }} onClick={() =>  dispatch(removeProduct(product.id))}>Xóa</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>  }
  </div>
  <div>
    <p style={{color:'red',fontWeight:'bold'}}>Tổng tiền :{totalAmount.toLocaleString()}.000đ.</p>
  </div>
  <div className="flex flex-row ml-[80px]">
  <button className="bg-blue-300  w-[130px] h-[40px] rounded-lg text-white" onClick={muatiep}>Tiếp tục mua sắm</button>
  <button className="bg-red-300 w-[130px] h-[40px] rounded-lg text-white" onClick={buying}>Thanh toán</button>
  </div>

</CartModal>
  </Overlay>)
}
export default Cart
const CartModal = styled.div`
overflow:hidden;
font-size:12px;
    overflow:hidden;
    display:flex;
    overflow-x: auto;
    flex-direction:column;
    position: absolute;
  top: -15px;
  right: 0;
  z-index: 9999; 
  background-color:white;
  height: 100%;
  width:30%;
  text-align:left;
  margin-left:30px;
tbody{
  font-size:11px;
}
`
// @ts-ignore
const OneProduct = styled.div`

.one-line{
  display:flex;
  flex-direction:row;
}
 
`
const Overlay = styled.div`
position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Độ mờ và màu sắc của lớp phủ */
  z-index: 9998;
`